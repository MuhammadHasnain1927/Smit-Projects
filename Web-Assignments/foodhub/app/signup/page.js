"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Flame, Lock, Mail, Phone, User } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email.includes("@") || form.phone.length < 10 || form.password.length < 4) {
      setError("Please fill every field correctly before continuing.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/login");
    }, 1200);
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-cream px-4 py-16">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-2">
        <div className="p-8 sm:p-10">
          <h1 className="font-display text-2xl text-charcoal">Create your account</h1>
          <p className="mt-2 text-sm text-charcoal/50">
            Join to save addresses, track orders, and grab deals first.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-charcoal/50">
                Full Name
              </label>
              <div className="flex items-center gap-2 rounded-xl border border-charcoal/15 px-4 py-3 focus-within:border-chili">
                <User className="h-4 w-4 text-charcoal/40" />
                <input
                  value={form.name}
                  onChange={handleChange("name")}
                  type="text"
                  placeholder="Your name"
                  className="w-full bg-transparent text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-charcoal/50">
                Email
              </label>
              <div className="flex items-center gap-2 rounded-xl border border-charcoal/15 px-4 py-3 focus-within:border-chili">
                <Mail className="h-4 w-4 text-charcoal/40" />
                <input
                  value={form.email}
                  onChange={handleChange("email")}
                  type="email"
                  placeholder="you@example.com"
                  className="w-full bg-transparent text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-charcoal/50">
                Phone Number
              </label>
              <div className="flex items-center gap-2 rounded-xl border border-charcoal/15 px-4 py-3 focus-within:border-chili">
                <Phone className="h-4 w-4 text-charcoal/40" />
                <span className="text-sm font-semibold text-charcoal/50">+92</span>
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
                Password
              </label>
              <div className="flex items-center gap-2 rounded-xl border border-charcoal/15 px-4 py-3 focus-within:border-chili">
                <Lock className="h-4 w-4 text-charcoal/40" />
                <input
                  value={form.password}
                  onChange={handleChange("password")}
                  type="password"
                  placeholder="Create a password"
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
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-charcoal/50">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-chili">
              Log in
            </Link>
          </p>
        </div>

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
              Your next favorite meal is one tap away.
            </h2>
            <p className="mt-3 text-sm text-cream/60">
              Sign up to unlock member-only combo deals and faster checkout.
            </p>
          </div>
          <p className="text-xs text-cream/30">Demo signup — no data is stored.</p>
        </div>
      </div>
    </div>
  );
}
