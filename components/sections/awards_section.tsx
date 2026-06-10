"use client";

import type { CSSProperties } from "react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const awardLetters = ["a", "w", "a", "r", "d", "s"] as const;

const mobileBookSlots = [
  { left: "22%", top: "68%", width: "clamp(5.4rem, 28vw, 7.5rem)" },
  { left: "42%", top: "50%", width: "clamp(5.6rem, 29vw, 7.8rem)" },
  { left: "66%", top: "62%", width: "clamp(5.4rem, 28vw, 7.5rem)" },
  { left: "78%", top: "42%", width: "clamp(5.1rem, 27vw, 7.2rem)" },
  { left: "30%", top: "80%", width: "clamp(5rem, 26vw, 7rem)" },
  { left: "64%", top: "82%", width: "clamp(5.2rem, 27vw, 7.2rem)" },
  { left: "48%", top: "58%", width: "clamp(5.5rem, 28vw, 7.6rem)" },
] as const;

const awardMotionProfiles = [
  {
    startX: -0.34,
    exitX: 0.64,
    exitRotation: -0.58,
    exitScale: 1.02,
  },
  {
    startX: 0.28,
    exitX: -0.52,
    exitRotation: -0.46,
    exitScale: 0.99,
  },
  {
    startX: -0.26,
    exitX: 0.58,
    exitRotation: -0.52,
    exitScale: 1.01,
  },
  {
    startX: 0.32,
    exitX: -0.48,
    exitRotation: -0.4,
    exitScale: 0.98,
  },
  {
    startX: -0.3,
    exitX: 0.62,
    exitRotation: -0.66,
    exitScale: 1.02,
  },
  {
    startX: 0.24,
    exitX: -0.56,
    exitRotation: -0.54,
    exitScale: 1,
  },
  {
    startX: -0.22,
    exitX: 0.46,
    exitRotation: -0.5,
    exitScale: 1.01,
  },
] as const;

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
  {
    letter: "Y",
    label: "Recognition",
    title: "Creative direction",
    detail: "A consistent visual direction that connects campaigns, pages, and launch assets.",
    meta: "Direction",
    left: "50%",
    top: "42%",
    width: "clamp(9.75rem, 13.25vw, 15.25rem)",
    rotate: 7,
    drift: 145,
    cover: "#3977a8",
    spine: "#28587f",
    ink: "#f7f3e8",
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
          "--book-mobile-left": mobileBookSlots[index].left,
          "--book-mobile-top": mobileBookSlots[index].top,
          "--book-mobile-width": mobileBookSlots[index].width,
          "--book-rotate": `${award.rotate}deg`,
          "--book-bg": award.cover,
          "--book-spine": award.spine,
          "--book-ink": award.ink,
        } as CSSProperties
      }
      className="absolute left-[var(--book-mobile-left)] top-[var(--book-mobile-top)] aspect-[0.68] w-[var(--book-mobile-width)] -translate-x-1/2 overflow-hidden rounded-[0.32rem] border border-foreground/10 bg-[var(--book-bg)] text-[var(--book-ink)] opacity-0 shadow-[0_8px_24px_rgba(0,0,0,0.12)] will-change-transform transform-gpu [backface-visibility:hidden] [contain:layout_paint] motion-reduce:opacity-100 lg:left-[var(--book-left)] lg:top-[var(--book-top)] lg:w-[var(--book-width)] lg:shadow-[0_24px_64px_rgba(0,0,0,0.24)]"
    >
      <div className="absolute inset-y-0 left-0 w-[13%] bg-[var(--book-spine)]" />
      <div className="absolute inset-x-[14%] top-0 h-full border-l border-current/18" />
      <div className="absolute inset-x-[18%] top-[54%] h-[18%] -skew-y-6 rounded-full border border-current/24 opacity-35" />
      <div className="relative z-10 flex h-full flex-col justify-between p-[8%]">
        <div className="flex items-start justify-between gap-4">
          <span className="font-helvetica-bold text-[clamp(1.1rem,5.4vw,2rem)] leading-none lg:text-[clamp(1.3rem,2vw,2rem)]">
            {award.letter}
          </span>
          <span className="text-right text-[0.5rem] font-semibold uppercase leading-tight tracking-[0.14em] opacity-60 lg:text-[0.55rem]">
            0{index + 1}
          </span>
        </div>

        <div>
          <p className="text-[0.48rem] font-semibold uppercase leading-tight tracking-[0.12em] opacity-64 sm:text-[0.58rem] sm:tracking-[0.14em]">
            {award.label}
          </p>
          <h3 className="mt-3 hidden max-w-[12rem] text-[clamp(1.35rem,2.1vw,2.3rem)] font-semibold uppercase leading-[0.9] sm:block">
            {award.title}
          </h3>
          <p className="mt-4 hidden max-w-[12rem] text-[0.66rem] font-semibold leading-5 opacity-68 md:block">
            {award.detail}
          </p>
        </div>

        <div className="hidden items-end justify-between gap-4 sm:flex">
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
      const frameScroller = document.querySelector<HTMLElement>(".site-frame");

      if (!section) {
        return;
      }

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const letters = Array.from(
        section.querySelectorAll<HTMLElement>("[data-award-letter]"),
      );
      const books = Array.from(
        section.querySelectorAll<HTMLElement>("[data-award-book]"),
      );
      const intro = Array.from(
        section.querySelectorAll<HTMLElement>("[data-awards-intro]"),
      );

      if (letters.length !== awardLetters.length) {
        return;
      }

      if (reduceMotion) {
        gsap.set([...letters, ...books, ...intro], {
          autoAlpha: 1,
          clearProps: "transform",
        });
        return;
      }

      const createAwardsTimeline = (isDesktop: boolean) => {
        const scroller = isDesktop ? frameScroller : undefined;

        // Cache this immediately to prevent recalculation when mobile browser bars show/hide
        const vh = isDesktop && scroller ? scroller.clientHeight : window.innerHeight;

        const pinDistance = Math.max(
          vh * (isDesktop ? 2.65 : 2.35),
          isDesktop ? 1900 : 1450,
        );

        gsap.set(letters, {
          autoAlpha: 0,
          y: vh * (isDesktop ? 0.46 : 0.32),
          scale: isDesktop ? 0.92 : 0.95,
          force3D: true,
          transformOrigin: "50% 100%",
          willChange: "transform, opacity",
        });

        gsap.set(books, {
          autoAlpha: 0,
          y: vh * (isDesktop ? 0.78 : 0.64),
          x: (index) => {
            const profile = awardMotionProfiles[index];
            return (
              awards[index].drift *
              profile.startX *
              (isDesktop ? 0.85 : 0.34)
            );
          },
          rotation: (index) =>
            awards[index].rotate * (isDesktop ? 0.72 : 0.54),
          scale: (index) =>
            (isDesktop ? 0.94 : 0.96) +
            (index % 3) * (isDesktop ? 0.018 : 0.01),
          force3D: true,
          transformOrigin: "50% 80%",
          willChange: "transform, opacity",
        });

        gsap.set(intro, {
          autoAlpha: 0,
          y: 28,
        });

        // Tell ScrollTrigger to ignore mobile UI resizes to stop jitter
        ScrollTrigger.config({ ignoreMobileResize: true });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            ...(scroller ? { scroller } : {}),
            start: "top top",
            end: `+=${pinDistance}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Keep several books moving through the scene without turning them into one grouped tween.
        const sequenceSpan = 1.65;

        timeline.to(
          intro,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.16,
            stagger: 0.025,
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
            duration: 0.56,
            stagger: 0.25,
            ease: "power3.out",
          },
          sequenceSpan * 0.08,
        );

        const bookTiming = [0.16, 0.29, 0.42, 0.55, 0.68, 0.81, 0.94] as const;

        books.forEach((book, index) => {
          const award = awards[index];
          const profile = awardMotionProfiles[index];
          const start = (bookTiming[index] ?? 0.86) * sequenceSpan;
          const exitX =
            award.drift * profile.exitX * (isDesktop ? 1 : 0.34);

          timeline.to(
            book,
            {
              autoAlpha: 1,
              y: vh * (isDesktop ? 0.08 : 0.06),
              x: exitX * 0.12,
              rotation: award.rotate,
              scale: 1,
              duration: 0.34,
              ease: "power2.out",
            },
            start,
          );

          timeline.to(
            book,
            {
              y: -vh * (isDesktop ? 1.18 : 1.02),
              x: exitX,
              rotation: award.rotate * profile.exitRotation,
              scale: profile.exitScale,
              autoAlpha: 0,
              duration: 0.62,
              ease: "none",
            },
            start + 0.28,
          );
        });

        timeline.to(
          letters,
          {
            autoAlpha: 0.86,
            y: -vh * (isDesktop ? 0.04 : 0.02),
            duration: 0.18,
            ease: "power2.inOut",
          },
          sequenceSpan * 1.38,
        );

        return () => {
          gsap.set([...letters, ...books], {
            clearProps: "willChange",
          });
          timeline.scrollTrigger?.kill();
          timeline.kill();
        };
      };

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          isMobile: "(max-width: 1023px)",
        },
        (context) => {
          const isDesktop = Boolean(context.conditions?.isDesktop);

          if (isDesktop && !frameScroller) {
            return;
          }

          return createAwardsTimeline(isDesktop);
        },
      );

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh, { once: true });
      const refreshFrame = requestAnimationFrame(refresh);

      return () => {
        cancelAnimationFrame(refreshFrame);
        window.removeEventListener("load", refresh);
        mm.revert();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="awards"
      className="fluid-section relative min-h-dvh overflow-hidden bg-background text-foreground lg:min-h-[calc(100vh-1.5rem)] lg:py-0"
    >
      <div className="relative mx-auto flex min-h-[calc(100dvh-7rem)] w-full max-w-[118rem] flex-col justify-center lg:min-h-[calc(100vh-1.5rem)] lg:w-[var(--site-content-width)] lg:max-w-none">
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
          <div className="relative flex w-full items-end justify-center">
            <h2
              data-award-word
              aria-label="awards"
              className="relative z-0 flex w-full items-end justify-center gap-[0.012em] text-center font-helvetica-bold text-[clamp(5.5rem,17.5vw,20.5rem)] lowercase leading-[0.78] tracking-normal text-foreground/62 lg:w-max lg:-translate-y-[clamp(6rem,18vh,8rem)]"
            >
              {awardLetters.map((letter, index) => (
                <span
                  key={`${letter}-${index}`}
                  data-award-letter
                  className="inline-block origin-bottom opacity-0 motion-reduce:opacity-100"
                >
                  {letter}
                </span>
              ))}
            </h2>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 z-10">
          {awards.map((award, index) => (
            <AwardBook key={`${award.title}-${index}`} award={award} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
