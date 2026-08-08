import type { Metadata } from "next";
import Link from "next/link";
import { LegalDoc, type LegalSection } from "@/components/LegalDoc";

export const metadata: Metadata = {
  alternates: { canonical: "/privacy" },
  title: "Privacy Policy",
  description:
    "How Lux Mirror LLC collects, uses, shares, and protects information across theluxmirror.com, the LUX Mirror and LUX Booking apps, and the LUX Smart Mirror.",
};

const EFFECTIVE = "August 8, 2026";
const PRIVACY_EMAIL = "privacy@theluxmirror.com";

/* Every processor listed here is one we actually run in production. Adding a
 * vendor to the stack means adding a row here in the same change — a policy
 * that omits a live processor is worse than no policy. */
const SUBPROCESSORS = [
  ["Supabase", "Database, authentication, file storage", "United States"],
  ["Stripe", "Payments, subscriptions, and payouts", "United States"],
  ["Resend", "Transactional email (receipts, invites, alerts)", "United States"],
  ["Sentry", "Crash and error diagnostics from our apps", "United States"],
  ["Google (Firebase)", "Push notifications to your device", "United States"],
  ["Google (Maps Platform)", "Turning an address into map coordinates", "United States"],
  ["Google Analytics", "Aggregate website traffic measurement", "United States"],
  ["Replicate", "AI image generation for style previews", "United States"],
  ["Hostinger", "Website hosting", "United States / EU"],
] as const;

const SECTIONS: readonly LegalSection[] = [
  {
    id: "who-we-are",
    heading: "Who we are",
    body: (
      <>
        <p>
          LUX Mirror is a product of <strong>Lux Mirror LLC</strong>, a
          Pennsylvania limited liability company. We are the controller of the
          personal information described in this policy, except where we act as
          a processor for a salon (see <a href="#two-roles">Our two roles</a>).
        </p>
        <p>
          Lux Mirror LLC
          <br />
          96 Commerce Drive PMB 200
          <br />
          Wyomissing, PA 19610, United States
          <br />
          <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>
        </p>
      </>
    ),
  },
  {
    id: "what-this-covers",
    heading: "What this policy covers",
    body: (
      <>
        <p>This policy applies to:</p>
        <ul>
          <li>
            <strong>theluxmirror.com</strong> — this website, including
            reservations, deposits, and booking pages.
          </li>
          <li>
            <strong>LUX Mirror</strong> — the business app used by salon owners
            and their staff to run bookings, clients, team, devices, and
            billing.
          </li>
          <li>
            <strong>LUX Booking</strong> — the client app used to find a shop,
            book an appointment, and view photos taken at the chair.
          </li>
          <li>
            <strong>The LUX Smart Mirror</strong> and the LUX cloud services it
            connects to.
          </li>
        </ul>
        <p>
          It does not cover a salon&rsquo;s own privacy practices, or any
          third-party site we link to.
        </p>
      </>
    ),
  },
  {
    id: "two-roles",
    heading: "Our two roles",
    body: (
      <>
        <p>
          <strong>For our own customers, we are the controller.</strong> When a
          salon owner signs up, reserves a mirror, or pays a subscription, we
          decide how that information is used, and this policy governs it.
        </p>
        <p>
          <strong>
            For the records a salon keeps about its clients, we are a processor.
          </strong>{" "}
          Appointment histories, client contact details, notes, and photos taken
          at the chair belong to the salon. We store and process them on the
          salon&rsquo;s instructions and do not use them for our own purposes. If
          you are a client of a LUX-equipped shop and want your records changed
          or removed, ask the shop first — they control it. We will help them
          act on your request.
        </p>
      </>
    ),
  },
  {
    id: "what-we-collect",
    heading: "What we collect",
    body: (
      <>
        <p>
          <strong>Information you give us.</strong> Your name, email address,
          phone number, and password (stored only as a salted hash — never in
          readable form). If you sign in with Google, we receive your name, email
          address, and profile picture from Google, and nothing else. Salon
          accounts also include business name, locations, services, hours, team
          members and their roles, and the client and appointment records you
          create. Anything you send us through the contact form or by email.
        </p>
        <p>
          <strong>Payment information.</strong> Card details go directly to
          Stripe and never touch our servers. We keep what Stripe returns: the
          card brand, last four digits, expiry, and the Stripe customer,
          subscription, and payment identifiers needed to bill you and show your
          history.
        </p>
        <p>
          <strong>Information we collect automatically.</strong> App version,
          operating system, device model, language, crash and error reports, and
          basic usage events. On this website, aggregate traffic measurement
          through Google Analytics. Server logs including IP address.
        </p>
        <p>
          <strong>Location.</strong>{" "}
          Only if you ask for it. Searching for shops
          &ldquo;near me&rdquo; in the LUX Booking app uses your device&rsquo;s
          approximate location, with your permission, to sort results. We use it
          for that search and do not build a location history.
        </p>
        <p>
          <strong>Information from a paired mirror.</strong> Device serial and
          public key, firmware version, online status, last-seen time, and basic
          health metrics — the fleet telemetry a salon owner sees in the app.
          Plus any photos a stylist deliberately captures (see{" "}
          <a href="#camera">The mirror&rsquo;s camera</a>).
        </p>
      </>
    ),
  },
  {
    id: "camera",
    heading: "The mirror’s camera",
    body: (
      <>
        <p>
          This is the part people ask about, so we will be exact.
        </p>
        <p>
          <strong>
            The live camera feed is processed on the mirror itself and is never
            streamed to us.
          </strong>{" "}
          Style previews, colour try-ons, and gesture control all run on the
          device&rsquo;s own hardware. The feed is not recorded, not uploaded,
          and not retained — it exists only in the mirror&rsquo;s memory for as
          long as it takes to draw the next frame.
        </p>
        <p>
          An image leaves the mirror only when someone <em>deliberately takes a
          photo</em>. That photo is uploaded to the salon&rsquo;s private
          library, visible to that salon&rsquo;s staff and to the client it is
          assigned to. Nobody else can see it. We do not use these photos to
          train models, and we do not sell or license them.
        </p>
        <p>
          We do not run facial recognition and we do not build faceprints or any
          other biometric identifier.
        </p>
        <p>
          A style preview generated with AI sends the relevant image to our image
          provider (Replicate) for processing and deletes it there once the
          result is returned.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use-it",
    heading: "How we use it",
    body: (
      <>
        <ul>
          <li>To create and secure your account, and to keep you signed in.</li>
          <li>
            To run the service: bookings, availability, client records, team
            access, device pairing and fleet status.
          </li>
          <li>
            To take payment, manage subscriptions and deposits, and send
            receipts.
          </li>
          <li>
            To send transactional messages you asked for — booking
            confirmations and reminders, team invitations, password resets,
            billing notices, and device alerts.
          </li>
          <li>
            To provide support, and to investigate faults, abuse, and fraud.
          </li>
          <li>
            To improve the product, using aggregate and diagnostic data rather
            than the contents of your client records.
          </li>
          <li>To meet legal, tax, and accounting obligations.</li>
        </ul>
        <p>
          Marketing email, if you have opted in, always carries a one-click
          unsubscribe. Turning it off never affects the transactional messages
          above.
        </p>
      </>
    ),
  },
  {
    id: "legal-bases",
    heading: "Legal bases",
    body: (
      <>
        <p>
          If you are in the European Economic Area or the United Kingdom, we rely
          on: <strong>contract</strong>, to deliver the service you signed up
          for; <strong>legitimate interests</strong>, to secure the service,
          prevent fraud, and improve the product; <strong>consent</strong>, for
          marketing email, push notifications, and location — each withdrawable
          at any time; and <strong>legal obligation</strong>, for tax and
          accounting records.
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    heading: "Who we share it with",
    body: (
      <>
        <p>
          We use a small number of service providers to run LUX. They may only
          process information on our instructions, for the purpose listed, and
          are bound by contract to protect it.
        </p>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Provider</th>
                <th>What for</th>
                <th>Where</th>
              </tr>
            </thead>
            <tbody>
              {SUBPROCESSORS.map(([name, purpose, region]) => (
                <tr key={name}>
                  <td>{name}</td>
                  <td>{purpose}</td>
                  <td>{region}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Beyond that, we share information only: with a salon, where you are its
          client and the records are its own; when the law requires it, or to
          protect someone&rsquo;s safety or our legal rights; and with an
          acquirer, if LUX is ever bought or merged — in which case this policy
          continues to apply until you are told otherwise.
        </p>
      </>
    ),
  },
  {
    id: "no-sale",
    heading: "We do not sell your information",
    body: (
      <>
        <p>
          We have never sold personal information and we do not share it for
          cross-context behavioural advertising, as those terms are defined under
          California law. We do not run advertising networks or third-party
          trackers in our apps, and we do not sell or rent your client lists,
          appointment history, or photos to anyone.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    heading: "How long we keep it",
    body: (
      <>
        <p>
          Account and business records are kept while your account is active.
          When an account is deleted we remove it and the records we hold for it
          within 30 days, except where we must keep something longer — payment
          and tax records for seven years, and security logs for up to 12
          months.
        </p>
        <p>
          Backups are retained on a rolling 30-day cycle, so deleted data may
          persist in an encrypted backup for up to 30 days after removal from
          live systems.
        </p>
        <p>
          Photos and client records belonging to a salon are kept for as long as
          the salon keeps them, and are deleted when the salon deletes them or
          closes its account.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    heading: "Your rights and choices",
    body: (
      <>
        <p>You can ask us to:</p>
        <ul>
          <li>Give you a copy of the personal information we hold about you.</li>
          <li>Correct anything inaccurate.</li>
          <li>Delete your account and the information attached to it.</li>
          <li>Export your data in a portable format.</li>
          <li>Stop marketing email, push notifications, or location access.</li>
          <li>
            Restrict or object to processing based on legitimate interests
            (EEA/UK).
          </li>
        </ul>
        <p>
          Most of this you can do yourself in the app under Account. To delete
          your account, or for anything else on that list, email{" "}
          <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a> from the
          address on the account. We respond within 30 days, and we do not charge
          for it or treat you differently for asking.
        </p>
        <p>
          If you are in the EEA or UK you may also complain to your local data
          protection authority. We would rather you came to us first.
        </p>
      </>
    ),
  },
  {
    id: "security",
    heading: "How we protect it",
    body: (
      <>
        <p>
          Data is encrypted in transit with TLS and at rest by our hosting
          provider. Access to your records is enforced in the database itself
          through row-level security, so one salon can never read
          another&rsquo;s — it is not a rule the app is trusted to follow, it is
          a rule the database enforces on every query. Staff access to production
          is restricted, logged, and requires multi-factor authentication.
        </p>
        <p>
          No system is perfectly secure. If a breach ever affects your personal
          information, we will notify you and the relevant regulators as the law
          requires.
        </p>
      </>
    ),
  },
  {
    id: "children",
    heading: "Children",
    body: (
      <>
        <p>
          LUX is built for salon professionals and their adult clients. Our apps
          are not directed at children and we do not knowingly collect personal
          information from anyone under 13 (or under 16 in the EEA/UK). If you
          believe a child has given us information, email{" "}
          <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a> and we will
          delete it.
        </p>
        <p>
          Where a salon books a minor as a client, the salon is responsible for
          obtaining any consent required from a parent or guardian, including for
          photos.
        </p>
      </>
    ),
  },
  {
    id: "international",
    heading: "International transfers",
    body: (
      <>
        <p>
          LUX is operated from the United States and our providers are listed
          above. If you use LUX from outside the US, your information will be
          transferred to and processed in the US. Where required, we rely on the
          European Commission&rsquo;s Standard Contractual Clauses and the UK
          Addendum with our providers.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    heading: "Changes to this policy",
    body: (
      <>
        <p>
          We will update this page when our practices change, and the effective
          date at the top always tells you which version you are reading. For
          material changes we will email account holders and give notice in the
          app before the change takes effect.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    heading: "Contact us",
    body: (
      <>
        <p>
          Privacy questions, requests, and complaints:{" "}
          <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>. Anything else
          — <Link href="/contact">get in touch</Link> or write to Lux Mirror LLC,
          96 Commerce Drive PMB 200, Wyomissing, PA 19610.
        </p>
        <p>
          Our <Link href="/terms">Terms of Service</Link> govern your use of LUX.
        </p>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalDoc
      eyebrow="Legal"
      title={
        <>
          Privacy <em>Policy</em>
        </>
      }
      effective={EFFECTIVE}
      intro={
        <p>
          LUX is built around a mirror with a camera in it, in a room where
          people are having a personal conversation. That earns you a plain
          answer about what we collect and what we don&rsquo;t — so this policy
          is written to be read, not to be survived.
        </p>
      }
      sections={SECTIONS}
    />
  );
}
