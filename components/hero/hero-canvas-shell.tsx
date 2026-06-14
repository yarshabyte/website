"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Responsive 3D brand mark: lightweight on phones and pointer-reactive on larger screens. */
export function HeroCanvasShell() {
  const logoRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || !window.matchMedia("(min-width: 640px)").matches) {
      return;
    }

    const logo = logoRef.current;
    if (!logo) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;

      logo.style.setProperty("--logo-rotate-x", `${-y * 8}deg`);
      logo.style.setProperty("--logo-rotate-y", `${x * 12}deg`);
    };

    const resetTilt = () => {
      logo.style.setProperty("--logo-rotate-x", "0deg");
      logo.style.setProperty("--logo-rotate-y", "0deg");
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", resetTilt);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", resetTilt);
    };
  }, [reduceMotion]);

  return (
    <div
      // I changed lg:-left-24 to lg:-left-32 and xl:-left-32 to xl:-left-40
      className="pointer-events-none absolute left-1/2 top-[18vh] z-[2] h-[34vh] w-[84vw] max-w-[28rem] -translate-x-1/2 sm:top-[calc(4.5rem+3vh)] sm:h-[min(52vh,28rem)] sm:w-[min(56vw,28rem)] lg:-left-16 lg:top-[calc(4.5rem+1vh)] lg:h-[min(58vh,31rem)] lg:w-[min(40vw,31rem)] lg:max-w-[31rem] lg:translate-x-0 xl:-left-24"
      aria-hidden="true"
    >
      <div
        className="hero-glow absolute left-1/2 top-1/2 h-[82%] w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
        aria-hidden="true"
      />
      <div ref={logoRef} className="hero-logo-3d relative h-full w-full">
        <Image
          src="/logo-3d.png"
          alt=""
          fill
          priority
          sizes="(max-width: 639px) 84vw, (max-width: 1023px) 56vw, 40vw"
          className="object-contain drop-shadow-[0_28px_38px_rgba(30,26,24,0.2)]"
        />
      </div>
    </div>
  );
}