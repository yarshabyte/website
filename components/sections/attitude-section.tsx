"use client";

import type { CSSProperties } from "react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { attitudeCards } from "@/data/attitude";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const attitudeLetters = ["a", "t", "t", "i", "t", "u", "d", "e"] as const;

const sectionStyle = {
  "--attitude-reveal-left": "100%",
  "--attitude-reveal-right": "0%",
} as CSSProperties;

const cardOffsets = ["-2rem", "2rem", "-1rem", "1.75rem", "-1.5rem"];

export function AttitudeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

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
      const intro = section.querySelector<HTMLElement>(
        "[data-attitude-reveal]",
      );
      const letters = gsap.utils.toArray<HTMLElement>(
        "[data-attitude-letter]",
      );
      const cards = gsap.utils.toArray<HTMLElement>("[data-attitude-card]");

      if (reduceMotion) {
        gsap.set([intro, ...letters, ...cards], {
          autoAlpha: 1,
          y: 0,
          scale: 1,
        });
        section.style.setProperty("--attitude-reveal-left", "0%");
        section.style.setProperty("--attitude-reveal-right", "0%");
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const viewportHeight = () => scroller.clientHeight;
        const introOffset = () => scroller.clientWidth + 48;
        const endFocusOffset = () =>
          Math.min(scroller.clientWidth * 0.28, 420);
        const horizontalTravel = () =>
          Math.max(
            0,
            track.scrollWidth +
              introOffset() -
              Math.min(scroller.clientWidth, section.clientWidth) +
              endFocusOffset(),
          );
        const pinDistance = () =>
          Math.max(
            horizontalTravel() + scroller.clientHeight * 0.12,
            scroller.clientHeight * 1.15,
          );

        gsap.set(letters, {
          autoAlpha: 0,
          y: () => viewportHeight() * 0.42,
          scale: 0.92,
          force3D: true,
          transformOrigin: "50% 100%",
          willChange: "transform, opacity",
        });
        gsap.set(intro, {
          autoAlpha: 0,
          y: 24,
        });
        gsap.set(cards, {
          autoAlpha: 1,
          y: 0,
          scale: 1.012,
          force3D: true,
          willChange: "transform",
        });
        gsap.set(track, {
          x: () => introOffset(),
          force3D: true,
          willChange: "transform",
        });

        const setColorSweep = (progress: number) => {
          const introEnd = 0.26;
          const revealEnd = 0.58;
          const journeyProgress = Math.max(
            0,
            Math.min(1, (progress - introEnd) / (1 - introEnd)),
          );
          const revealLeft =
            journeyProgress < revealEnd
              ? 100 - (journeyProgress / revealEnd) * 100
              : 0;
          const revealRight =
            journeyProgress > revealEnd
              ? ((journeyProgress - revealEnd) / (1 - revealEnd)) * 100
              : 0;

          section.style.setProperty(
            "--attitude-reveal-left",
            `${Math.max(0, revealLeft)}%`,
          );
          section.style.setProperty(
            "--attitude-reveal-right",
            `${Math.min(100, revealRight)}%`,
          );
        };

        setColorSweep(0);

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            scroller,
            start: "top top",
            end: () => `+=${pinDistance()}`,
            pin: true,
            scrub: 0.12,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              setColorSweep(self.progress);
            },
            onLeave: () => {
              setColorSweep(1);
            },
            onLeaveBack: () => {
              setColorSweep(0);
            },
          },
        });

        timeline
          .to(
            intro,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.16,
              ease: "power2.out",
            },
            0,
          )
          .to(
            letters,
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.12,
              stagger: 0.02,
              ease: "power3.out",
            },
            0,
          )
          .to(
            track,
            {
              x: () => introOffset() - horizontalTravel(),
              ease: "none",
              duration: 0.74,
            },
            0.26,
          )
          .to(
            cards,
            {
              scale: 0.976,
              duration: 0.68,
              stagger: 0.012,
              ease: "none",
            },
            0.28,
          );

        return () => {
          gsap.set(track, { clearProps: "willChange" });
          gsap.set([...letters, ...cards], { clearProps: "willChange" });
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
      className="relative h-dvh overflow-hidden bg-background px-5 py-12 text-foreground sm:px-8 lg:h-[calc(100vh-1.5rem)] lg:px-[var(--site-gutter)] lg:py-0"
    >
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        <h2 className="font-helvetica-bold flex select-none items-end justify-center gap-[0.012em] whitespace-nowrap text-[clamp(5.4rem,17vw,20rem)] lowercase leading-[0.78] text-foreground/[0.08]">
          {attitudeLetters.map((letter, index) => (
            <span
              key={`${letter}-${index}`}
              data-attitude-letter
              className="inline-block origin-bottom lg:opacity-0 motion-reduce:opacity-100"
            >
              {letter}
            </span>
          ))}
        </h2>
        <h2
          className="font-helvetica-bold absolute left-1/2 flex -translate-x-1/2 select-none items-end justify-center gap-[0.012em] whitespace-nowrap text-[clamp(5.4rem,17vw,20rem)] lowercase leading-[0.78] text-accent"
          style={{
            clipPath:
              "inset(0 var(--attitude-reveal-right) 0 var(--attitude-reveal-left))",
          }}
        >
          {attitudeLetters.map((letter, index) => (
            <span key={`accent-${letter}-${index}`} className="inline-block">
              {letter}
            </span>
          ))}
        </h2>
      </div>

      <div className="relative z-10 mx-auto flex h-full min-h-[34rem] w-full max-w-[98rem] flex-col justify-center lg:min-h-0">
        <div
          data-attitude-reveal
          className="mb-10 flex items-center gap-3 lg:absolute lg:left-0 lg:top-14 lg:mb-0 lg:opacity-0"
        >
          <span className="grid size-4 place-items-center rounded-full border border-foreground/20">
            <span className="size-1.5 rounded-full bg-accent" />
          </span>
          <p className="text-sm font-semibold tracking-[0.14em] text-foreground/90">
            Attitude
          </p>
        </div>

        <div className="-mx-5 overflow-x-auto px-5 pb-4 scrollbar-none lg:absolute lg:inset-0 lg:mx-0 lg:flex lg:items-center lg:overflow-visible lg:px-0 lg:pb-0">
          <div
            ref={trackRef}
            className="flex w-max gap-5 will-change-transform [transform:translateZ(0)] lg:items-center lg:gap-7"
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
                className="relative min-h-[22rem] w-[min(78vw,22rem)] shrink-0 rounded-2xl border border-foreground/10 bg-[color-mix(in_srgb,var(--background)_86%,var(--foreground)_6%)] p-7 opacity-100 shadow-[0_24px_70px_rgba(0,0,0,0.16)] backdrop-blur sm:w-[25rem] lg:min-h-[23.5rem] lg:w-[29rem] lg:p-8 lg:[margin-top:var(--card-offset)] xl:w-[31rem]"
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

                <p className="mt-10 max-w-md text-base font-semibold leading-7 text-foreground/62 lg:mt-12 lg:text-[1.02rem] lg:leading-8">
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
