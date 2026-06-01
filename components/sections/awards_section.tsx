"use client";

import type { CSSProperties } from "react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const awardLetters = ["a", "w", "a", "r", "d", "s"] as const;

const awards = [
  {
    letter: "A",
    label: "Recognition",
    title: "Website of the week",
    detail: "Focused landing pages with contact paths, trust cues, and fast delivery.",
    meta: "Butwal / 2026",
    left: "20%",
    top: "62%",
    width: "clamp(9.5rem, 13.5vw, 15.25rem)",
    rotate: -14,
    drift: -170,
    cover: "#ef3f37",
    spine: "#c92f2d",
    ink: "#fff7ed",
  },
  {
    letter: "W",
    label: "Recognition",
    title: "Design award",
    detail: "Reusable visual systems for brands that need to look credible online.",
    meta: "Visual systems",
    left: "38%",
    top: "44%",
    width: "clamp(10rem, 14vw, 16rem)",
    rotate: 9,
    drift: 130,
    cover: "#6b4a91",
    spine: "#4d3470",
    ink: "#fff7ed",
  },
  {
    letter: "A",
    label: "Recognition",
    title: "Innovation award",
    detail: "Launch assets, posters, and motion-led campaigns with a clear handoff.",
    meta: "Launch ready",
    left: "62%",
    top: "57%",
    width: "clamp(9.5rem, 13vw, 15rem)",
    rotate: -6,
    drift: -125,
    cover: "#f47a2a",
    spine: "#c95d1f",
    ink: "#2a1710",
  },
  {
    letter: "R",
    label: "Recognition",
    title: "Digital setup",
    detail: "Domains, email, analytics, and practical guidance after launch.",
    meta: "Setup / Support",
    left: "84%",
    top: "48%",
    width: "clamp(9.5rem, 12.5vw, 14.5rem)",
    rotate: 13,
    drift: 175,
    cover: "#ffc13b",
    spine: "#d7941f",
    ink: "#2b2114",
  },
  {
    letter: "D",
    label: "Recognition",
    title: "Brand presence",
    detail: "A clear identity system for websites, social posts, and launch materials.",
    meta: "Identity",
    left: "28%",
    top: "74%",
    width: "clamp(9rem, 12.5vw, 14.5rem)",
    rotate: 16,
    drift: 210,
    cover: "#e16c55",
    spine: "#b64f3f",
    ink: "#fff7ed",
  },
  {
    letter: "S",
    label: "Recognition",
    title: "Service clarity",
    detail: "Structured pages that explain offers simply and guide customers forward.",
    meta: "Experience",
    left: "72%",
    top: "70%",
    width: "clamp(9rem, 13vw, 15rem)",
    rotate: -12,
    drift: -190,
    cover: "#2f8c78",
    spine: "#246d5d",
    ink: "#fff7ed",
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
          "--book-bg": award.cover,
          "--book-spine": award.spine,
          "--book-ink": award.ink,
        } as CSSProperties
      }
      className="absolute left-[var(--book-left)] top-[var(--book-top)] hidden aspect-[0.68] w-[var(--book-width)] -translate-x-1/2 overflow-hidden rounded-[0.32rem] border border-foreground/10 bg-[var(--book-bg)] text-[var(--book-ink)] shadow-[0_28px_80px_rgba(0,0,0,0.28)] will-change-transform lg:block"
    >
      <div className="absolute inset-y-0 left-0 w-[13%] bg-[var(--book-spine)]" />
      <div className="absolute inset-x-[14%] top-0 h-full border-l border-current/18" />
      <div className="absolute inset-x-[18%] top-[54%] h-[18%] -skew-y-6 rounded-full border border-current/24 opacity-35" />
      <div className="relative z-10 flex h-full flex-col justify-between p-[8%]">
        <div className="flex items-start justify-between gap-4">
          <span className="font-helvetica-bold text-[clamp(1.3rem,2vw,2rem)] leading-none">
            {award.letter}
          </span>
          <span className="text-right text-[0.55rem] font-semibold uppercase leading-tight tracking-[0.14em] opacity-60">
            0{index + 1}
          </span>
        </div>

        <div>
          <p className="text-[0.58rem] font-semibold uppercase tracking-[0.14em] opacity-64">
            {award.label}
          </p>
          <h3 className="mt-3 max-w-[12rem] text-[clamp(1.35rem,2.1vw,2.3rem)] font-semibold uppercase leading-[0.9]">
            {award.title}
          </h3>
          <p className="mt-4 max-w-[12rem] text-[0.66rem] font-semibold leading-5 opacity-68">
            {award.detail}
          </p>
        </div>

        <div className="flex items-end justify-between gap-4">
          <span className="text-[0.58rem] font-semibold uppercase tracking-[0.12em] opacity-62">
            {award.meta}
          </span>
          <span className="h-16 w-px bg-current/30" aria-hidden="true" />
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
      const letters = gsap.utils
        .toArray<HTMLElement>("[data-award-letter]")
        .sort(
          (left, right) =>
            Number(left.dataset.awardIndex) - Number(right.dataset.awardIndex),
        );
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
        const letterStartDepth = [0.14, 0.34, 0.58, 0.86, 0.98, 1.1];

        gsap.set(letters, {
          autoAlpha: (index) => (index < 3 ? 1 : 0),
          y: (index) => scroller.clientHeight * (letterStartDepth[index] ?? 1),
          scale: (index) => (index < 2 ? 1.05 : 1.08),
          force3D: true,
          transformOrigin: "50% 100%",
          willChange: "transform, opacity",
        });
        gsap.set(books, {
          autoAlpha: 1,
          y: (index) => scroller.clientHeight * (0.6 + (index % 3) * 0.2),
          rotation: (index) => awards[index]?.rotate ?? 0,
          x: 0,
          scale: 1.24,
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
            end: () => `+=${Math.max(3400, scroller.clientHeight * 3.85)}`,
            pin: true,
            scrub: 0.45,
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

        timeline.to(
          letters,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 1.65,
            stagger: 0.16,
            ease: "none",
          },
          0,
        );

        awards.forEach((award, index) => {
          const at = index * 0.08 + 0.18;

          timeline.to(
            books[index],
            {
              autoAlpha: 1,
              y: 0,
              x: award.drift * 0.44,
              rotation: award.rotate * 0.48,
              scale: 1,
              duration: 0.72,
              ease: "power2.out",
            },
            at,
          );

          timeline.to(
            books[index],
            {
              y: () => -scroller.clientHeight * (1.22 + (index % 2) * 0.14),
              x: award.drift,
              rotation: award.rotate * -0.72,
              scale: 1,
              duration: 0.86,
              ease: "none",
            },
            at + 0.72,
          );
        });

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
      <div className="relative mx-auto flex min-h-[calc(100svh-8rem)] w-full max-w-[118rem] flex-col justify-center lg:min-h-[calc(100vh-1.5rem)] lg:w-[var(--site-content-width)] lg:max-w-none">
        <div
          data-awards-intro
          className="relative z-20 mb-10 flex items-center gap-3 lg:absolute lg:left-0 lg:top-14 lg:mb-0 lg:opacity-0"
        >
          <span className="grid size-4 place-items-center rounded-full border border-foreground/20">
            <span className="size-1.5 rounded-full bg-accent" />
          </span>
          <p className="text-sm font-semibold lowercase tracking-[0.14em] text-foreground/90">
            awards
          </p>
        </div>

        <p
          data-awards-intro
          className="relative z-20 max-w-sm text-base font-semibold leading-7 text-foreground/64 lg:absolute lg:bottom-16 lg:left-0 lg:opacity-0"
        >
          Awards and Recognition.
        </p>

        <div
          className="pointer-events-none relative flex min-h-[18rem] items-center justify-center sm:min-h-[24rem] lg:min-h-0"
          aria-label="awards"
        >
          <h2
            aria-hidden="true"
            className="relative z-0 flex w-full items-end justify-center gap-[0.012em] text-center font-helvetica-bold text-[clamp(5.5rem,17.5vw,20.5rem)] lowercase leading-[0.78] tracking-normal text-foreground/62 lg:-translate-y-3"
          >
            {awardLetters.map((letter, index) => (
              <span
                key={`${letter}-${index}`}
                data-award-letter={
                  index === 0 || index === 1 || index === 4 || index === 5
                    ? ""
                    : undefined
                }
                data-award-index={
                  index === 0 || index === 1 || index === 4 || index === 5
                    ? index
                    : undefined
                }
                className={
                  index === 0 || index === 1 || index === 4 || index === 5
                    ? "inline-block origin-bottom opacity-100"
                    : "invisible inline-block origin-bottom"
                }
              >
                {letter}
              </span>
            ))}
          </h2>

          <h2
            aria-label="awards"
            className="absolute inset-0 z-20 flex w-full items-end justify-center gap-[0.012em] text-center font-helvetica-bold text-[clamp(5.5rem,17.5vw,20.5rem)] lowercase leading-[0.78] tracking-normal text-foreground/62 lg:-translate-y-3"
          >
            {awardLetters.map((letter, index) => (
              <span
                key={`${letter}-${index}`}
                data-award-letter={index === 2 || index === 3 ? "" : undefined}
                data-award-index={index === 2 || index === 3 ? index : undefined}
                className={
                  index === 2 || index === 3
                    ? "inline-block origin-bottom opacity-100"
                    : "invisible inline-block origin-bottom"
                }
              >
                {letter}
              </span>
            ))}
          </h2>
        </div>

        <div className="relative z-10 mt-12 grid gap-4 sm:grid-cols-2 lg:absolute lg:inset-0 lg:mt-0 lg:block">
          {awards.map((award, index) => (
            <AwardBook key={`${award.title}-${index}`} award={award} index={index} />
          ))}
        </div>

        <div className="relative z-20 mt-10 grid gap-4 sm:grid-cols-2 lg:hidden">
          {awards.map((award, index) => (
            <article
              key={award.title}
              style={
                {
                  "--book-bg": award.cover,
                  "--book-ink": award.ink,
                } as CSSProperties
              }
              className="rounded-lg border border-foreground/12 bg-[var(--book-bg)] p-5 text-[var(--book-ink)] shadow-[0_18px_50px_rgba(0,0,0,0.14)]"
            >
              <div className="flex items-center justify-between gap-4 text-[0.68rem] font-semibold uppercase tracking-[0.16em] opacity-60">
                <span>{award.label}</span>
                <span>0{index + 1}</span>
              </div>
              <h3 className="mt-6 text-2xl font-semibold uppercase leading-[0.95]">
                {award.title}
              </h3>
              <p className="mt-4 text-sm leading-6 opacity-70">
                {award.detail}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
