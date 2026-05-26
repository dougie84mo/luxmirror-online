"use client";

import Link from "next/link";
import { ArrowUpRight, Menu } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          aria-label="LUX Mirror home"
          className="display text-xl tracking-tight"
        >
          LUX
        </Link>

        <nav className="hidden gap-10 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/75 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/shop"
            className={cn(
              buttonVariants({ variant: "default", size: "default" }),
              "hidden h-10 rounded-full px-5 text-sm font-medium lg:inline-flex",
            )}
          >
            Reserve
            <ArrowUpRight className="ml-1 size-3.5" />
          </Link>

          <Sheet>
            <SheetTrigger
              render={
                <button
                  type="button"
                  aria-label="Open menu"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "lg:hidden",
                  )}
                />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-background">
              <SheetHeader>
                <SheetTitle className="display text-2xl">LUX</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col px-2 pb-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="border-b border-border px-3 py-4 text-base font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/shop"
                  className={cn(
                    buttonVariants({ variant: "default", size: "lg" }),
                    "mt-6 h-12 rounded-full text-sm font-medium",
                  )}
                >
                  Reserve a mirror
                  <ArrowUpRight className="ml-1 size-4" />
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
