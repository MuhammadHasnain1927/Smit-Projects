"use client";

import { useContext } from "react";
import { CheckCircle2 } from "lucide-react";
import { CartContext } from "@/context/CartContext";

export default function Toast() {
  const { toast } = useContext(CartContext);

  if (!toast) return null;

  return (
    <div className="fixed bottom-5 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-2 rounded-full bg-charcoal px-5 py-3 text-sm font-semibold text-cream shadow-xl animate-fadeUp">
      <CheckCircle2 className="h-4 w-4 text-mustard" />
      {toast}
    </div>
  );
}
