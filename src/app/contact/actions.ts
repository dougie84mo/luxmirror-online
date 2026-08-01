"use server";

import { rpcScalar } from "@/lib/booking";

/*
 * Contact submissions go through the shared submit_contact_message RPC
 * (SECURITY DEFINER, deliberately anon-callable — the public contact form's
 * write path, same 0086 exception as reservations). Server Action so the
 * browser never talks to PostgREST directly.
 */

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot — same convention as the reserve form.
  if (String(formData.get("website") ?? "").trim() !== "") {
    return { status: "success" };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || name.length > 200) {
    return { status: "error", message: "Enter your name." };
  }
  if (!EMAIL_RE.test(email) || email.length > 320) {
    return { status: "error", message: "Enter a valid email address." };
  }
  if (!message || message.length > 5000) {
    return {
      status: "error",
      message: "Enter a message (max 5000 characters).",
    };
  }

  try {
    await rpcScalar<string>("submit_contact_message", {
      p_name: name,
      p_email: email,
      p_phone: phone || null,
      p_message: message,
    });
  } catch (err) {
    console.error("submit_contact_message failed", err);
    return {
      status: "error",
      message:
        "We couldn't send your message. Try again in a minute, or email hello@theluxmirror.com.",
    };
  }

  return { status: "success" };
}
