"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import RatingStars from "@/components/RatingStars";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function ProductCard({ product, onSelect }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 92%",
            once: true,
          },
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <button
      ref={cardRef}
      onClick={() => onSelect(product)}
      className="group flex w-full flex-col overflow-hidden rounded-2xl bg-white text-left shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative h-44 w-full overflow-hidden sm:h-48">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        {product.tag && (
          <span className="absolute left-3 top-3 rounded-full bg-mustard px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-charcoal">
            {product.tag}
          </span>
        )}
        {product.oldPrice && (
          <span className="absolute right-3 top-3 rounded-full bg-chili px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-cream">
            Save Rs. {product.oldPrice - product.price}
          </span>
        )}
        <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-charcoal text-cream shadow-md transition group-hover:bg-chili">
          <Plus className="h-4 w-4" />
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-chili">
          {product.category}
        </p>
        <h3 className="font-display text-lg leading-tight text-charcoal">
          {product.title}
        </h3>
        <p className="line-clamp-2 text-sm text-charcoal/60">
          {product.description}
        </p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-lg text-charcoal">
              Rs. {product.price}
            </span>
            {product.oldPrice && (
              <span className="text-xs text-charcoal/40 line-through">
                Rs. {product.oldPrice}
              </span>
            )}
          </div>
          <RatingStars rating={product.rating} />
        </div>
      </div>
    </button>
  );
}
