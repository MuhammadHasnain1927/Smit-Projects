"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "@/data/deals";

export default function HeroSlider() {
  const [active, setActive] = useState(0);
  const textRefs = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const activeSlide = textRefs.current[active];
    if (!activeSlide) return;

    const elements = activeSlide.querySelectorAll("[data-animate]");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        elements,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
        }
      );
    }, activeSlide);

    return () => ctx.revert();
  }, [active]);

  const goNext = () => setActive((prev) => (prev + 1) % heroSlides.length);
  const goPrev = () =>
    setActive((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  return (
    <section className="relative overflow-hidden bg-charcoal">
      <div className="relative h-[520px] w-full sm:h-[560px] md:h-[620px] lg:h-[680px]">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === active ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/70 to-transparent" />

            <div
              ref={(el) => (textRefs.current[index] = el)}
              className="relative mx-auto flex h-full max-w-7xl flex-col justify-center gap-5 px-4 sm:px-6 lg:px-8"
            >
              <span
                data-animate
                className="w-fit rounded-full bg-mustard px-4 py-1 text-xs font-bold uppercase tracking-widest text-charcoal"
              >
                {slide.eyebrow}
              </span>
              <h1
                data-animate
                className="max-w-xl font-display text-4xl leading-[1.05] text-cream sm:text-5xl md:text-6xl lg:max-w-2xl lg:text-7xl"
              >
                {slide.title}
              </h1>
              <p data-animate className="max-w-md text-base text-cream/80 sm:text-lg">
                {slide.subtitle}
              </p>
              <Link
                data-animate
                href="/menu"
                className="mt-2 w-fit rounded-full bg-chili px-7 py-3 text-sm font-bold uppercase tracking-wide text-cream transition hover:bg-chili-600"
              >
                {slide.cta}
              </Link>
            </div>
          </div>
        ))}

        <button
          onClick={goPrev}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-cream/90 text-charcoal transition hover:bg-mustard sm:left-6"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={goNext}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-cream/90 text-charcoal transition hover:bg-mustard sm:right-6"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => setActive(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-all ${
                index === active ? "w-8 bg-mustard" : "w-2 bg-cream/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
