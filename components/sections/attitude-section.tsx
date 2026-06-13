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

      mm.add("(max-width: 1023px)", () => {
        const cardHeight = () => cards[0]?.offsetHeight ?? 320;

        section.style.setProperty("--attitude-reveal-left", "100%");
        section.style.setProperty("--attitude-reveal-right", "0%");

        gsap.set(cards, {
          autoAlpha: 1,
          yPercent: 145,
          scale: 1,
          zIndex: (index) => index + 1,
          force3D: true,
          willChange: "transform",
        });

        const stackTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            scroller: window,
            start: "top top",
            end: () => `+=${cardHeight() * cards.length}`,
            pin: true,
            scrub: 0.18,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        stackTimeline.to(cards, {
          yPercent: (index) => index * 18,
          duration: 1,
          stagger: 1,
          ease: "none",
        });

        return () => {
          stackTimeline.scrollTrigger?.kill();
          stackTimeline.kill();
          gsap.set(cards, {
            clearProps: "transform,zIndex,willChange",
          });
        };
      });

      mm.add("(min-width: 1024px)", () => {
        const viewportHeight = () => scroller.clientHeight;
        const introOffset = () => scroller.clientWidth + 48;
        const horizontalTravel = () =>
          introOffset() +
          track.scrollWidth +
          Math.max(240, scroller.clientWidth * 0.12);
        const pinDistance = () =>
          Math.max(
            scroller.clientHeight * 2.35,
            1900,
          );

        gsap.set(letters, {
          autoAlpha: 1,
          y: () => viewportHeight() * 0.48,
          scale: 0.96,
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

        const entryTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            scroller,
            start: "top 58%",
            end: "top 4%",
            scrub: 0.12,
            invalidateOnRefresh: true,
          },
        });

        entryTimeline
          .to(
            letters,
            {
              y: 0,
              scale: 1,
              duration: 0.34,
              stagger: 0.075,
              ease: "power2.out",
            },
            0,
          )
          .to(
            intro,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.28,
              ease: "power2.out",
            },
            0.46,
          );

        const setColorSweep = (progress: number) => {
          const revealEnd = 0.56;
          const journeyProgress = Math.max(0, Math.min(1, progress / 0.78));
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
            track,
            {
              x: () => introOffset() - horizontalTravel(),
              ease: "none",
              duration: 1,
            },
            0,
          )
          .to(
            cards,
            {
              scale: 0.976,
              duration: 0.76,
              stagger: 0.012,
              ease: "none",
            },
            0.04,
          )
          .to(
            letters,
            {
              autoAlpha: 0,
              y: () => -viewportHeight() * 0.72,
              duration: 0.24,
              stagger: 0.012,
              ease: "power2.in",
            },
            0.76,
          )
          .to(
            intro,
            {
              autoAlpha: 0,
              y: -48,
              duration: 0.2,
              ease: "power2.in",
            },
            0.8,
          );

        return () => {
          gsap.set(track, { clearProps: "willChange" });
          gsap.set([...letters, ...cards], { clearProps: "willChange" });
          entryTimeline.scrollTrigger?.kill();
          entryTimeline.kill();
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
      className="relative h-dvh overflow-hidden bg-background px-5 text-foreground motion-reduce:h-auto motion-reduce:min-h-dvh motion-reduce:overflow-visible sm:px-8 lg:h-[calc(100vh-1.5rem)] lg:px-[var(--site-gutter)]"
    >
      <div
        className="pointer-events-none absolute inset-0 flex items-start justify-center overflow-hidden pt-[calc(var(--header-height)+1rem)] lg:items-center lg:pt-0"
        aria-hidden="true"
      >
        <h2 className="font-helvetica-bold flex select-none items-end justify-center gap-[0.012em] whitespace-nowrap text-[24vw] lowercase leading-[0.78] text-foreground/[0.08] lg:text-[clamp(5.4rem,17vw,20rem)]">
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
          className="font-helvetica-bold absolute left-1/2 flex -translate-x-1/2 select-none items-end justify-center gap-[0.012em] whitespace-nowrap text-[24vw] lowercase leading-[0.78] text-accent lg:text-[clamp(5.4rem,17vw,20rem)]"
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

      <div className="relative z-10 mx-auto flex h-full min-h-[34rem] w-full max-w-[98rem] flex-col justify-start pt-[calc(var(--header-height)+5.5rem)] motion-reduce:h-auto motion-reduce:pb-12 lg:min-h-0 lg:justify-center lg:pt-0">
        <div
          data-attitude-reveal
          className="mb-7 flex items-center gap-3 lg:absolute lg:left-0 lg:top-14 lg:mb-0 lg:opacity-0"
        >
          <span className="grid size-4 place-items-center rounded-full border border-foreground/20">
            <span className="size-1.5 rounded-full bg-accent" />
          </span>
          <p className="text-sm font-semibold tracking-[0.14em] text-foreground/90">
            Attitude
          </p>
        </div>

        <div className="relative -mx-5 min-h-0 flex-1 overflow-hidden px-5 pb-6 motion-reduce:overflow-visible sm:-mx-8 sm:px-8 lg:absolute lg:inset-0 lg:mx-0 lg:flex lg:items-center lg:overflow-visible lg:px-0 lg:pb-0">
          <div
            ref={trackRef}
            className="relative h-full w-full will-change-transform [transform:translateZ(0)] motion-reduce:flex motion-reduce:h-auto motion-reduce:flex-col motion-reduce:gap-4 lg:flex lg:h-auto lg:w-max lg:items-center lg:gap-7"
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
                className="absolute inset-x-0 top-0 min-h-[20rem] w-full shrink-0 rounded-2xl border border-foreground/10 bg-background p-7 opacity-100 last:border-foreground/20 motion-reduce:relative motion-reduce:inset-auto sm:min-h-[22rem] lg:relative lg:inset-auto lg:min-h-[23.5rem] lg:w-[29rem] lg:p-8 lg:[margin-top:var(--card-offset)] xl:w-[31rem]"
              >
                <div className="flex items-center gap-3">
                  <span className="grid size-4 place-items-center rounded-full border border-foreground/20">
                    <span className="size-1.5 rounded-full bg-accent" />
                  </span>
                  <p className="text-xs font-semibold  tracking-[0.16em] text-foreground/88">
                    {card.rule}
                  </p>
                </div>

                <h3 className="font-display mt-7 text-[clamp(2.35rem,11vw,3.25rem)] uppercase leading-[0.9] text-foreground lg:mt-8 lg:text-[clamp(2.65rem,3.8vw,4rem)]">
                  {card.title}
                </h3>

                <p className="mt-8 max-w-md text-[0.95rem] font-semibold leading-6 text-foreground/62 sm:text-base sm:leading-7 lg:mt-12 lg:text-[1.02rem] lg:leading-8">
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
