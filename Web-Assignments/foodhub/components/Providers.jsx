"use client";

import CartProvider from "@/context/CartContext";
import PageEnter from "@/components/PageEnter";
import CartDrawer from "@/components/CartDrawer";
import Toast from "@/components/Toast";

export default function Providers({ children }) {
  return (
    <CartProvider>
      <PageEnter>{children}</PageEnter>
      <CartDrawer />
      <Toast />
    </CartProvider>
  );
}
