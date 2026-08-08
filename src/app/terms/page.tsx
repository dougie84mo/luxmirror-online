import type { Metadata } from "next";
import Link from "next/link";
import { LegalDoc, type LegalSection } from "@/components/LegalDoc";

export const metadata: Metadata = {
  alternates: { canonical: "/terms" },
  title: "Terms of Service",
  description:
    "The agreement between you and Lux Mirror LLC covering theluxmirror.com, the LUX Mirror and LUX Booking apps, LUX subscriptions, and LUX Smart Mirror hardware.",
};

const EFFECTIVE = "August 8, 2026";
const SUPPORT_EMAIL = "support@theluxmirror.com";

const SECTIONS: readonly LegalSection[] = [
  {
    id: "agreement",
    heading: "The agreement",
    body: (
      <>
        <p>
          These Terms of Service are an agreement between you and{" "}
          <strong>Lux Mirror LLC</strong>, a Pennsylvania limited liability
          company (&ldquo;LUX&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;). They
          cover theluxmirror.com, the LUX Mirror and LUX Booking apps, LUX
          subscriptions, and LUX Smart Mirror hardware — together, the
          &ldquo;Service&rdquo;.
        </p>
        <p>
          By creating an account, reserving a mirror, or using the Service, you
          accept these terms. If you are accepting on behalf of a business, you
          confirm you are authorised to bind it, and &ldquo;you&rdquo; means that
          business.
        </p>
        <p>
          How we handle information is described in our{" "}
          <Link href="/privacy">Privacy Policy</Link>, which forms part of this
          agreement.
        </p>
      </>
    ),
  },
  {
    id: "eligibility",
    heading: "Who can use LUX",
    body: (
      <>
        <p>
          You must be at least 18 and able to enter a binding contract. The
          Service is offered in the United States; we do not represent that it is
          appropriate or available anywhere else, and you are responsible for
          complying with your own local law if you use it from elsewhere.
        </p>
      </>
    ),
  },
  {
    id: "your-account",
    heading: "Your account",
    body: (
      <>
        <p>
          Keep your credentials secure and your account information accurate. You
          are responsible for everything done under your account, including by
          team members you invite. Tell us promptly at{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> if you suspect
          unauthorised access.
        </p>
        <p>
          Owners and managers control who has access to a business and at what
          role. Removing someone who leaves your team is your responsibility, and
          we recommend doing it the same day.
        </p>
        <p>
          You can close your account at any time. Closing it ends your access; it
          does not by itself refund fees already charged.
        </p>
      </>
    ),
  },
  {
    id: "subscriptions",
    heading: "Subscriptions and billing",
    body: (
      <>
        <p>
          LUX cloud features are sold as subscription plans. The price, billing
          period, and any device or seat limits are shown at checkout and on our{" "}
          <Link href="/pricing">pricing page</Link>, and those are the terms that
          apply to your purchase.
        </p>
        <p>
          <strong>Subscriptions renew automatically</strong> at the end of each
          billing period at the then-current rate, until cancelled. Cancel at any
          time in the app; cancellation takes effect at the end of the period you
          have already paid for, and you keep access until then.
        </p>
        <p>
          Payments are processed by Stripe, or — where a plan is purchased inside
          a mobile app — by the app store you bought it from, under that
          store&rsquo;s own billing and refund rules.
        </p>
        <p>
          Fees are exclusive of taxes, which we add where required. Subscription
          fees are non-refundable except where the law requires otherwise. If a
          payment fails we may retry it and may suspend paid features until it
          clears. We may change prices with at least 30 days&rsquo; notice before
          a change applies to your next renewal.
        </p>
      </>
    ),
  },
  {
    id: "hardware",
    heading: "Mirrors, reservations, and deposits",
    body: (
      <>
        <p>
          <strong>A reservation is free and is not a purchase.</strong> Reserving
          holds your place in a production run. Nothing is charged when you
          reserve, and we confirm price, configuration, and delivery with you by
          email before your unit ships.
        </p>
        <p>
          <strong>The $199 deposit is optional.</strong> It moves you up the
          production queue, and the full amount is credited against the price of
          your mirror at dispatch. Ask us before dispatch and we will refund it —
          it is a queue position, not a fee.
        </p>
        <p>
          Ship dates we publish are estimates for a hardware product still in
          production, not guarantees. We will tell you if a date moves, and you
          may cancel an unshipped reservation at any time for any reason.
        </p>
        <p>
          Title and risk of loss pass to you on delivery. A mirror needs a
          standard power outlet, Wi-Fi, and — for wall-mounted units — a wall
          that can carry the load; installation and any electrical work at your
          premises are yours to arrange.
        </p>
      </>
    ),
  },
  {
    id: "trial-warranty",
    heading: "Trial, returns, and warranty",
    body: (
      <>
        <p>
          <strong>30-day trial.</strong> If a mirror is not right for your floor,
          tell us within 30 days of delivery and we will arrange its return and
          refund what you paid for the hardware. It needs to come back complete
          and in reasonable condition — ordinary use is expected, damage is not.
        </p>
        <p>
          <strong>One-year hardware warranty.</strong> We warrant each mirror
          against defects in materials and workmanship for one year from
          delivery. We will repair or replace a defective unit, or refund it, at
          our option. The warranty does not cover accident, misuse, unauthorised
          modification, or damage from installation or power problems at your
          premises. Extended coverage is available as LUX Care.
        </p>
        <p>
          These remedies are in addition to any rights you have under applicable
          consumer law that cannot be waived.
        </p>
      </>
    ),
  },
  {
    id: "salon-obligations",
    heading: "If you run a salon on LUX",
    body: (
      <>
        <p>
          The client records, appointment history, notes, and photos you keep in
          LUX are yours. You are the controller of that information and we
          process it on your behalf — see{" "}
          <Link href="/privacy#two-roles">our two roles</Link>.
        </p>
        <p>That means you are responsible for:</p>
        <ul>
          <li>
            Having a lawful basis, and any consent required, to collect and keep
            client information — including photographs of a client, and any
            photograph of a minor.
          </li>
          <li>
            Telling your clients how you use their information, and honouring
            their requests about it.
          </li>
          <li>
            The accuracy of what you record, and managing who on your team can
            see it.
          </li>
          <li>
            Your own obligations as a business — licensing, employment, tax,
            health and safety, and the services you sell.
          </li>
        </ul>
        <p>
          LUX provides scheduling and record-keeping tools. It is not a
          substitute for professional, legal, or accounting advice, and we are
          not a party to the services you provide your clients.
        </p>
      </>
    ),
  },
  {
    id: "acceptable-use",
    heading: "Acceptable use",
    body: (
      <>
        <p>Do not:</p>
        <ul>
          <li>
            Attempt to access data belonging to another business, or probe,
            scan, or test the security of the Service without our written
            permission.
          </li>
          <li>
            Reverse-engineer, decompile, or tamper with mirror firmware, or use
            the Service to build a competing product.
          </li>
          <li>
            Upload malware, or content that is unlawful, infringing, or that you
            do not have the right to share.
          </li>
          <li>
            Photograph anyone without their knowledge and consent, or use the
            mirror to harass, surveil, or record people covertly.
          </li>
          <li>
            Resell or sublicense the Service, share one account across
            businesses, or work around device or seat limits.
          </li>
          <li>
            Scrape the Service, or place unreasonable load on it through
            automated means.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "content-and-ip",
    heading: "Your content and our intellectual property",
    body: (
      <>
        <p>
          <strong>You keep everything you put in.</strong> Your business details,
          client records, appointments, and photos remain yours. You grant us a
          limited licence to host, process, transmit, and display that content
          solely to operate the Service for you and as your{" "}
          <Link href="/privacy">Privacy Policy</Link> describes. We do not use it
          to train AI models.
        </p>
        <p>
          <strong>We keep everything we built.</strong>{" "}
          The LUX software,
          firmware, hardware design, style libraries, brand, name, and logo are
          ours or our licensors&rsquo;. These terms grant you a limited,
          non-exclusive, non-transferable right to use the Service while your
          account is in good standing — and nothing more.
        </p>
        <p>
          If you send us feedback or ideas, we may use them freely and without
          obligation to you.
        </p>
      </>
    ),
  },
  {
    id: "third-parties",
    heading: "Third-party services",
    body: (
      <>
        <p>
          The Service relies on providers including Stripe for payments and
          Supabase for hosting, and it may link to sites we do not control. Your
          use of a third-party service is governed by that provider&rsquo;s own
          terms, and we are not responsible for it. Mobile apps are additionally
          subject to the rules of the app store you obtained them from.
        </p>
      </>
    ),
  },
  {
    id: "availability",
    heading: "Availability and changes",
    body: (
      <>
        <p>
          We work to keep LUX available, but we do not promise uninterrupted
          service. We may take it down for maintenance, and we may change,
          improve, or discontinue features. If we discontinue something you rely
          on materially, we will give you reasonable notice and, where a paid
          plan is affected, a pro-rata refund of the unused period.
        </p>
        <p>
          A mirror needs a working internet connection for cloud features.
          Outages at your premises are outside our control.
        </p>
      </>
    ),
  },
  {
    id: "termination",
    heading: "Suspension and termination",
    body: (
      <>
        <p>
          You may stop using LUX and close your account at any time. We may
          suspend or terminate an account that breaches these terms, that we are
          required to act on by law, or that poses a security or payment risk —
          with notice where we reasonably can, and immediately where we cannot.
        </p>
        <p>
          After termination you have 30 days to export your data on request,
          after which we delete it as described in our{" "}
          <Link href="/privacy#retention">Privacy Policy</Link>. Terms that by
          their nature should survive — ownership, disclaimers, liability limits,
          indemnity, and governing law — do.
        </p>
      </>
    ),
  },
  {
    id: "disclaimers",
    heading: "Disclaimers",
    body: (
      <>
        <p>
          Except for the express hardware warranty above and any rights you have
          under consumer law that cannot be waived, the Service is provided
          &ldquo;as is&rdquo; and &ldquo;as available&rdquo;, without warranties
          of any kind, whether express, implied, or statutory, including implied
          warranties of merchantability, fitness for a particular purpose, and
          non-infringement.
        </p>
        <p>
          Style previews, colour try-ons, and AI-generated images are
          illustrative. They are not a promise of a result at the chair, and
          professional judgement remains yours.
        </p>
      </>
    ),
  },
  {
    id: "liability",
    heading: "Limitation of liability",
    body: (
      <>
        <p>
          To the fullest extent permitted by law, LUX will not be liable for
          indirect, incidental, special, consequential, or punitive damages, or
          for lost profits, lost revenue, lost bookings, lost goodwill, or lost
          or corrupted data.
        </p>
        <p>
          Our total liability arising out of or relating to the Service is
          limited to the greater of (a) the amounts you paid us in the 12 months
          before the event giving rise to the claim, or (b) one hundred US
          dollars.
        </p>
        <p>
          Some jurisdictions do not allow these exclusions, in which case they
          apply to you only to the extent permitted.
        </p>
      </>
    ),
  },
  {
    id: "indemnity",
    heading: "Indemnity",
    body: (
      <>
        <p>
          If you use LUX for a business, you agree to defend and indemnify LUX
          against claims, damages, and reasonable costs arising from your use of
          the Service, your breach of these terms, the services you provide your
          clients, or your handling of client information and photographs.
        </p>
      </>
    ),
  },
  {
    id: "disputes",
    heading: "Governing law and disputes",
    body: (
      <>
        <p>
          These terms are governed by the laws of the Commonwealth of
          Pennsylvania, without regard to its conflict-of-laws rules. The courts
          located in Berks County, Pennsylvania have exclusive jurisdiction, and
          both parties consent to venue there.
        </p>
        <p>
          Before filing anything, email{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> and give us 30
          days to sort it out. Most problems are a support ticket, not a lawsuit.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    heading: "Changes to these terms",
    body: (
      <>
        <p>
          We may update these terms as the product changes. The effective date at
          the top tells you which version applies. For material changes we will
          email account holders and give notice in the app at least 30 days
          before they take effect; continuing to use LUX after that means you
          accept them. If you do not, you may cancel and we will refund the
          unused portion of any prepaid period.
        </p>
      </>
    ),
  },
  {
    id: "general",
    heading: "General",
    body: (
      <>
        <p>
          These terms, together with the{" "}
          <Link href="/privacy">Privacy Policy</Link> and any order or plan
          details shown at checkout, are the entire agreement between us. If a
          provision is found unenforceable, the rest stays in force. Our failure
          to enforce something is not a waiver of it. You may not assign this
          agreement without our consent; we may assign it in connection with a
          merger or sale of the business.
        </p>
        <p>
          Questions: <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>, or{" "}
          <Link href="/contact">contact us</Link>. Lux Mirror LLC, 96 Commerce
          Drive PMB 200, Wyomissing, PA 19610.
        </p>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalDoc
      eyebrow="Legal"
      title={
        <>
          Terms of <em>Service</em>
        </>
      }
      effective={EFFECTIVE}
      intro={
        <p>
          The agreement between you and Lux Mirror LLC — what you can expect from
          us, what we expect from you, and how the money, the mirrors, and the
          data work. Written to be understood rather than to be impressive.
        </p>
      }
      sections={SECTIONS}
    />
  );
}
