"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SearchX } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import FilterSidebar, { priceRanges } from "@/components/FilterSidebar";
import products from "@/data/products";
import { deals } from "@/data/deals";

const allItems = [...products, ...deals];
const categoryList = ["All", "Deals", "Burger", "Pizza", "Shawarma", "Sides", "Drinks"];

function MenuContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const [activeCategory, setActiveCategory] = useState(
    categoryList.includes(initialCategory) ? initialCategory : "All"
  );
  const [activePrice, setActivePrice] = useState(priceRanges[0]);
  const [minRating, setMinRating] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;
      const matchesPrice =
        item.price >= activePrice.min && item.price <= activePrice.max;
      const matchesRating = item.rating >= minRating;
      const matchesSearch = item.title
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchesCategory && matchesPrice && matchesRating && matchesSearch;
    });
  }, [activeCategory, activePrice, minRating, search]);

  return (
    <div className="bg-cream">
      <div className="bg-charcoal py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-mustard">
            Full Menu
          </p>
          <h1 className="mb-6 font-display text-3xl text-cream sm:text-4xl">
            Everything on the Menu
          </h1>
          <div className="flex max-w-xl items-center gap-3 rounded-full bg-white px-5 py-3 shadow-lg">
            <Search className="h-5 w-5 flex-shrink-0 text-charcoal/40" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search for burgers, pizza, shawarma..."
              className="w-full bg-transparent text-sm text-charcoal outline-none placeholder:text-charcoal/40"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          <FilterSidebar
            categories={categoryList}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            activePrice={activePrice}
            setActivePrice={setActivePrice}
            minRating={minRating}
            setMinRating={setMinRating}
          />

          <div className="flex-1">
            <p className="mb-4 text-sm text-charcoal/50">
              Showing {filteredItems.length}{" "}
              {filteredItems.length === 1 ? "item" : "items"}
            </p>

            {filteredItems.length === 0 ? (
              <div className="flex flex-col items-center gap-3 rounded-2xl bg-white py-20 text-center shadow-sm ring-1 ring-black/5">
                <SearchX className="h-10 w-10 text-charcoal/20" />
                <p className="font-display text-xl text-charcoal">
                  No dishes match those filters
                </p>
                <p className="text-sm text-charcoal/50">
                  Try a different category, price, or search term.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {filteredItems.map((item) => (
                  <ProductCard
                    key={item.id}
                    product={item}
                    onSelect={setSelectedProduct}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={null}>
      <MenuContent />
    </Suspense>
  );
}
