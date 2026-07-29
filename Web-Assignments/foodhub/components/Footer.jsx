import Link from "next/link";
import { Facebook, Flame, Instagram, MapPin, Phone, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div>
          <div className="mb-4 flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-chili">
              <Flame className="h-5 w-5 text-cream" strokeWidth={2.5} />
            </span>
            <span className="font-display text-xl tracking-wide">
              FLAME<span className="text-mustard">&amp;</span>CO
            </span>
          </div>
          <p className="max-w-xs text-sm text-cream/60">
            Fast food, cooked slow on flavor. Burgers, pizza, and shawarma
            fired up fresh and delivered to your door.
          </p>
        </div>

        <div>
          <p className="mb-4 font-display text-sm uppercase tracking-widest text-mustard">
            Explore
          </p>
          <ul className="space-y-3 text-sm text-cream/70">
            <li><Link href="/" className="hover:text-cream">Home</Link></li>
            <li><Link href="/menu" className="hover:text-cream">Full Menu</Link></li>
            <li><Link href="/menu?category=Deals" className="hover:text-cream">Today&apos;s Deals</Link></li>
            <li><Link href="/login" className="hover:text-cream">Login</Link></li>
          </ul>
        </div>

        <div>
          <p className="mb-4 font-display text-sm uppercase tracking-widest text-mustard">
            Contact
          </p>
          <ul className="space-y-3 text-sm text-cream/70">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4" /> 0342 8240588
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4" /> Karachi, Pakistan
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-4 font-display text-sm uppercase tracking-widest text-mustard">
            Follow
          </p>
          <div className="flex gap-3">
            <a href="#" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-chili">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-chili">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Twitter" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-chili">
              <Twitter className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-cream/40">
        © {new Date().getFullYear()} Flame &amp; Co. Demo project — not a real ordering service.
      </div>
    </footer>
  );
}
