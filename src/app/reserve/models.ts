/* Shared between the reserve page, form, and Server Action — matches the
 * shop page's two hardware formats and the DB model whitelist. */

export const MIRROR_MODELS = [
  {
    id: "lux-27",
    name: "LUX 27",
    price: "$2,400",
    blurb: "Chair-side · 27″ 4K AMOLED",
  },
  {
    id: "lux-full",
    name: "LUX Full-Length",
    price: "$3,200",
    blurb: "Floor-standing · 55″ 4K AMOLED",
  },
] as const;

export type MirrorModelId = (typeof MIRROR_MODELS)[number]["id"];

export function isMirrorModel(value: string): value is MirrorModelId {
  return MIRROR_MODELS.some((m) => m.id === value);
}
