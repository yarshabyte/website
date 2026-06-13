"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const awardLetters = [
  { character: "a", zIndex: 16 },
  { character: "w", zIndex: 6 },
  { character: "a", zIndex: 13 },
  { character: "r", zIndex: 16 },
  { character: "d", zIndex: 7 },
  { character: "s", zIndex: 18 },
] as const;

const books = [
  {
    src: "/books/book-01.webp",
    width: 480,
    height: 638,
    left: "25vw",
    zIndex: 15,
    startRotation: 20,
    endRotation: -20,
  },
  {
    src: "/books/book-02.webp",
    width: 3614,
    height: 4795,
    left: "62.5vw",
    zIndex: 5,
    startRotation: -20,
    endRotation: 20,
  },
  {
    src: "/books/book-03.webp",
    width: 3614,
    height: 4795,
    left: "37.5vw",
    zIndex: 12,
    startRotation: 20,
    endRotation: -20,
  },
  {
    src: "/books/book-04.webp",
    width: 480,
    height: 638,
    left: "54.166vw",
    zIndex: 13,
    startRotation: -20,
    endRotation: 20,
  },
  {
    src: "/books/book-05.webp",
    width: 2480,
    height: 3508,
    left: "25vw",
    zIndex: 8,
    startRotation: 20,
    endRotation: -20,
  },
  {
    src: "/books/book-06.webp",
    width: 480,
    height: 638,
    left: "58.333vw",
    zIndex: 15,
    startRotation: -20,
    endRotation: 20,
  },
  {
    src: "/books/book-07.webp",
    width: 2480,
    height: 3508,
    left: "37.5vw",
    zIndex: 11,
    startRotation: 20,
    endRotation: -20,
  },
] as const;

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
      const letters = gsap.utils.toArray<HTMLElement>(
        "[data-award-letter]",
        section,
      );
      const bookFrames = gsap.utils.toArray<HTMLElement>(
        "[data-award-book]",
        section,
      );
      const content = section.querySelector<HTMLElement>(
        "[data-awards-content]",
      );

      if (!content) {
        return;
      }

      if (reduceMotion) {
        gsap.set(letters, { yPercent: 0, scale: 1 });
        gsap.set(bookFrames, { y: "-18vh", scale: 1 });
        gsap.set(content, { yPercent: 0 });
        return;
      }

      const media = gsap.matchMedia();

      media.add("(min-width: 1024px)", () => {
        const viewportHeight = () => scroller.clientHeight;

        gsap.set(letters, {
          yPercent: 200,
          scale: 2,
          transformOrigin: "50% 100%",
          force3D: true,
        });
        gsap.set(bookFrames, {
          y: (index) => viewportHeight() * (0.5 + index * 0.2),
          rotation: (index) => books[index].startRotation,
          scale: 0.8,
          transformOrigin: "50% 50%",
          force3D: true,
        });
        gsap.set(content, { yPercent: 130, force3D: true });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            scroller,
            start: "top 80%",
            end: () => `+=${viewportHeight() * 3.8}`,
            toggleActions: "play reverse play reverse",
            anticipatePin: 1,
            scrub: 0.2,
            invalidateOnRefresh: true,
          },
        });

        const pinTrigger = ScrollTrigger.create({
          trigger: section,
          scroller,
          start: "top 20%",
          end: () => `+=${viewportHeight() * 3.2}`,
          toggleActions: "play reverse play reverse",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });

        timeline.to(letters, {
          yPercent: 0,
          scale: 1,
          duration: 4,
          stagger: { amount: 3 },
          ease: "power1.out",
        });
        timeline.to(
          bookFrames,
          {
            y: () => -viewportHeight() * 0.85,
            scale: 1,
            rotation: (index) => books[index].endRotation,
            duration: 4,
            stagger: { amount: 3 },
            ease: "none",
          },
          "<",
        );
        timeline.to(
          content,
          {
            yPercent: 0,
            duration: 2,
            ease: "none",
          },
          "-=2",
        );

        return () => {
          pinTrigger.kill();
          timeline.scrollTrigger?.kill();
          timeline.kill();
        };
      });

      const refresh = () => ScrollTrigger.refresh();
      const refreshFrame = requestAnimationFrame(refresh);
      window.addEventListener("load", refresh, { once: true });

      return () => {
        cancelAnimationFrame(refreshFrame);
        window.removeEventListener("load", refresh);
        media.revert();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="awards"
      className="relative hidden h-[calc(100vh-1.5rem)] overflow-hidden bg-background text-foreground lg:block"
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute left-[12.5vw] top-[8vh] whitespace-nowrap font-display text-[37vw] lowercase leading-[0.8] tracking-[-0.055em]">
          {awardLetters.map(({ character, zIndex }, index) => (
            <span
              key={`${character}-${index}`}
              data-award-letter
              className="relative inline-block translate-y-[200%] scale-200 will-change-transform"
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
            className="absolute bottom-0 w-[12.5vw] translate-y-[100vh] overflow-hidden rounded-[5px] will-change-transform"
            style={{ left: book.left, zIndex: book.zIndex }}
          >
            <Image
              src={book.src}
              alt=""
              width={book.width}
              height={book.height}
              sizes="12.5vw"
              className="block h-auto w-full"
            />
          </figure>
        ))}
      </div>

      <div
        data-awards-content
        className="absolute inset-x-[12.5vw] bottom-[7vh] z-30 translate-y-[130%] will-change-transform"
      >
        <div className="flex items-center" aria-hidden="true">
          <span className="size-2.5 rotate-45 border border-foreground/55 bg-background" />
          <span className="h-px flex-1 bg-foreground/45" />
          <span className="size-2.5 rotate-45 border border-foreground/55 bg-background" />
        </div>

        <p className="mt-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/65">
          <span className="size-1.5 rounded-full bg-accent" />
          Latest award
        </p>

        <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-10">
          <h2 className="font-display text-[clamp(4rem,9vw,9rem)] uppercase leading-[0.8] tracking-[-0.05em]">
            Yarsa Byte
          </h2>
          <p className="max-w-56 pb-1 text-sm font-semibold leading-6 text-foreground/60">
            Awards and recognition.
          </p>
        </div>
      </div>
    </section>
  );
}
