"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flame, ShieldCheck, Timer, Truck } from "lucide-react";
import HeroSlider from "@/components/HeroSlider";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import products from "@/data/products";
import { categories, deals } from "@/data/deals";

const popular = products.filter((p) => p.tag === "Best Seller" || p.rating >= 4.6).slice(0, 4);

const perks = [
  { icon: Truck, label: "Fast Delivery", detail: "Avg. 30 minutes" },
  { icon: Flame, label: "Cooked Fresh", detail: "Made to order" },
  { icon: ShieldCheck, label: "Secure Payments", detail: "Card or cash" },
  { icon: Timer, label: "Live Order Tracking", detail: "Know your ETA" },
];

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <>
      <HeroSlider />

      {/* Perks bar */}
      <section className="border-b border-charcoal/5 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 md:grid-cols-4 lg:px-8">
          {perks.map((perk) => (
            <div key={perk.label} className="flex items-center gap-3">
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-mustard/15 text-chili">
                <perk.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold text-charcoal">{perk.label}</p>
                <p className="text-xs text-charcoal/50">{perk.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-chili">
              What are you craving?
            </p>
            <h2 className="font-display text-3xl text-charcoal sm:text-4xl">
              Shop by Category
            </h2>
          </div>
          <Link
            href="/menu"
            className="hidden items-center gap-1 text-sm font-semibold text-chili sm:flex"
          >
            View full menu <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/menu?category=${cat.name}`}
              className="group flex flex-col items-center gap-3 rounded-2xl bg-white p-4 text-center shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative h-20 w-20 overflow-hidden rounded-full ring-4 ring-mustard/20">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                />
              </div>
              <span className="text-sm font-bold text-charcoal">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Deals banner */}
      <section className="torn-edge bg-charcoal py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-mustard">
                Limited Time
              </p>
              <h2 className="font-display text-3xl text-cream sm:text-4xl">
                Super Saver Deals
              </h2>
            </div>
            <Link
              href="/menu?category=Deals"
              className="hidden items-center gap-1 text-sm font-semibold text-mustard sm:flex"
            >
              See all deals <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {deals.map((deal) => (
              <ProductCard key={deal.id} product={deal} onSelect={setSelectedProduct} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular items */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-chili">
            Most Ordered
          </p>
          <h2 className="font-display text-3xl text-charcoal sm:text-4xl">
            Popular Right Now
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {popular.map((product) => (
            <ProductCard key={product.id} product={product} onSelect={setSelectedProduct} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/menu"
            className="rounded-full bg-charcoal px-8 py-3 text-sm font-bold uppercase tracking-wide text-cream transition hover:bg-chili"
          >
            View Full Menu
          </Link>
        </div>
      </section>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  );
}
