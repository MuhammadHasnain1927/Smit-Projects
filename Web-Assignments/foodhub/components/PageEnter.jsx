"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function PageEnter({ children }) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrapperRef.current,
        { y: -48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.05,
          // Remove the inline transform once the intro finishes so this
          // wrapper never becomes a containing block for fixed-position
          // children (modals, drawers, toasts) rendered anywhere below it.
          onComplete: () => {
            gsap.set(wrapperRef.current, { clearProps: "transform" });
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return <div ref={wrapperRef}>{children}</div>;
}
