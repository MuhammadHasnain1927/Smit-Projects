import Link from "next/link";
import { Flame } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 bg-cream px-4 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-chili/10 text-chili">
        <Flame className="h-8 w-8" />
      </span>
      <h1 className="font-display text-4xl text-charcoal">Page Not Found</h1>
      <p className="max-w-sm text-sm text-charcoal/60">
        The dish you&apos;re looking for isn&apos;t on the menu. Let&apos;s get
        you back to something delicious.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-full bg-chili px-6 py-3 text-sm font-bold uppercase tracking-wide text-cream"
      >
        Back to Home
      </Link>
    </div>
  );
}
