import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin, Phone, Star } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  avatarUrl,
  getBusinessPublic,
  getLocations,
  getLoyalty,
  getMemberRating,
  getPolicy,
  getProviders,
  getServices,
  isUuid,
  type BookingPolicy,
  type PublicService,
} from "@/lib/booking";

/*
 * The web half of the QR/booking link (contract:
 * app/prompts/QR_BOOKING_ENDPOINT.md). Someone standing in the shop
 * scans the wall QR; if the LUX Booking app is installed the OS hands
 * off via Universal/App Links before this page matters. This page is
 * the fallback: the shop's wall card, digitized — the house offer plus
 * a route into the app.
 */

export async function generateMetadata({
  params,
}: PageProps<"/book/[businessId]">): Promise<Metadata> {
  const { businessId } = await params;
  if (!isUuid(businessId)) return { title: "Book" };
  const business = await getBusinessPublic(businessId).catch(() => null);
  if (!business) return { title: "Book" };
  return {
    title: `Book at ${business.name}`,
    description:
      business.description ??
      `View services and book a visit at ${business.name} with LUX Booking.`,
  };
}

function formatPrice(price: number): string {
  return Number.isInteger(price) ? `$${price}` : `$${price.toFixed(2)}`;
}

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h} hr` : `${h} hr ${m} min`;
}

function formatType(type: string | null): string | null {
  if (!type) return null;
  return type.charAt(0) + type.slice(1).toLowerCase();
}

function groupByCategory(services: PublicService[]) {
  const groups = new Map<string, PublicService[]>();
  for (const s of services) {
    const key = s.category ?? "Services";
    const list = groups.get(key) ?? [];
    list.push(s);
    groups.set(key, list);
  }
  return [...groups.entries()];
}

function policyLines(policy: BookingPolicy | null): string[] {
  if (!policy) return [];
  const lines: string[] = [];
  if (policy.cancellation_window_hours) {
    lines.push(
      `Cancel or reschedule up to ${policy.cancellation_window_hours} hours before your visit.`,
    );
  }
  if (policy.late_cancel_fee && policy.late_cancel_fee > 0) {
    lines.push(
      `Late cancellations carry a ${formatPrice(policy.late_cancel_fee)} fee.`,
    );
  }
  if (policy.no_show_fee && policy.no_show_fee > 0) {
    lines.push(`No-shows carry a ${formatPrice(policy.no_show_fee)} fee.`);
  }
  if (policy.deposit_required && policy.deposit_value) {
    const amount =
      policy.deposit_type === "percent"
        ? `${policy.deposit_value}%`
        : formatPrice(policy.deposit_value);
    lines.push(`A ${amount} deposit is collected when you book.`);
  }
  if (policy.cancellation_policy) lines.push(policy.cancellation_policy);
  return lines;
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow mb-5">{children}</p>;
}

function AppCta({
  deepLink,
  className,
}: {
  deepLink: string;
  className?: string;
}) {
  return (
    <a
      href={deepLink}
      className={cn(buttonVariants({ size: "lg" }), "btn-violet px-6", className)}
    >
      Open in the LUX Booking app
    </a>
  );
}

async function ProviderCard({
  businessId,
  providerId,
  name,
  avatar,
}: {
  businessId: string;
  providerId: string;
  name: string;
  avatar: string | null;
}) {
  const rating = await getMemberRating(businessId, providerId).catch(
    () => null,
  );
  return (
    <li className="flex items-center gap-3 rounded-lg border bg-surface p-3">
      {avatar ? (
        // Tenant avatars live on arbitrary hosts (Storage or seeded URLs) —
        // next/image would need every host allow-listed, so plain img here.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={avatar}
          alt=""
          width={44}
          height={44}
          loading="lazy"
          className="size-11 shrink-0 rounded-full border object-cover"
        />
      ) : (
        <span
          aria-hidden
          className="flex size-11 shrink-0 items-center justify-center rounded-full border bg-secondary font-mono text-sm"
        >
          {name.replace(/^\[seed\]\s*/i, "").charAt(0)}
        </span>
      )}
      <div className="min-w-0">
        <p className="truncate text-sm font-medium">{name}</p>
        {rating?.avg_rating && rating.review_count > 0 ? (
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star aria-hidden className="size-3 fill-current" />
            {rating.avg_rating.toFixed(1)}
            <span aria-hidden>·</span>
            {rating.review_count}{" "}
            {rating.review_count === 1 ? "review" : "reviews"}
          </p>
        ) : (
          <p className="text-xs text-muted-foreground">Taking bookings</p>
        )}
      </div>
    </li>
  );
}

export default async function BookPage({
  params,
}: PageProps<"/book/[businessId]">) {
  const { businessId } = await params;
  if (!isUuid(businessId)) notFound();

  const business = await getBusinessPublic(businessId);
  if (!business) notFound();

  const [services, providers, locations, policy, loyalty] = await Promise.all([
    getServices(businessId).catch(() => []),
    getProviders(businessId).catch(() => []),
    getLocations(businessId).catch(() => []),
    getPolicy(businessId).catch(() => null),
    getLoyalty(businessId).catch(() => null),
  ]);

  const deepLink = `luxbooking://book/${business.id}`;
  const type = formatType(business.type);
  const city = locations[0]?.city ?? null;
  const houseRules = policyLines(policy);
  const loyaltyLine =
    loyalty?.is_active &&
    (loyalty.description ??
      (loyalty.reward_every && loyalty.reward_percent
        ? `Every ${loyalty.reward_every}th visit is ${loyalty.reward_percent}% off.`
        : null));

  return (
    <div className="mx-auto w-full max-w-2xl px-6 pt-14 pb-28 sm:pt-20 sm:pb-20">
      {/* ─── The shop ─────────────────────────────────────────── */}
      <header className="relative">
        <div aria-hidden className="wall-glow" />
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="eyebrow mb-4">
              {[type, city].filter(Boolean).join(" · ") || "Book a visit"}
            </p>
            <h1 className="display text-4xl sm:text-5xl">{business.name}</h1>
          </div>
          {business.logo_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={business.logo_url}
              alt=""
              width={64}
              height={64}
              className="mt-1 size-16 shrink-0 rounded-xl border object-cover"
            />
          )}
        </div>

        {business.avg_rating != null && business.review_count > 0 && (
          <p className="mt-4 flex items-center gap-1.5 text-sm">
            <Star aria-hidden className="size-4 fill-current" />
            <span className="font-medium">
              {business.avg_rating.toFixed(1)}
            </span>
            <span className="text-muted-foreground">
              ({business.review_count}{" "}
              {business.review_count === 1 ? "review" : "reviews"})
            </span>
          </p>
        )}

        {business.description && (
          <p className="mt-4 max-w-prose text-muted-foreground">
            {business.description}
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <AppCta deepLink={deepLink} className="max-sm:hidden" />
          <span className="lux-chip">
            <span aria-hidden className="lux-chip-dot" />
            LUX Booking
          </span>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Booking happens in the app — coming soon to the App Store and Google
          Play.
        </p>
      </header>

      {/* ─── The wall menu ────────────────────────────────────── */}
      <section className="mt-16">
        <SectionEyebrow>The menu</SectionEyebrow>
        {services.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            The menu isn&apos;t posted online yet — ask in the shop.
          </p>
        ) : (
          <div className="space-y-8">
            {groupByCategory(services).map(([category, items]) => (
              <div key={category}>
                {groupByCategory(services).length > 1 && (
                  <p className="mb-3 font-mono text-[0.625rem] tracking-[0.2em] uppercase text-muted-foreground">
                    {category}
                  </p>
                )}
                <ul className="space-y-2.5">
                  {items.map((s) => (
                    <li key={s.id} className="menu-row">
                      <span className="menu-label">{s.name}</span>
                      <span className="menu-dots" aria-hidden />
                      <span className="menu-value">
                        {formatPrice(s.price)} · {formatDuration(s.duration)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ─── The chairs ───────────────────────────────────────── */}
      {providers.length > 0 && (
        <section className="mt-16">
          <SectionEyebrow>The chairs</SectionEyebrow>
          <ul className="grid gap-3 sm:grid-cols-2">
            {providers.map((p) => (
              <ProviderCard
                key={p.id}
                businessId={business.id}
                providerId={p.id}
                name={p.name}
                avatar={avatarUrl(p.avatar_path)}
              />
            ))}
          </ul>
        </section>
      )}

      {/* ─── Loyalty ──────────────────────────────────────────── */}
      {loyaltyLine && (
        <section className="mt-16">
          <SectionEyebrow>House loyalty</SectionEyebrow>
          <p className="text-sm">{loyaltyLine}</p>
        </section>
      )}

      {/* ─── Find us ──────────────────────────────────────────── */}
      {locations.length > 0 && (
        <section className="mt-16">
          <SectionEyebrow>Find us</SectionEyebrow>
          <ul className="space-y-5">
            {locations.map((loc) => (
              <li key={loc.id} className="text-sm">
                {loc.name && <p className="font-medium">{loc.name}</p>}
                {(loc.street || loc.city) && (
                  <p className="mt-1 flex items-center gap-1.5 text-muted-foreground">
                    <MapPin aria-hidden className="size-3.5 shrink-0" />
                    {[
                      loc.street,
                      [loc.city, loc.state].filter(Boolean).join(", "),
                      loc.zip,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                )}
                {loc.phone_number && (
                  <p className="mt-1 flex items-center gap-1.5 text-muted-foreground">
                    <Phone aria-hidden className="size-3.5 shrink-0" />
                    <a href={`tel:${loc.phone_number}`} className="hover:underline">
                      {loc.phone_number}
                    </a>
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ─── House policy ─────────────────────────────────────── */}
      {houseRules.length > 0 && (
        <section className="mt-16">
          <SectionEyebrow>House policy</SectionEyebrow>
          <ul className="max-w-prose space-y-2 text-sm text-muted-foreground">
            {houseRules.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>
      )}

      {/* ─── Mobile dock — the page's one job ─────────────────── */}
      <div className="cta-dock sm:hidden">
        <AppCta deepLink={deepLink} className="w-full" />
      </div>
    </div>
  );
}
