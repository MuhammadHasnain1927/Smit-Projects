"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Flame, Lock, Phone } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phone.trim().length < 10 || password.trim().length < 4) {
      setError("Enter a valid phone number and a password (min 4 characters).");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/");
    }, 1200);
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-cream px-4 py-16">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-2">
        <div className="hidden flex-col justify-between bg-charcoal p-10 text-cream md:flex">
          <div className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-chili">
              <Flame className="h-5 w-5" />
            </span>
            <span className="font-display text-xl">
              FLAME<span className="text-mustard">&amp;</span>CO
            </span>
          </div>
          <div>
            <h2 className="font-display text-3xl leading-tight">
              Good food, good mood — welcome back.
            </h2>
            <p className="mt-3 text-sm text-cream/60">
              Log in to track your orders, save favorites, and reorder in one tap.
            </p>
          </div>
          <p className="text-xs text-cream/30">Demo login — no data is stored.</p>
        </div>

        <div className="p-8 sm:p-10">
          <h1 className="font-display text-2xl text-charcoal">Welcome back!</h1>
          <p className="mt-2 text-sm text-charcoal/50">
            Log in to continue ordering.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-charcoal/50">
                Phone Number
              </label>
              <div className="flex items-center gap-2 rounded-xl border border-charcoal/15 px-4 py-3 focus-within:border-chili">
                <Phone className="h-4 w-4 text-charcoal/40" />
                <span className="text-sm font-semibold text-charcoal/50">+92</span>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  type="tel"
                  placeholder="3XXXXXXXXX"
                  className="w-full bg-transparent text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-charcoal/50">
                Password
              </label>
              <div className="flex items-center gap-2 rounded-xl border border-charcoal/15 px-4 py-3 focus-within:border-chili">
                <Lock className="h-4 w-4 text-charcoal/40" />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-transparent text-sm outline-none"
                />
              </div>
            </div>

            {error && <p className="text-sm text-chili">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 rounded-full bg-chili py-3 text-sm font-bold uppercase tracking-wide text-cream transition hover:bg-chili-600 disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-charcoal/50">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-semibold text-chili">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
