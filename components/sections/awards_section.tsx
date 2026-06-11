"use client";

import type { CSSProperties } from "react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const awardLetters = ["a", "w", "a", "r", "d", "s"] as const;

const mobileBookSlots = [
  { left: "20%", top: "58%", width: "clamp(8rem, 37vw, 9.75rem)" },
  { left: "49%", top: "43%", width: "clamp(8.15rem, 38vw, 10rem)" },
  { left: "78%", top: "58%", width: "clamp(7.9rem, 36vw, 9.6rem)" },
  { left: "25%", top: "38%", width: "clamp(7.8rem, 36vw, 9.5rem)" },
  { left: "69%", top: "67%", width: "clamp(7.95rem, 37vw, 9.7rem)" },
  { left: "39%", top: "67%", width: "clamp(8rem, 37vw, 9.75rem)" },
  { left: "74%", top: "37%", width: "clamp(8.15rem, 38vw, 10rem)" },
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
      className="absolute left-[var(--book-mobile-left)] top-[var(--book-mobile-top)] aspect-[0.68] w-[var(--book-mobile-width)] -translate-x-1/2 overflow-hidden rounded-[0.32rem] border border-foreground/10 bg-[var(--book-bg)] text-[var(--book-ink)] opacity-0 shadow-[0_8px_24px_rgba(0,0,0,0.12)] will-change-transform transform-gpu [backface-visibility:hidden] [contain:layout_paint] [container-type:inline-size] motion-reduce:opacity-100 lg:left-[var(--book-left)] lg:top-[var(--book-top)] lg:w-[var(--book-width)] lg:shadow-[0_24px_64px_rgba(0,0,0,0.24)]"
    >
      <div className="absolute inset-y-0 left-0 w-[13%] bg-[var(--book-spine)]" />
      <div className="absolute inset-x-[14%] top-0 h-full border-l border-current/18" />
      <div className="absolute inset-x-[18%] top-[54%] h-[18%] -skew-y-6 rounded-full border border-current/24 opacity-35" />
      <div className="relative z-10 flex h-full min-w-0 flex-col justify-between py-[8%] pl-[18%] pr-[8%]">
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
          <h3 className="mt-2 min-w-0 max-w-full [overflow-wrap:anywhere] text-[clamp(0.72rem,9.5cqw,1.7rem)] font-semibold uppercase leading-[0.92] lg:mt-3">
            {award.title}
          </h3>
          <p className="mt-3 min-w-0 max-w-full text-[clamp(0.48rem,3.8cqw,0.66rem)] font-semibold leading-[1.45] opacity-68 lg:mt-4">
            {award.detail}
          </p>
        </div>

        <div className="flex items-end justify-between gap-3">
          <span className="text-[0.46rem] font-semibold uppercase tracking-[0.1em] opacity-62 sm:text-[0.52rem] lg:text-[0.58rem] lg:tracking-[0.12em]">
            {award.meta}
          </span>
          <span className="h-8 w-px bg-current/30 lg:h-16" aria-hidden="true" />
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
        if (isDesktop && !frameScroller) {
          return;
        }

        const scroller = isDesktop ? frameScroller! : window;

        // Keep viewport-derived distances stable while mobile browser chrome expands/collapses.
        const vh =
          isDesktop && frameScroller
            ? frameScroller.clientHeight
            : document.documentElement.clientHeight;

        const pinDistance = Math.max(
          vh * (isDesktop ? 2.8 : 2.55),
          isDesktop ? 2100 : 1600,
        );
        const sequenceSpan = isDesktop ? 1.5 : 1.65;
        const travelDuration = isDesktop ? 1.3 : 1.18;
        const bookTiming = [0.08, 0.22, 0.36, 0.5, 0.64, 0.78, 0.92] as const;

        gsap.set(letters, {
          autoAlpha: 1,
          y: (index) =>
            vh *
            ((isDesktop ? 0.32 : 0.2) +
              index * (isDesktop ? 0.022 : 0.016)),
          scale: 0.97,
          force3D: true,
          transformOrigin: "50% 100%",
          willChange: "transform, opacity",
        });

        gsap.set(books, {
          autoAlpha: 0,
          y: vh * (isDesktop ? 0.78 : 0.7),
          x: (index) => {
            const profile = awardMotionProfiles[index];
            return (
              awards[index].drift *
              profile.startX *
              (isDesktop ? 0.85 : 0.24)
            );
          },
          rotation: (index) =>
            awards[index].rotate * (isDesktop ? 0.72 : 0.46),
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

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            scroller,
            start: "top top",
            end: `+=${pinDistance}`,
            pin: true,
            pinSpacing: true,
            scrub: true,
            anticipatePin: 1,
          },
        });

        timeline.to(
          intro,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.18,
            stagger: 0.025,
            ease: "power2.out",
          },
          0,
        );

        timeline.to(
          letters,
          {
            y: () => -vh * (isDesktop ? 0.045 : 0.025),
            scale: 1,
            duration: sequenceSpan + travelDuration * 0.72,
            stagger: isDesktop ? 0.025 : 0.018,
            ease: "none",
          },
          0,
        );

        books.forEach((book, index) => {
          const award = awards[index];
          const profile = awardMotionProfiles[index];
          const start = (bookTiming[index] ?? 0.86) * sequenceSpan;
          const exitX =
            award.drift * profile.exitX * (isDesktop ? 1 : 0.34);

          timeline.to(
            book,
            {
              y: -vh * (isDesktop ? 1.16 : 1.04),
              x: exitX,
              rotation: award.rotate * profile.exitRotation,
              scale: profile.exitScale,
              duration: travelDuration,
              ease: "none",
            },
            start,
          );

          timeline.to(
            book,
            {
              autoAlpha: 1,
              duration: isDesktop ? 0.1 : 0.09,
              ease: "none",
            },
            start,
          );

          timeline.to(
            book,
            {
              autoAlpha: 0,
              duration: isDesktop ? 0.16 : 0.14,
              ease: "none",
            },
            start + travelDuration - (isDesktop ? 0.16 : 0.14),
          );
        });

        return () => {
          gsap.set([...letters, ...books, ...intro], {
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
      className="relative h-dvh overflow-hidden bg-background px-4 text-foreground sm:px-8 lg:h-[calc(100vh-1.5rem)] lg:px-[var(--site-gutter)]"
    >
      <div className="relative mx-auto h-full w-full max-w-[118rem] lg:w-[var(--site-content-width)] lg:max-w-none">
        <div
          data-awards-intro
          className="absolute left-0 top-[calc(var(--header-height)+0.75rem)] z-20 flex items-center gap-3 opacity-0 lg:top-14"
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
          className="absolute bottom-5 left-0 z-20 max-w-[13rem] text-xs font-semibold leading-5 text-foreground/64 opacity-0 sm:max-w-sm sm:text-sm lg:bottom-16 lg:text-base lg:leading-7"
        >
          Awards and Recognition.
        </p>

        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          aria-label="awards"
        >
          <div className="relative flex w-full items-end justify-center">
            <h2
              data-award-word
              aria-label="awards"
              className="relative z-0 flex w-max max-w-full items-end justify-center gap-[0.012em] text-center font-helvetica-bold text-[clamp(3.8rem,16vw,6.5rem)] lowercase leading-[0.78] tracking-normal text-foreground/62 lg:text-[clamp(5.5rem,17.5vw,20.5rem)] lg:-translate-y-[clamp(6rem,18vh,8rem)]"
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
