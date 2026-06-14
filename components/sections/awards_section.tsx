"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ENTRY_EDGE_OVERSHOOT = 4;

const awardLetters = [
  { character: "a", zIndex: 16 },
  { character: "w", zIndex: 6 },
  { character: "a", zIndex: 13 },
  { character: "r", zIndex: 16 },
  { character: "d", zIndex: 7 },
  { character: "s", zIndex: 18 },
] as const;

const books = [
  { src: "/books/book-01.webp", width: 480, height: 638, left: "25vw", zIndex: 15, startRotation: 20, endRotation: -20 },
  { src: "/books/book-02.webp", width: 3614, height: 4795, left: "62.5vw", zIndex: 5, startRotation: -20, endRotation: 20 },
  { src: "/books/book-03.webp", width: 3614, height: 4795, left: "37.5vw", zIndex: 12, startRotation: 20, endRotation: -20 },
  { src: "/books/book-04.webp", width: 480, height: 638, left: "54.166vw", zIndex: 13, startRotation: -20, endRotation: 20 },
  { src: "/books/book-05.webp", width: 2480, height: 3508, left: "25vw", zIndex: 8, startRotation: 20, endRotation: -20 },
  { src: "/books/book-06.webp", width: 480, height: 638, left: "58.333vw", zIndex: 15, startRotation: -20, endRotation: 20 },
  { src: "/books/book-07.webp", width: 2480, height: 3508, left: "37.5vw", zIndex: 11, startRotation: 20, endRotation: -20 },
] as const;

function getScroller(): HTMLElement | null {
  return document.querySelector<HTMLElement>(".site-frame");
}

function scrollTriggerBase(scroller: HTMLElement | null): ScrollTrigger.Vars {
  return scroller ? { scroller } : {};
}

export function AwardsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const scroller = getScroller();
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const ctx = gsap.context(() => {
        const canvas = section.querySelector<HTMLElement>("[data-awards-scroll]");
        const letters = gsap.utils.toArray<HTMLElement>("[data-award-letter]", section);
        const bookFrames = gsap.utils.toArray<HTMLElement>("[data-award-book]", section);
        const content = section.querySelector<HTMLElement>("[data-awards-content]");

        if (!canvas || !content || letters.length === 0 || bookFrames.length === 0) return;

        if (reduceMotion) {
          gsap.set(canvas, { autoAlpha: 1 });
          gsap.set(letters, { y: "10vh", scale: 1, opacity: 1 });
          gsap.set(bookFrames, { y: 0, scale: 1, rotate: 0 });
          gsap.set(content, { autoAlpha: 1 });
          return;
        }

        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
          let awardTimeline: gsap.core.Timeline | undefined;

          const buildAwards = () => {
            awardTimeline?.scrollTrigger?.kill();
            awardTimeline?.kill();

            const sectionHeight = section.clientHeight;
            const scrollDistance = Math.max(sectionHeight * 3.4, 2200);

            gsap.set(canvas, { autoAlpha: 0 });

            gsap.set(bookFrames, {
              y: 0,
              rotate: (index) => books[index]?.startRotation ?? 0,
              scale: 0.82,
              transformOrigin: "50% 50%",
              force3D: true,
            });

            gsap.set(letters, {
              y: 0,
              scale: 2,
              opacity: 0.6,
              force3D: true,
            });

            const sectionBounds = section.getBoundingClientRect();

            gsap.set(letters, {
              y: (_index, target) =>
                sectionBounds.bottom -
                (target as HTMLElement).getBoundingClientRect().top +
                ENTRY_EDGE_OVERSHOOT,
            });

            gsap.set(bookFrames, {
              y: (_index, target) =>
                sectionBounds.bottom -
                (target as HTMLElement).getBoundingClientRect().top +
                ENTRY_EDGE_OVERSHOOT,
            });

            gsap.set(content, {
              y: "20vh",
              autoAlpha: 0,
            });

            gsap.set(canvas, { autoAlpha: 1 });

            awardTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: `+=${scrollDistance}`,
                scrub: 0.25,
                pin: true,
                pinType: "transform",
                anticipatePin: 1,
                invalidateOnRefresh: true,
                ...scrollTriggerBase(scroller),
                onToggle: (self) => {
                  scroller?.classList.toggle("awards-is-pinned", self.isActive);

                 
                },
              },
            });

            awardTimeline
              .to(
                letters,
                {
                  y: "10vh",
                  scale: 1,
                  opacity: 1,
                  duration: 4,
                  stagger: { amount: 2.2 },
                  ease: "power1.out",
                },
                0,
              )
              .to(
                bookFrames,
                {
                  y: (_index, target) => -((target as HTMLElement).offsetHeight + 220),
                  scale: 1,
                  rotate: (index) => books[index]?.endRotation ?? 0,
                  duration: 5.2,
                  stagger: { amount: 2 },
                  ease: "none",
                },
                0,
              )
              .to(
                content,
                {
                  y: 0,
                  autoAlpha: 1,
                  duration: 1.4,
                  ease: "none",
                },
                3.7,
              );

            ScrollTrigger.refresh();
          };

          const waitsForLenis =
            !!scroller &&
            window.matchMedia("(pointer: fine)").matches &&
            window.matchMedia("(min-width: 768px)").matches;

          if (!waitsForLenis || scroller?.dataset.lenisReady === "true") {
            buildAwards();
          } else {
            window.addEventListener("lenis:ready", buildAwards, { once: true });
          }

          const onLoad = () => ScrollTrigger.refresh();
          window.addEventListener("load", onLoad, { once: true });

          return () => {
            window.removeEventListener("lenis:ready", buildAwards);
            window.removeEventListener("load", onLoad);
            scroller?.classList.remove("awards-is-pinned");
            awardTimeline?.scrollTrigger?.kill();
            awardTimeline?.kill();
          };
        });
      }, section);

      return () => ctx.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="awards"
      className="relative hidden h-[calc(100svh-0.75rem)] min-h-[520px] overflow-hidden bg-background text-foreground lg:block"
    >
      <div
        data-awards-scroll
        className="invisible absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute left-[3.5vw] top-[22vh] whitespace-nowrap font-display text-[21.5vw] lowercase leading-[0.8] tracking-[-0.065em] text-foreground">
          {awardLetters.map(({ character, zIndex }, index) => (
            <span
              key={`${character}-${index}`}
              data-award-letter
              className="relative inline-block translate-y-[185%] scale-[2] opacity-60 will-change-transform"
              style={{ zIndex }}
            >
              {character}
            </span>
          ))}
        </div>

        {books.map((book) => (
          <figure
            key={book.src}
            data-award-book
            className="absolute left-0 top-0 w-[12.5vw] translate-y-[120vh] overflow-hidden rounded-[5px] will-change-transform"
            style={{ left: book.left, zIndex: book.zIndex }}
          >
            <Image
              src={book.src}
              alt=""
              width={book.width}
              height={book.height}
              sizes="12.5vw"
              className="block h-auto w-full"
              priority
            />
          </figure>
        ))}
      </div>

      <div
        data-awards-content
        className="absolute inset-x-[12.5vw] bottom-[7vh] z-30 invisible translate-y-[20vh] will-change-transform"
      >
        <div className="flex items-center" aria-hidden="true">
          <span className="size-2.5 rotate-45 border border-foreground/55 bg-background" />
          <span className="h-px flex-1 bg-foreground/45" />
          <span className="size-2.5 rotate-45 border border-foreground/55 bg-background" />
        </div>
      </div>
    </section>
  );
}
