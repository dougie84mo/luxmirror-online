import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/*
 * A printed QR can outlive the shop that printed it — this covers links
 * to businesses that unpublished booking or never activated it.
 */
export default function BookingNotFound() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-start justify-center px-6 py-24">
      <p className="eyebrow mb-4">LUX Booking</p>
      <h1 className="display text-4xl sm:text-5xl">
        This booking link isn&apos;t live.
      </h1>
      <p className="mt-4 max-w-prose text-muted-foreground">
        The business behind this link hasn&apos;t turned on online booking, or
        the link is out of date. Ask at the counter for their current booking
        link — or see what LUX puts on the wall.
      </p>
      <Link
        href="/"
        className={cn(buttonVariants({ variant: "outline", size: "lg" }), "mt-8 px-6")}
      >
        Explore LUX Mirror
      </Link>
    </div>
  );
}
