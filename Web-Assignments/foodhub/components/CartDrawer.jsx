"use client";

import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { CartContext } from "@/context/CartContext";
import { gsap } from "@/lib/gsap";

export default function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    increaseQty,
    decreaseQty,
    removeFromCart,
    subtotal,
    deliveryFee,
    grandTotal,
  } = useContext(CartContext);

  const [shouldRender, setShouldRender] = useState(false);
  const backdropRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (isCartOpen) setShouldRender(true);
  }, [isCartOpen]);

  useLayoutEffect(() => {
    if (shouldRender && panelRef.current) {
      gsap.set(panelRef.current, { xPercent: 100 });
    }
  }, [shouldRender]);

  useEffect(() => {
    if (!shouldRender || !panelRef.current || !backdropRef.current) return;

    if (isCartOpen) {
      gsap.to(panelRef.current, {
        xPercent: 0,
        duration: 0.45,
        ease: "power3.out",
      });
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: "power2.out" }
      );
    } else {
      gsap.to(panelRef.current, {
        xPercent: 100,
        duration: 0.35,
        ease: "power2.in",
      });
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => setShouldRender(false),
      });
    }
  }, [isCartOpen, shouldRender]);

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 z-[80]">
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/50"
        onClick={() => setIsCartOpen(false)}
      />

      <div
        ref={panelRef}
        className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-charcoal/10 bg-charcoal px-5 py-4">
          <span className="flex items-center gap-2 font-display text-lg text-cream">
            <ShoppingBag className="h-5 w-5" /> Your Cart
          </span>
          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-cream"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-charcoal/5">
              <ShoppingBag className="h-8 w-8 text-charcoal/30" />
            </div>
            <h3 className="font-display text-xl text-charcoal">
              Your cart is empty
            </h3>
            <p className="text-sm text-charcoal/60">
              Looks like you haven&apos;t added anything yet.
            </p>
            <Link
              href="/menu"
              onClick={() => setIsCartOpen(false)}
              className="mt-2 rounded-full bg-chili px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-cream"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="flex flex-col gap-4">
                {cartItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-black/5"
                  >
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-semibold leading-snug text-charcoal">
                          {item.title}
                        </p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          aria-label="Remove item"
                          className="text-charcoal/40 transition hover:text-chili"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-chili">
                          Rs. {item.price * item.qty}
                        </span>
                        <div className="flex items-center gap-2 rounded-full border border-charcoal/15 px-1.5 py-0.5">
                          <button
                            onClick={() => decreaseQty(item.id)}
                            aria-label="Decrease quantity"
                            className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-charcoal/5"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-4 text-center text-xs font-bold">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => increaseQty(item.id)}
                            aria-label="Increase quantity"
                            className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-charcoal/5"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-charcoal/10 bg-white px-5 py-5">
              <div className="mb-4 space-y-2 text-sm">
                <div className="flex justify-between text-charcoal/60">
                  <span>Subtotal</span>
                  <span>Rs. {subtotal}</span>
                </div>
                <div className="flex justify-between text-charcoal/60">
                  <span>Delivery Fee</span>
                  <span>Rs. {deliveryFee}</span>
                </div>
                <div className="flex justify-between border-t border-charcoal/10 pt-2 font-display text-lg text-charcoal">
                  <span>Grand Total</span>
                  <span>Rs. {grandTotal}</span>
                </div>
              </div>
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="flex w-full items-center justify-center rounded-full bg-chili py-3 text-sm font-bold uppercase tracking-wide text-cream transition hover:bg-chili-600"
              >
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
