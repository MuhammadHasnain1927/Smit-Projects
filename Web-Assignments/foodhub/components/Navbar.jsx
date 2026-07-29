"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import { Flame, Menu, ShoppingBag, User, X } from "lucide-react";
import { CartContext } from "@/context/CartContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Deals", href: "/menu?category=Deals" },
];

export default function Navbar() {
  const { cartCount, setIsCartOpen } = useContext(CartContext);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-chili">
            <Flame className="h-5 w-5 text-cream" strokeWidth={2.5} />
          </span>
          <span className="font-display text-xl tracking-wide text-charcoal">
            FLAME<span className="text-chili">&amp;</span>CO
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-body text-sm font-semibold uppercase tracking-wide text-charcoal/80 transition hover:text-chili"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/login"
            className="hidden items-center gap-2 rounded-full border border-charcoal/15 px-4 py-2 text-sm font-semibold text-charcoal transition hover:border-chili hover:text-chili sm:flex"
          >
            <User className="h-4 w-4" />
            Login
          </Link>

          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="Open cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-charcoal text-cream transition hover:bg-chili"
          >
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-mustard text-[11px] font-bold text-charcoal">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-charcoal/15 md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-72 animate-fadeUp bg-cream p-6 shadow-xl">
            <div className="mb-8 flex items-center justify-between">
              <span className="font-display text-lg text-charcoal">Menu</span>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-charcoal/5"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-body text-base font-semibold text-charcoal transition hover:text-chili"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="font-body text-base font-semibold text-charcoal transition hover:text-chili"
              >
                Login
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileOpen(false)}
                className="font-body text-base font-semibold text-charcoal transition hover:text-chili"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
