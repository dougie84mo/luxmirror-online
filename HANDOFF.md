# Brand & store asset handoff

**The drop folder is [`public/brand/`](public/brand/).** Anything committed there
deploys with the site and gets a permanent public URL:

```
public/brand/logo/lux-wordmark.svg  →  https://theluxmirror.com/brand/logo/lux-wordmark.svg
```

That is the point of putting it here rather than in a shared drive — handing off
means sending a link, and the link keeps working. Store consoles, Stripe, press,
and partners can all pull from the same place, and git tracks every revision.

Spec sheets stay in this file (not served). Binaries go in `public/brand/`.

> **Nothing here is confidential.** `public/brand/` is served to the open
> internet. Don't put contracts, keys, unreleased pricing, or customer photos in
> it. Store *copy* is fine — it becomes public the day the listing goes live.

---

## What's blocking right now

| Blocker | Status |
|---|---|
| App icons are the Expo template default | 🔴 **Both apps ship the identical stock icon** (verified: same md5). Two apps can't carry the same icon on the stores, and neither is branded. `lux-*` in `app-icons/` is ready to drop in for one of them; the other still needs its own mark. |
| Feature graphic (Play) | 🔴 Missing — Play will not publish without it. |
| Screenshots | 🔴 None captured for either app, either platform. |
| Web favicons | ✅ Done. `lux-favicon.ico` / `lux-icon.svg` / `lux-180.png` are installed on both theluxmirror.com and admin.theluxmirror.com. |
| Site wordmark | ✅ Done. See "The wordmark" below. |
| Store listing copy | ✅ Drafted for all four listings in `listing/`. Needs a read-through, not a rewrite. |

---

## The wordmark

The site's wordmark is **live text, not an image** —
`src/components/Wordmark.tsx` plus the `.wordmark` rules in `globals.css`.
It sets LUXMIRROR in Bodoni Moda with the app icon's violet glint above the
final R. Header, mobile menu, and footer all render the same component.

Text rather than a PNG because the header sits on silver and the footer on
ink: live text inherits the surface colour, stays sharp at any size and
density, and lets search engines and screen readers read the brand name
instead of an `alt` attribute. Size it with a normal `text-*` class — every
dimension inside is in `em`.

`logo/1-monogram.png` … `logo/7-glint.png` are **concept boards**, not
production files: raster, all on a solid dark ground, several with a tagline
baked in. Keep them for reference and for picking a direction. What is still
missing for third parties who need a file rather than a component is an
outlined-vector `logo/lux-wordmark.svg` — glyphs converted to paths so it
doesn't depend on Bodoni being installed. Same for `lux-mark.svg`, whose `L`
is still a `<text>` element falling back to Georgia off our pages.

---

## Brand constants

Use these values; don't re-pick them per surface.

| Token | Value | Where it comes from |
|---|---|---|
| Violet (glow) | `#7c5cff` | Light the *device* emits. Halos, focus, primary CTA. |
| Ink | `#0b0d12` | Near-black. Admin console background, dark surfaces. |
| Silver | `#f2f3f6` | Light-theme page ground. Cool, never cream. |
| Tungsten | `#f0e3cd` | Ambient *shop* light. Washes behind imagery only. |
| Display face | Bodoni Moda | Editorial didone, `opsz` 96, weight 460. |
| Text face | Geist / Geist Mono | Sans for body, mono for eyebrows and labels. |

Rule that keeps the brand coherent: **violet never decorates.** It appears only
where the mirror's own interface is depicted, or where the user's focus lives.
Warm tungsten is for ambient wall-wash, never for type or UI.

Full rationale: `src/app/globals.css`, "TUNGSTEN & SILVER".

---

## `public/brand/logo/` — identity

| File | Spec | Notes |
|---|---|---|
| `lux-wordmark.svg` | Vector, outlined text | The word LUX. Outline the glyphs — don't rely on Bodoni being installed. |
| `lux-wordmark-light.svg` | Vector | For dark backgrounds. |
| `lux-logomark.svg` | Vector, square canvas | The standalone glyph. Must read at 24px. |
| `lux-logomark-1024.png` | 1024×1024, transparent | Raster fallback for consoles that reject SVG. |
| `lux-wordmark.png` | ≥2000px wide, transparent | Press and slide decks. |

---

## `public/brand/app-icons/` — store icons

Two apps, two distinct icons. They should look like siblings, not twins.

| App | Bundle ID | Icon slot | Spec |
|---|---|---|---|
| **LUX Mirror** (business) | `com.theluxmirror.app` | iOS App Store | 1024×1024 PNG, **no alpha**, no rounded corners, sRGB |
| | | Play Store | 512×512 PNG, 32-bit, alpha allowed |
| | | Android adaptive | 1024×1024 foreground + background; keep art inside the centre 66% safe zone |
| **LUX Booking** (client) | `com.theluxmirror.booking` | *same three slots* | |

Once approved these also replace `app/assets/images/` and
`customer-app/assets/images/` — `icon.png`, `android-icon-foreground.png`,
`android-icon-background.png`, `android-icon-monochrome.png`, `splash-icon.png`,
`favicon.png`. The monochrome one is a single-colour silhouette for Android
themed icons.

---

## `public/brand/screenshots/` — store screenshots

Capture on a real device or a simulator at exactly these resolutions. Framed
mockups are allowed on both stores; plain captures are also fine.

**iOS** (`screenshots/ios/`) — Apple only needs the largest iPhone size, plus
iPad if the app is listed for iPad.

| Device | Portrait | Count |
|---|---|---|
| 6.9″ iPhone | 1320 × 2868 | 3–10 (first 3 are what people see) |
| 13″ iPad | 2064 × 2752 | only if iPad is supported |

**Android** (`screenshots/android/`)

| Slot | Spec | Count |
|---|---|---|
| Phone | 1080 × 1920 (9:16), min 2 | 4–8 |
| Feature graphic | **1024 × 500**, PNG or JPEG, no alpha | 1, **required** |
| 7″ / 10″ tablet | 1200×1920 / 1600×2560 | only if tablets are supported |

Suggested order for both apps — lead with the payoff, not the login screen:

1. **LUX Mirror**: fleet dashboard → calendar/day view → device detail with live status → client record → team roles
2. **LUX Booking**: discover shops near you → pick a time → booking confirmed → my photos → reminders

---

## `public/brand/product/` — hardware imagery

Replaces the SVG stand-ins listed in `public/ASSET_SOURCES.md`.

| File | Use |
|---|---|
| `lux-27.png` | Chair-side unit, 3:4 portrait, ≥2400px, transparent or silver ground |
| `lux-fulllength.png` | Floor-standing unit, same treatment |
| `lux-27-in-situ.jpg` | Mounted on a real salon wall, 16:9, ≥2400px |
| `hero-salon.jpg` | Warm-lit shop, stylist + client, mirror in frame, 16:9 |

---

## `public/brand/listing/` — store copy

One markdown file per app per store, so wording is versioned instead of pasted
from a chat. Character limits are hard caps — the console truncates silently.

| Field | iOS | Play |
|---|---|---|
| App name | 30 | 30 |
| Subtitle / short description | 30 | 80 |
| Promotional text | 170 | — |
| Full description | 4,000 | 4,000 |
| Keywords | 100 (comma-separated) | — (Play reads the description) |

Both stores additionally need, and these already exist:

- Privacy policy URL — `https://theluxmirror.com/privacy`
- Terms URL — `https://theluxmirror.com/terms`
- Support URL — `https://theluxmirror.com/contact`
- Marketing URL — `https://theluxmirror.com`
- Support email — `support@theluxmirror.com`

---

## Stripe dashboard branding

Settings → Business → Branding. Drives Checkout, the Customer Portal, receipts,
and Connect onboarding for every salon.

| Slot | Spec |
|---|---|
| Icon | Square, ≥128×128, JPG/PNG |
| Logo | ≥128×128, shown on Checkout |
| Brand colour | `#7c5cff` |
| Accent colour | `#0b0d12` |

Same files as `public/brand/logo/lux-logomark-1024.png`.

---

## Checklist

- [x] Site wordmark — `src/components/Wordmark.tsx`, live on header + footer
- [x] Favicons on theluxmirror.com and admin.theluxmirror.com
- [x] Listing copy drafted for four listings (2 apps × 2 stores)
- [x] Stripe branding uploaded
- [ ] Outlined-vector `logo/lux-wordmark.svg` for third parties
- [ ] Two distinct app icons, all three size slots each
- [ ] Icons copied into `app/assets/images/` and `customer-app/assets/images/`
- [ ] Play feature graphic, 1024×500
- [ ] iOS screenshots, 1320×2868, both apps
- [ ] Play screenshots, 1080×1920, both apps
- [ ] Product photography replacing the SVG stand-ins
