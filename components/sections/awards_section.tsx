"use client";

import type { CSSProperties } from "react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const awardLetters = ["A", "W", "A", "R", "D", "S"] as const;

const awards = [
  {
    letter: "A",
    label: "Recognition",
    title: "Website of the week",
    detail: "Focused landing pages with contact paths, trust cues, and fast delivery.",
    meta: "Butwal / 2026",
    left: "15%",
    top: "60%",
    width: "clamp(9rem, 14vw, 15.5rem)",
    rotate: -11,
    drift: -130,
  },
  {
    letter: "W",
    label: "Recognition",
    title: "Design award",
    detail: "Reusable visual systems for brands that need to look credible online.",
    meta: "Visual systems",
    left: "38%",
    top: "56%",
    width: "clamp(10rem, 15vw, 17rem)",
    rotate: 8,
    drift: 80,
  },
  {
    letter: "A",
    label: "Recognition",
    title: "Innovation award",
    detail: "Launch assets, posters, and motion-led campaigns with a clear handoff.",
    meta: "Launch ready",
    left: "63%",
    top: "62%",
    width: "clamp(9rem, 13vw, 15rem)",
    rotate: -5,
    drift: -65,
  },
  {
    letter: "R",
    label: "Recognition",
    title: "Digital setup",
    detail: "Domains, email, analytics, and practical guidance after launch.",
    meta: "Setup / Support",
    left: "82%",
    top: "57%",
    width: "clamp(9rem, 12vw, 14rem)",
    rotate: 12,
    drift: 110,
  },
  {
    letter: "D",
    label: "Recognition",
    title: "Brand presence",
    detail: "A clear identity system for websites, social posts, and launch materials.",
    meta: "Identity",
    left: "28%",
    top: "68%",
    width: "clamp(9rem, 13vw, 15rem)",
    rotate: 14,
    drift: 130,
  },
  {
    letter: "S",
    label: "Recognition",
    title: "Service clarity",
    detail: "Structured pages that explain offers simply and guide customers forward.",
    meta: "Experience",
    left: "70%",
    top: "69%",
    width: "clamp(9rem, 13.5vw, 15.5rem)",
    rotate: -13,
    drift: -120,
  },
] as const;

function AwardBook({
  award,
  index,
}: {
  award: (typeof awards)[number];
  index: number;
}) {
  return (
    <article
      data-award-book
      style={
        {
          "--book-left": award.left,
          "--book-top": award.top,
          "--book-width": award.width,
          "--book-rotate": `${award.rotate}deg`,
        } as CSSProperties
      }
      className="absolute left-[var(--book-left)] top-[var(--book-top)] hidden aspect-[0.68] w-[var(--book-width)] -translate-x-1/2 overflow-hidden rounded-[0.35rem] border border-foreground/12 bg-[color-mix(in_srgb,var(--background)_72%,var(--accent)_28%)] shadow-[0_28px_80px_rgba(0,0,0,0.24)] will-change-transform lg:block"
    >
      <div className="absolute inset-y-0 left-0 w-[13%] bg-foreground/12" />
      <div className="absolute inset-x-[14%] top-0 h-full border-l border-foreground/12" />
      <div className="relative z-10 flex h-full flex-col justify-between p-[8%]">
        <div className="flex items-start justify-between gap-4">
          <span className="font-helvetica-bold text-[clamp(1.3rem,2vw,2rem)] leading-none text-foreground">
            {award.letter}
          </span>
          <span className="text-right text-[0.55rem] font-semibold uppercase leading-tight tracking-[0.14em] text-foreground/58">
            0{index + 1}
          </span>
        </div>

        <div>
          <p className="text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-foreground/64">
            {award.label}
          </p>
          <h3 className="mt-3 max-w-[12rem] text-[clamp(1.35rem,2.1vw,2.3rem)] font-semibold uppercase leading-[0.9] text-foreground">
            {award.title}
          </h3>
          <p className="mt-4 max-w-[12rem] text-[0.66rem] font-semibold leading-5 text-foreground/62">
            {award.detail}
          </p>
        </div>

        <div className="flex items-end justify-between gap-4">
          <span className="text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-foreground/58">
            {award.meta}
          </span>
          <span className="h-16 w-px bg-foreground/30" aria-hidden="true" />
        </div>
      </div>
    </article>
  );
}

export function AwardsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const scroller = document.querySelector<HTMLElement>(".site-frame");

      if (!section || !scroller) {
        return;
      }

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const letters = gsap.utils.toArray<HTMLElement>("[data-award-letter]");
      const books = gsap.utils.toArray<HTMLElement>("[data-award-book]");
      const intro = gsap.utils.toArray<HTMLElement>("[data-awards-intro]");

      if (reduceMotion) {
        gsap.set([...letters, ...books, ...intro], {
          autoAlpha: 1,
          clearProps: "transform",
        });
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        gsap.set(letters, {
          autoAlpha: 0,
          y: () => scroller.clientHeight * 0.82,
          scale: 0.86,
          force3D: true,
          willChange: "transform, opacity",
        });
        gsap.set(books, {
          autoAlpha: 0,
          y: () => scroller.clientHeight * 0.78,
          rotation: (index) => awards[index]?.rotate ?? 0,
          x: 0,
          scale: 0.96,
          force3D: true,
          willChange: "transform, opacity",
        });
        gsap.set(intro, {
          autoAlpha: 0,
          y: 28,
        });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            scroller,
            start: "top top",
            end: () => `+=${Math.max(4200, scroller.clientHeight * 4.8)}`,
            pin: true,
            scrub: 1.05,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline.to(
          intro,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.35,
            stagger: 0.08,
            ease: "power2.out",
          },
          0,
        );

        awards.forEach((award, index) => {
          const at = index * 0.72 + 0.25;

          timeline
            .to(
              books[index],
              {
                autoAlpha: 1,
                y: () => -scroller.clientHeight * 1.18,
                x: award.drift,
                rotation: award.rotate * -0.55,
                scale: 1.02,
                duration: 1.16,
                ease: "none",
              },
              at,
            )
            .to(
              letters[index],
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.48,
                ease: "power3.out",
              },
              at + 0.22,
            );
        });

        timeline.to({}, { duration: 0.5 });

        return () => {
          gsap.set([...letters, ...books], { clearProps: "willChange" });
          timeline.scrollTrigger?.kill();
          timeline.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="awards"
      className="relative overflow-hidden bg-background px-5 py-20 text-foreground lg:min-h-[calc(100vh-1.5rem)] lg:px-16 lg:py-0"
    >
      <div className="relative mx-auto flex min-h-[calc(100svh-8rem)] w-full max-w-[118rem] flex-col justify-center lg:min-h-[calc(100vh-1.5rem)]">
        <div
          data-awards-intro
          className="relative z-20 mb-10 flex items-center gap-3 lg:absolute lg:left-0 lg:top-14 lg:mb-0 lg:opacity-0"
        >
          <span className="grid size-4 place-items-center rounded-full border border-foreground/20">
            <span className="size-1.5 rounded-full bg-accent" />
          </span>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-foreground/90">
            Awards
          </p>
        </div>

        <p
          data-awards-intro
          className="relative z-20 max-w-sm text-base font-semibold leading-7 text-foreground/64 lg:absolute lg:bottom-16 lg:left-0 lg:opacity-0"
        >
          Recognition gathered into a scroll-built word, one award at a time.
        </p>

        <div
          className="pointer-events-none relative z-10 flex min-h-[18rem] items-center justify-center sm:min-h-[24rem] lg:min-h-0"
          aria-label="Awards"
        >
          <h2 className="flex w-full items-end justify-center gap-[0.01em] text-center font-helvetica-bold text-[clamp(4.35rem,14.2vw,18.8rem)] uppercase leading-[0.78] tracking-normal text-foreground">
            {awardLetters.map((letter, index) => (
              <span
                key={`${letter}-${index}`}
                data-award-letter
                className="inline-block opacity-100 lg:opacity-0"
              >
                {letter}
              </span>
            ))}
          </h2>
        </div>

        <div className="relative z-20 mt-12 grid gap-4 sm:grid-cols-2 lg:absolute lg:inset-0 lg:mt-0 lg:block">
          {awards.map((award, index) => (
            <AwardBook key={`${award.title}-${index}`} award={award} index={index} />
          ))}
        </div>

        <div className="relative z-20 mt-10 grid gap-4 sm:grid-cols-2 lg:hidden">
          {awards.map((award, index) => (
            <article
              key={award.title}
              className="rounded-lg border border-foreground/12 bg-[color-mix(in_srgb,var(--background)_84%,var(--accent)_16%)] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.14)]"
            >
              <div className="flex items-center justify-between gap-4 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-foreground/60">
                <span>{award.label}</span>
                <span>0{index + 1}</span>
              </div>
              <h3 className="mt-6 text-2xl font-semibold uppercase leading-[0.95] text-foreground">
                {award.title}
              </h3>
              <p className="mt-4 text-sm leading-6 text-foreground/68">
                {award.detail}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
