"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { aboutIntro } from "@/data/about";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

function AnimatedText({ text, className }: { text: string; className?: string }) {
  const words = text.split(/\s+/).filter(Boolean);
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.25em] pb-[0.1em] -mb-[0.1em]">
          <span data-about-word className="inline-block will-change-transform">
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduceMotion) return;

      const scroller = document.querySelector<HTMLElement>(".site-frame");
      if (!scroller) return;

      const eyebrow = section.querySelector<HTMLElement>("[data-about-eyebrow]");
      const words = gsap.utils.toArray<HTMLElement>("[data-about-word]");

      if (eyebrow) {
        gsap.set(eyebrow, { y: 30, opacity: 0 });
        ScrollTrigger.create({
          trigger: eyebrow,
          scroller,
          start: "top 92%",
          onEnter: () => {
            gsap.to(eyebrow, {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "expo.out",
            });
          },
          onLeaveBack: () => {
            gsap.to(eyebrow, {
              y: 30,
              opacity: 0,
              duration: 1,
              ease: "power4",
            });
          }
        });
      }

      if (words.length > 0) {
        // Match buzworthy EXACT animation pattern for infinite scrolling iterations
        gsap.set(words, { opacity: 0, y: "150%" });

        ScrollTrigger.batch(words, {
          scroller,
          start: "top 100%",
          onEnter: (batch) => {
            gsap.to(batch, {
              opacity: 1,
              duration: 1,
              y: "0%",
              stagger: 0.03,
              ease: "expo.out",
            });
          },
          onLeaveBack: (batch) => {
            gsap.to(batch, {
              opacity: 0,
              duration: 1,
              y: "150%",
              stagger: 0.03,
              ease: "power4",
            });
          },
        });
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="fluid-section relative min-h-screen overflow-hidden bg-transparent lg:min-h-[calc(100vh-1.5rem)]"
    >
      <div className="grid min-h-[calc(100vh-12rem)] gap-[var(--space-stack)] lg:min-h-[calc(100vh-6rem)] lg:grid-cols-[6rem_16rem_1fr_2rem]">
        <div className="hidden lg:block" aria-hidden="true" />
        <div data-about-eyebrow className="flex items-start gap-3 pt-1">
          <span className="mt-1.5 grid size-4 place-items-center rounded-full border border-foreground/20">
            <span className="size-1.5 rounded-full bg-accent" />
          </span>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-foreground/90">
            {aboutIntro.eyebrow}
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[18rem_1fr]">
          <p className="max-w-xs text-xl font-semibold uppercase leading-tight text-foreground sm:text-2xl lg:text-[1.28rem]">
            <AnimatedText text="Yarsa Byte builds practical digital presence for local businesses, creators, and teams ready to look credible online." />
          </p>

          <div>
            <h2 className="max-w-5xl text-[clamp(2.75rem,3.8vw,4.7rem)] font-normal uppercase leading-[0.92] tracking-normal text-foreground 2xl:text-[clamp(4.75rem,5.1vw,6.1rem)]">
              <AnimatedText text="Delivering innovative design and development with impactful digital campaigns that move brands forward." />
            </h2>
          </div>
        </div>

        <div className="hidden lg:block" aria-hidden="true" />
      </div>
    </section>
  );
}
