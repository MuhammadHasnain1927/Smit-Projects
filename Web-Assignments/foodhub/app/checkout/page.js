"use client";

import { useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Banknote,
  CheckCircle2,
  CreditCard,
  MapPin,
  ShoppingBag,
} from "lucide-react";
import { CartContext } from "@/context/CartContext";

export default function CheckoutPage() {
  const {
    cartItems,
    subtotal,
    deliveryFee,
    grandTotal,
    clearCart,
    showToast,
  } = useContext(CartContext);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    instructions: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [error, setError] = useState("");
  const [placing, setPlacing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!form.name || form.phone.length < 10 || !form.address) {
      setError("Please fill in your name, phone number, and address.");
      return;
    }
    setError("");
    setPlacing(true);
    setTimeout(() => {
      const generatedNumber = `FC-${Math.floor(10000 + Math.random() * 89999)}`;
      setOrderNumber(generatedNumber);
      setPlacing(false);
      setOrderPlaced(true);
      clearCart();
      showToast("Order placed successfully!");
    }, 1600);
  };

  if (orderPlaced) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center gap-4 px-4 text-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-mustard/15 text-chili">
          <CheckCircle2 className="h-10 w-10" />
        </span>
        <h1 className="font-display text-3xl text-charcoal">
          Order Confirmed!
        </h1>
        <p className="text-sm text-charcoal/60">
          Thanks {form.name.split(" ")[0]}, your order{" "}
          <span className="font-bold text-chili">#{orderNumber}</span> is
          being fired up in the kitchen. Estimated delivery: 30–40 minutes.
        </p>
        <Link
          href="/"
          className="mt-3 rounded-full bg-chili px-7 py-3 text-sm font-bold uppercase tracking-wide text-cream transition hover:bg-chili-600"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center gap-4 px-4 text-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-charcoal/5 text-charcoal/30">
          <ShoppingBag className="h-10 w-10" />
        </span>
        <h1 className="font-display text-3xl text-charcoal">
          Your cart is empty
        </h1>
        <p className="text-sm text-charcoal/60">
          Add something delicious before checking out.
        </p>
        <Link
          href="/menu"
          className="mt-3 rounded-full bg-chili px-7 py-3 text-sm font-bold uppercase tracking-wide text-cream transition hover:bg-chili-600"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-cream">
      <div className="bg-charcoal py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-mustard">
            Almost there
          </p>
          <h1 className="font-display text-3xl text-cream sm:text-4xl">
            Checkout
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_1fr]">
          {/* Delivery + payment form */}
          <form onSubmit={handlePlaceOrder} className="flex flex-col gap-6">
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6">
              <div className="mb-4 flex items-center gap-2 font-display text-lg text-charcoal">
                <MapPin className="h-5 w-5 text-chili" /> Delivery Details
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-charcoal/50">
                    Full Name
                  </label>
                  <input
                    value={form.name}
                    onChange={handleChange("name")}
                    type="text"
                    placeholder="Your name"
                    className="w-full rounded-xl border border-charcoal/15 px-4 py-3 text-sm outline-none focus:border-chili"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-charcoal/50">
                    Phone Number
                  </label>
                  <div className="flex items-center gap-2 rounded-xl border border-charcoal/15 px-4 py-3 focus-within:border-chili">
                    <span className="text-sm font-semibold text-charcoal/50">
                      +92
                    </span>
                    <input
                      value={form.phone}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          phone: e.target.value.replace(/\D/g, ""),
                        }))
                      }
                      type="tel"
                      placeholder="3XXXXXXXXX"
                      className="w-full bg-transparent text-sm outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-charcoal/50">
                    Delivery Address
                  </label>
                  <input
                    value={form.address}
                    onChange={handleChange("address")}
                    type="text"
                    placeholder="House #, street, area"
                    className="w-full rounded-xl border border-charcoal/15 px-4 py-3 text-sm outline-none focus:border-chili"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-charcoal/50">
                    Delivery Instructions{" "}
                    <span className="font-normal normal-case text-charcoal/40">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    value={form.instructions}
                    onChange={handleChange("instructions")}
                    rows={3}
                    placeholder="E.g. leave at the gate, call on arrival..."
                    className="w-full resize-none rounded-xl border border-charcoal/15 px-4 py-3 text-sm outline-none focus:border-chili"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6">
              <div className="mb-4 font-display text-lg text-charcoal">
                Payment Method
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <label
                  className={`flex flex-1 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                    paymentMethod === "cod"
                      ? "border-chili bg-chili/5 text-charcoal"
                      : "border-charcoal/15 text-charcoal/60"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="h-4 w-4 accent-chili"
                  />
                  <Banknote className="h-4 w-4" /> Cash on Delivery
                </label>
                <label
                  className={`flex flex-1 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                    paymentMethod === "card"
                      ? "border-chili bg-chili/5 text-charcoal"
                      : "border-charcoal/15 text-charcoal/60"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                    className="h-4 w-4 accent-chili"
                  />
                  <CreditCard className="h-4 w-4" /> Card (Visa / Mastercard)
                </label>
              </div>
            </div>

            {error && <p className="text-sm text-chili">{error}</p>}

            <button
              type="submit"
              disabled={placing}
              className="rounded-full bg-chili py-3.5 text-sm font-bold uppercase tracking-wide text-cream transition hover:bg-chili-600 disabled:opacity-60 lg:hidden"
            >
              {placing ? "Placing Order..." : `Place Order · Rs. ${grandTotal}`}
            </button>
          </form>

          {/* Order summary */}
          <div className="h-fit rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6 lg:sticky lg:top-24">
            <div className="mb-4 flex items-center gap-2 font-display text-lg text-charcoal">
              <ShoppingBag className="h-5 w-5 text-chili" /> Order Summary
            </div>

            <ul className="flex flex-col gap-3">
              {cartItems.map((item) => (
                <li key={item.id} className="flex items-center gap-3">
                  <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 items-center justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold leading-snug text-charcoal">
                        {item.title}
                      </p>
                      <p className="text-xs text-charcoal/50">Qty {item.qty}</p>
                    </div>
                    <span className="text-sm font-bold text-charcoal">
                      Rs. {item.price * item.qty}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-5 space-y-2 border-t border-charcoal/10 pt-4 text-sm">
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

            <button
              onClick={handlePlaceOrder}
              disabled={placing}
              className="mt-5 hidden w-full rounded-full bg-chili py-3.5 text-sm font-bold uppercase tracking-wide text-cream transition hover:bg-chili-600 disabled:opacity-60 lg:block"
            >
              {placing ? "Placing Order..." : `Place Order · Rs. ${grandTotal}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
