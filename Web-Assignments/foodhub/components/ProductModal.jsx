"use client";

import { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import RatingStars from "@/components/RatingStars";
import { CartContext } from "@/context/CartContext";
import { gsap } from "@/lib/gsap";

const addonOptions = [
  { id: "extra-cheese", label: "Extra Cheese", price: 100 },
  { id: "extra-sauce", label: "Extra Sauce", price: 60 },
  { id: "spicy-kick", label: "Spicy Kick", price: 50 },
];

export default function ProductModal({ product, onClose }) {
  const { addToCart } = useContext(CartContext);
  const [qty, setQty] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState([]);

  const backdropRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    setQty(1);
    setSelectedAddons([]);
  }, [product]);

  useEffect(() => {
    document.body.style.overflow = product ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [product]);

  useEffect(() => {
    if (!product || !backdropRef.current || !panelRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(
        panelRef.current,
        { y: 40, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: "power3.out" }
      );
    });
    return () => ctx.revert();
  }, [product]);

  if (!product) return null;

  const animateClose = (callback) => {
    if (!backdropRef.current || !panelRef.current) {
      callback();
      return;
    }
    gsap.to(panelRef.current, {
      y: 30,
      opacity: 0,
      scale: 0.97,
      duration: 0.25,
      ease: "power2.in",
    });
    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
      onComplete: callback,
    });
  };

  const handleClose = () => animateClose(onClose);

  const toggleAddon = (addon) => {
    setSelectedAddons((prev) =>
      prev.some((item) => item.id === addon.id)
        ? prev.filter((item) => item.id !== addon.id)
        : [...prev, addon]
    );
  };

  const addonsTotal = selectedAddons.reduce((sum, item) => sum + item.price, 0);
  const unitPrice = product.price + addonsTotal;
  const totalPrice = unitPrice * qty;

  const handleAddToCart = () => {
    const addonLabel =
      selectedAddons.length > 0
        ? ` (${selectedAddons.map((a) => a.label).join(", ")})`
        : "";
    animateClose(() => {
      addToCart(
        {
          ...product,
          id: `${product.id}-${selectedAddons.map((a) => a.id).join("-")}`,
          title: `${product.title}${addonLabel}`,
          price: unitPrice,
        },
        qty
      );
      onClose();
    });
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-4">
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/60"
        onClick={handleClose}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        className="relative z-10 mx-auto flex max-h-[92vh] w-full max-w-3xl flex-col overflow-y-auto rounded-t-3xl bg-white sm:flex-row sm:overflow-hidden sm:rounded-3xl"
      >
        <div className="relative h-56 w-full flex-shrink-0 sm:h-auto sm:w-1/2">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 sm:hidden">
            <h2 className="font-display text-xl text-cream">{product.title}</h2>
          </div>
        </div>

        <div className="flex w-full flex-col gap-5 p-5 sm:w-1/2 sm:p-7">
          <button
            onClick={handleClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-charcoal/80 text-cream sm:right-6 sm:top-6"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="hidden sm:block">
            <p className="text-xs font-semibold uppercase tracking-wide text-chili">
              {product.category}
            </p>
            <h2 className="mt-1 font-display text-2xl text-charcoal">
              {product.title}
            </h2>
          </div>

          <RatingStars rating={product.rating} />

          <p className="text-sm leading-relaxed text-charcoal/60">
            {product.description}
          </p>

          <div className="border-t border-charcoal/10 pt-4">
            <p className="mb-3 text-sm font-bold uppercase tracking-wide text-charcoal">
              Add-ons <span className="font-normal text-charcoal/40">(optional)</span>
            </p>
            <div className="flex flex-col gap-2">
              {addonOptions.map((addon) => {
                const isChecked = selectedAddons.some((a) => a.id === addon.id);
                return (
                  <label
                    key={addon.id}
                    className={`flex cursor-pointer items-center justify-between rounded-xl border px-4 py-3 text-sm transition ${
                      isChecked
                        ? "border-chili bg-chili/5"
                        : "border-charcoal/10"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleAddon(addon)}
                        className="h-4 w-4 accent-chili"
                      />
                      {addon.label}
                    </span>
                    <span className="font-semibold text-charcoal/70">
                      +Rs. {addon.price}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="mt-auto flex items-center justify-between gap-4 border-t border-charcoal/10 pt-5">
            <div className="flex items-center gap-3 rounded-full border border-charcoal/15 px-2 py-1">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-charcoal/5 transition hover:bg-charcoal/10"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-5 text-center font-bold">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase quantity"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-charcoal/5 transition hover:bg-charcoal/10"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-chili px-5 py-3 text-sm font-bold uppercase tracking-wide text-cream transition hover:bg-chili-600"
            >
              Add · Rs. {totalPrice}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
