"use client";

import type { CSSProperties } from "react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { attitudeCards } from "@/data/attitude";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const sectionStyle = {
  "--attitude-fill": "0%",
} as CSSProperties;

type LenisInstance = {
  scrollTo?: (target: number, options?: { duration?: number }) => void;
};

const cardOffsets = ["-3rem", "3rem", "-1.5rem", "2.5rem", "-2rem"];

export function AttitudeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const snapLockRef = useRef(false);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      const scroller = document.querySelector<HTMLElement>(".site-frame");

      if (!section || !track || !scroller) {
        return;
      }

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const revealItems = gsap.utils.toArray<HTMLElement>(
        "[data-attitude-reveal]",
      );

      if (reduceMotion) {
        gsap.set(revealItems, { autoAlpha: 1, y: 0, scale: 1 });
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const introOffset = () => Math.min(scroller.clientWidth * 0.38, 520);
        const scrollAmount = () =>
          Math.max(
            0,
            track.scrollWidth +
              introOffset() -
              Math.min(scroller.clientWidth, section.clientWidth) +
              96,
          );

        gsap.set(revealItems, {
          autoAlpha: 0,
          y: 56,
          scale: 0.985,
        });
        gsap.set(track, {
          x: () => introOffset(),
          force3D: true,
          willChange: "transform",
        });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            scroller,
            start: "top top",
            end: () =>
              `+=${Math.max(2800, scrollAmount() * 1.15 + window.innerHeight)}`,
            pin: true,
            scrub: 1.15,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              const fill = Math.sin(self.progress * Math.PI) * 100;
              section.style.setProperty("--attitude-fill", `${fill}%`);

              if (snapLockRef.current) {
                return;
              }

              const velocity = Math.abs(self.getVelocity());
              if (velocity < 700) {
                return;
              }

              snapLockRef.current = true;
              const targetTop = section.offsetTop;
              const targetBottom = targetTop + section.offsetHeight;
              const snapTarget = self.direction === 1 ? targetBottom : targetTop;
              const lenis = (window as { __lenis?: LenisInstance }).__lenis;

              if (lenis?.scrollTo) {
                lenis.scrollTo(snapTarget, { duration: 0.35 });
                gsap.delayedCall(0.4, () => {
                  snapLockRef.current = false;
                });
              } else {
                gsap.to(scroller, {
                  scrollTop: snapTarget,
                  duration: 0.22,
                  ease: "power2.out",
                  overwrite: true,
                  onComplete: () => {
                    snapLockRef.current = false;
                  },
                });
              }
            },
            onLeave: () => {
              section.style.setProperty("--attitude-fill", "0%");
            },
            onLeaveBack: () => {
              section.style.setProperty("--attitude-fill", "0%");
            },
          },
        });

        timeline
          .to(
            revealItems,
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              stagger: 0.045,
              duration: 0.16,
              ease: "power2.out",
            },
            0,
          )
          .to(
            track,
            {
              x: () => -scrollAmount(),
              ease: "none",
              duration: 1,
            },
            0,
          );

        return () => {
          gsap.set(track, { clearProps: "willChange" });
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
      id="attitude"
      style={sectionStyle}
      className="relative overflow-hidden bg-background px-5 py-20 text-foreground lg:min-h-[calc(100vh-1.5rem)] lg:px-16 lg:py-0"
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden" aria-hidden="true">
        <h2 className="font-display select-none whitespace-nowrap text-[clamp(5.4rem,17vw,20rem)] leading-none text-foreground/[0.055]">
          attitude
        </h2>
        <h2
          className="font-display absolute left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[clamp(5.4rem,17vw,20rem)]  leading-none text-accent"
          style={{ clipPath: "inset(0 0 0 calc(100% - var(--attitude-fill)))" }}
        >
          attitude
        </h2>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[34rem] w-full max-w-[98rem] flex-col justify-center lg:min-h-[calc(100vh-1.5rem)]">
        <div
          data-attitude-reveal
          className="mb-10 flex items-center gap-3 lg:absolute lg:left-0 lg:top-14 lg:mb-0 lg:opacity-0"
        >
          <span className="grid size-4 place-items-center rounded-full border border-foreground/20">
            <span className="size-1.5 rounded-full bg-accent" />
          </span>
            <p className="text-sm font-semibold  tracking-[0.14em] text-foreground/90">
            Attitude
          </p>
        </div>

        <div className="-mx-5 overflow-x-auto px-5 pb-4 scrollbar-none lg:mx-0 lg:overflow-visible lg:px-0 lg:pb-0">
          <div
            ref={trackRef}
            className="flex w-max gap-5 will-change-transform [transform:translateZ(0)] lg:min-h-[38rem] lg:items-start lg:gap-8 lg:pt-24"
          >
            {attitudeCards.map((card, index) => (
              <article
                key={card.title}
                data-attitude-reveal
                data-attitude-card
                style={
                  {
                    "--card-offset": cardOffsets[index],
                  } as CSSProperties
                }
                className="relative min-h-[25rem] w-[min(82vw,25rem)] shrink-0 rounded-2xl border border-foreground/10 bg-[color-mix(in_srgb,var(--background)_86%,var(--foreground)_6%)] p-7 opacity-100 shadow-[0_24px_70px_rgba(0,0,0,0.16)] backdrop-blur sm:w-[27rem] lg:min-h-[27rem] lg:w-[34rem] lg:opacity-0 lg:p-9 lg:[margin-top:var(--card-offset)]"
              >
                <div className="flex items-center gap-3">
                  <span className="grid size-4 place-items-center rounded-full border border-foreground/20">
                    <span className="size-1.5 rounded-full bg-accent" />
                  </span>
                  <p className="text-xs font-semibold  tracking-[0.16em] text-foreground/88">
                    {card.rule}
                  </p>
                </div>

                <h3 className="font-display mt-8 text-[clamp(2.65rem,3.8vw,4rem)] uppercase leading-[0.9] text-foreground">
                  {card.title}
                </h3>

                <p className="mt-12 max-w-md text-base font-semibold leading-7 text-foreground/62 lg:mt-14 lg:text-[1.05rem] lg:leading-8">
                  {card.description}
                </p>

                <span
                  className="font-display absolute bottom-6 right-8 text-7xl leading-none text-accent/10"
                  aria-hidden="true"
                >
                  0{index + 1}
                </span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
