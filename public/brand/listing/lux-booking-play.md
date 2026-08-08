# LUX Booking — Google Play listing (draft)

Package `com.theluxmirror.booking` · Category: Lifestyle
Content rating: Everyone · Character counts shown as `used/limit`.

---

## App name — 11/30

```
LUX Booking
```

## Short description — 71/80

```
Book a barber or salon near you, and keep every look you've had.
```

## Full description — 1,455/4,000

```
LUX Booking is how you book a chair at a shop running LUX — and how you keep track of what they did last time.

FIND A SHOP
Search by what you need, or see what's near you. You're looking at real availability from real calendars, not a request form that might get answered tomorrow.

BOOK IN A FEW TAPS
Pick a service, pick your stylist — or take whoever's free first — and choose a time that actually exists. Confirmation is instant.

NO MORE "WHAT DID WE DO LAST TIME"
Every visit lands on your timeline, along with the photos your stylist captured at the chair. Show up, show the picture, skip the explaining.

RUNNING LATE, OR NOT COMING
Reschedule or cancel from your phone. Your shop sees it right away, and the slot goes back to someone who wants it.

CHECK IN FROM THE DOOR
Let the shop know you've arrived without interrupting whoever's in the chair.

REMINDERS THAT ACTUALLY HELP
A nudge before your appointment and a note when something changes. Nothing else.

LUX Booking is free, and there is nothing to buy inside it. You pay your shop the way you always have.

Privacy policy: https://theluxmirror.com/privacy
Terms of service: https://theluxmirror.com/terms
Support: support@theluxmirror.com
```

---

## Data safety form — answers

*Must match `/privacy`. Update both together or neither.*

| Question | Answer |
|---|---|
| Data collected? | Yes |
| Data shared with third parties? | Yes — processors only (Supabase, Sentry, Firebase, Resend), plus the shop you book with |
| Encrypted in transit? | Yes |
| Users can request deletion? | Yes |
| Data types | Name, email, phone, photos, app activity, crash logs, approximate location (optional) |
| Purposes | App functionality, account management, analytics |
| Is any data required? | Name and email are required; location is optional |

Note the honest extra on this one: booking an appointment shares your name and
contact details **with the shop you book with**. Declare it.

## Testing instructions

- **Demo account:** `<email>` / `<password>` — has upcoming and past bookings and
  a populated photo library. **Required** — the app is login-gated.
- The "near me" search asks for approximate location and is optional; search
  works by name if declined.
- No purchases in the app.

## Store assets required

| Asset | Spec | Status |
|---|---|---|
| App icon | 512×512 PNG, distinct from LUX Mirror | ❌ still the Expo default |
| Feature graphic | 1024×500 | ❌ missing — blocks publishing |
| Phone screenshots | 1080×1920, min 2 | ❌ none captured |
