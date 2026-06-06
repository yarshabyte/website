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
] as const;

const awardMotionProfiles = [
  {
    enterDelay: 0,
    exitX: 0.76,
    mobileExitX: 0.24,
    exitRotation: -0.62,
    exitScale: 1.02,
  },
  {
    enterDelay: 0.1,
    exitX: 0.54,
    mobileExitX: 0.18,
    exitRotation: -0.48,
    exitScale: 0.99,
  },
  {
    enterDelay: 0.18,
    exitX: 0.6,
    mobileExitX: 0.2,
    exitRotation: -0.54,
    exitScale: 1.01,
  },
  {
    enterDelay: 0.26,
    exitX: 0.48,
    mobileExitX: 0.14,
    exitRotation: -0.42,
    exitScale: 0.98,
  },
  {
    enterDelay: 0.34,
    exitX: 0.64,
    mobileExitX: 0.16,
    exitRotation: -0.7,
    exitScale: 1.02,
  },
  {
    enterDelay: 0.42,
    exitX: 0.58,
    mobileExitX: 0.18,
    exitRotation: -0.58,
    exitScale: 1,
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
      className="absolute left-[var(--book-mobile-left)] top-[var(--book-mobile-top)] aspect-[0.68] w-[var(--book-mobile-width)] -translate-x-1/2 overflow-hidden rounded-[0.32rem] border border-foreground/10 bg-[var(--book-bg)] text-[var(--book-ink)] shadow-[0_18px_42px_rgba(0,0,0,0.22)] will-change-transform transform-gpu [backface-visibility:hidden] [contain:layout_paint] lg:left-[var(--book-left)] lg:top-[var(--book-top)] lg:w-[var(--book-width)] lg:shadow-[0_24px_64px_rgba(0,0,0,0.24)]"
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
      const letters = gsap.utils
        .toArray<HTMLElement>("[data-award-letter]")
        .sort(
          (left, right) =>
            Number(left.dataset.awardIndex) - Number(right.dataset.awardIndex),
        );
      const books = gsap.utils.toArray<HTMLElement>("[data-award-book]");
      const awardWords = gsap.utils.toArray<HTMLElement>("[data-award-word]");
      const intro = gsap.utils.toArray<HTMLElement>("[data-awards-intro]");

      if (reduceMotion) {
        gsap.set([...awardWords, ...letters, ...books, ...intro], {
          autoAlpha: 1,
          clearProps: "transform",
        });
        return;
      }

      const createAwardsTimeline = (isDesktop: boolean) => {
        const scroller = isDesktop ? frameScroller : undefined;
        const viewportHeight = () =>
          isDesktop && scroller ? scroller.clientHeight : window.innerHeight;
        const bookStartY = () =>
          viewportHeight() * (isDesktop ? 0.82 : 0.62);
        const bookExitY = () =>
          -viewportHeight() * (isDesktop ? 1.26 : 1.02);
        const pinDistance = () =>
          Math.max(
            viewportHeight() * (isDesktop ? 2.6 : 2.32),
            isDesktop ? 1900 : 1500,
          );
        const letterStartDepth = isDesktop
          ? [0.5, 0.56, 0.64, 0.7, 0.78, 0.86]
          : [0.56, 0.62, 0.7, 0.78, 0.86, 0.94];

        gsap.set(awardWords, {
          autoAlpha: isDesktop ? 0.54 : 0.42,
          y: () => viewportHeight() * (isDesktop ? 0.1 : 0.08),
          scale: isDesktop ? 1.1 : 1.08,
          force3D: true,
          transformOrigin: "50% 70%",
          willChange: "transform, opacity",
        });
        gsap.set(letters, {
          autoAlpha: 1,
          y: (index) => viewportHeight() * (letterStartDepth[index] ?? 1),
          scale: isDesktop ? 1.16 : 1.12,
          force3D: true,
          transformOrigin: "50% 100%",
          willChange: "transform, opacity",
        });
        gsap.set(books, {
          autoAlpha: 0,
          y: bookStartY,
          x: (index) =>
            awards[index].drift * (isDesktop ? -0.08 : -0.025),
          rotation: (index) =>
            awards[index].rotate * (isDesktop ? 0.62 : 0.46),
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
            ...(scroller ? { scroller } : {}),
            start: "top top",
            end: () => `+=${pinDistance()}`,
            pin: true,
            pinSpacing: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline.addLabel("intro", 0);
        timeline.addLabel("cardsIn", 0.48);

        timeline.to(
          intro,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.06,
            ease: "power2.out",
          },
          "intro+=0.08",
        );

        timeline.to(
          awardWords,
          {
            autoAlpha: isDesktop ? 0.48 : 0.36,
            y: () => -viewportHeight() * (isDesktop ? 0.035 : 0.025),
            scale: 1,
            duration: 2.8,
            ease: "none",
          },
          "intro",
        );

        timeline.to(
          letters,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            stagger: 0.055,
            ease: "power2.out",
          },
          "intro",
        );

        books.forEach((book, index) => {
          const award = awards[index];
          const profile = awardMotionProfiles[index];
          const startOffset = profile.enterDelay * 0.16;
          const exitX =
            award.drift * (isDesktop ? profile.exitX : profile.mobileExitX);

          timeline.to(
            book,
            {
              autoAlpha: 1,
              duration: isDesktop ? 0.42 : 0.34,
              ease: "none",
            },
            `cardsIn+=${startOffset}`,
          );

          timeline.to(
            book,
            {
              y: bookExitY,
              x: exitX,
              rotation: award.rotate * profile.exitRotation,
              scale: profile.exitScale,
              duration: isDesktop ? 3.05 : 2.85,
              ease: "none",
            },
            `cardsIn+=${startOffset}`,
          );
        });

        return () => {
          gsap.set([...awardWords, ...letters, ...books], {
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
          <h2
            data-award-word
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
            data-award-word
            aria-label="awards"
            className="absolute inset-0 z-0 flex w-full items-end justify-center gap-[0.012em] text-center font-helvetica-bold text-[clamp(5.5rem,17.5vw,20.5rem)] lowercase leading-[0.78] tracking-normal text-foreground/62 lg:-translate-y-3"
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

        <div className="pointer-events-none absolute inset-0 z-10">
          {awards.map((award, index) => (
            <AwardBook key={`${award.title}-${index}`} award={award} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
