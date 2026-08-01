"use server";

import { rpc } from "@/lib/booking";
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

  try {
    await rpc<string>("submit_mirror_reservation", {
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

  return { status: "success" };
}
