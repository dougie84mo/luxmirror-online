"use server";

import { redirect } from "next/navigation";

import { isUuid, rpcScalar } from "@/lib/booking";
import { createDepositCheckoutSession } from "@/lib/stripe";
import { isMirrorModel } from "./models";

/*
 * Reservation submissions go through the shared submit_mirror_reservation
 * RPC (SECURITY DEFINER, deliberately anon-callable — it is the public
 * storefront's write path). Server Action so the browser never talks to
 * PostgREST directly and the CSP stays locked down.
 */

export type ReserveState = {
  status: "idle" | "success" | "error";
  message?: string;
  reservationId?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitReservation(
  _prev: ReserveState,
  formData: FormData,
): Promise<ReserveState> {
  // Honeypot — real visitors never see or fill this field. Pretend
  // success so bots don't learn they were filtered.
  if (String(formData.get("website") ?? "").trim() !== "") {
    return { status: "success" };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const salon = String(formData.get("salon") ?? "").trim();
  const model = String(formData.get("model") ?? "");
  const notes = String(formData.get("notes") ?? "").trim();
  const quantity = Number.parseInt(String(formData.get("quantity") ?? "1"), 10);

  if (!name || name.length > 200) {
    return { status: "error", message: "Enter your name." };
  }
  if (!EMAIL_RE.test(email) || email.length > 320) {
    return { status: "error", message: "Enter a valid email address." };
  }
  if (!isMirrorModel(model)) {
    return { status: "error", message: "Pick a mirror model." };
  }
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 100) {
    return { status: "error", message: "Quantity must be between 1 and 100." };
  }

  let reservationId: string;
  try {
    reservationId = await rpcScalar<string>("submit_mirror_reservation", {
      p_contact_name: name,
      p_email: email,
      p_phone: phone || null,
      p_salon_name: salon || null,
      p_model: model,
      p_quantity: quantity,
      p_notes: notes || null,
    });
  } catch (err) {
    console.error("submit_mirror_reservation failed", err);
    return {
      status: "error",
      message:
        "We couldn't save your reservation. Try again in a minute, or email hello@theluxmirror.com.",
    };
  }

  return { status: "success", reservationId };
}

/*
 * Starts Stripe Checkout for the $199 deposit (applied to purchase).
 * The session carries the reservation id in metadata; the stripe-webhook
 * Edge Function stamps deposit_status='paid' — this server never writes
 * the DB. Worst case for a forged id: someone pays $199 toward another
 * reservation.
 */
export async function startDepositCheckout(
  reservationId: string,
): Promise<{ error: string } | void> {
  if (!isUuid(reservationId)) return { error: "Invalid reservation." };
  let url: string;
  try {
    url = await createDepositCheckoutSession(reservationId);
  } catch (err) {
    console.error("startDepositCheckout failed", err);
    return {
      error:
        "We couldn't open checkout. Your reservation is still held — try again in a minute.",
    };
  }
  redirect(url);
}
