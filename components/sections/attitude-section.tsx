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
  "--attitude-color-start": "100%",
  "--attitude-color-end": "100%",
} as CSSProperties;

const sectionWordStyle = {
  fontFamily: '"TT Tunnels Bold", Impact, "Arial Black", sans-serif',
  fontWeight: 400,
  fontSynthesis: "weight style small-caps",
  letterSpacing: "normal",
  textTransform: "none",
} as CSSProperties;

const attitudeGlyphStyle = {
  backgroundImage:
    "linear-gradient(90deg, var(--foreground) 0 var(--attitude-color-start), var(--accent) var(--attitude-color-start) var(--attitude-color-end), var(--foreground) var(--attitude-color-end) 100%)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  backgroundRepeat: "no-repeat",
  color: "transparent",
  WebkitTextFillColor: "transparent",
} as CSSProperties;

const desktopCardPositions = [
  { align: "flex-start", offset: "0rem" },
  { align: "flex-end", offset: "0rem" },
  { align: "center", offset: "-1.5rem" },
  { align: "flex-start", offset: "2rem" },
  { align: "center", offset: "1.5rem" },
] as const;

const LETTER_INTRO_DURATION = 1.2;
const LETTER_INTRO_STAGGER = 0.75;
const TRAVEL_DURATION = 5.2;
const LETTER_EXIT_DURATION = 0.28;
const LETTER_EXIT_STAGGER = 0.16;
const LETTER_EDGE_OVERSHOOT = 4;

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
      const glyphs = gsap.utils.toArray<HTMLElement>(
        "[data-attitude-glyph]",
      );
      const heading = section.querySelector<HTMLElement>(
        "[data-attitude-heading]",
      );
      const cards = gsap.utils.toArray<HTMLElement>("[data-attitude-card]");

      if (!heading || glyphs.length !== letters.length) {
        return;
      }

      const syncGlyphGradients = () => {
        const headingWidth = heading.getBoundingClientRect().width;

        glyphs.forEach((glyph, index) => {
          const letter = letters[index];
          const offset = letter?.offsetLeft ?? 0;

          glyph.style.backgroundSize = `${headingWidth}px 100%`;
          glyph.style.backgroundPosition = `${-offset}px 0`;
        });
      };

      syncGlyphGradients();

      if (reduceMotion) {
        gsap.set([intro, ...letters, ...cards], {
          autoAlpha: 1,
          y: 0,
          scale: 1,
        });
        section.style.setProperty("--attitude-color-start", "0%");
        section.style.setProperty("--attitude-color-end", "100%");
        return;
      }

      let mm: gsap.MatchMedia | undefined;
      let initialized = false;

      const initializeAttitude = () => {
        if (initialized) {
          return;
        }

        initialized = true;
        mm = gsap.matchMedia();

        mm.add("(max-width: 1023px)", () => {
          const cardHeight = () => cards[0]?.offsetHeight ?? 320;
          const cardCount = cards.length;

          section.style.setProperty("--attitude-color-start", "0%");
          section.style.setProperty("--attitude-color-end", "0%");

          // First card starts visible at its final position; rest start off-screen below
          gsap.set(cards[0], {
            autoAlpha: 1,
            yPercent: 0,
            scale: 1,
            zIndex: 1,
            force3D: true,
            willChange: "transform",
          });

          cards.slice(1).forEach((card, i) => {
            gsap.set(card, {
              autoAlpha: 1,
              yPercent: 110,
              scale: 1,
              zIndex: i + 2,
              force3D: true,
              willChange: "transform",
            });
          });

          // Each card animation takes 1 unit, with a 0.3 unit hold between cards.
          // This creates smooth pacing: slide → hold → slide → hold → ...
          const slidePhase = 1;
          const holdPhase = 0.3;
          const totalPerCard = slidePhase + holdPhase;
          // Pin distance: generous enough so the last card never bounces on release
          const pinEndDistance = () =>
            cardHeight() * (cardCount + 1.5) + window.innerHeight * 0.15;

          const stackTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              scroller,
              start: "top top",
              end: () => `+=${pinEndDistance()}`,
              pin: true,
              pinSpacing: true,
              scrub: 0.6,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          // Animate each subsequent card (1–4) sliding up into view one at a time
          for (let i = 1; i < cardCount; i++) {
            const startTime = (i - 1) * totalPerCard;
            stackTimeline.to(
              cards[i],
              {
                yPercent: 0,
                duration: slidePhase,
                ease: "power2.out",
              },
              startTime,
            );
          }

          // Blank hold at the end so the last card sits comfortably before unpin
          stackTimeline.to({}, { duration: holdPhase });

          return () => {
            stackTimeline.scrollTrigger?.kill();
            stackTimeline.kill();
            gsap.set(cards, {
              clearProps: "transform,zIndex,willChange,opacity,visibility",
            });
          };
        });

        mm.add("(min-width: 1024px)", () => {
          const introOffset = () => scroller.clientWidth + 48;
          const horizontalTravel = () =>
            introOffset() +
            track.scrollWidth +
            Math.max(200, scroller.clientWidth * 0.1);
          const pinDistance = () =>
            Math.max(scroller.clientHeight * 3.4, track.scrollWidth * 0.82);

          gsap.set(letters, {
            y: 0,
            scale: 1,
            autoAlpha: 1,
          });

          const sectionBounds = section.getBoundingClientRect();
          const entryPositions = new Map<HTMLElement, number>();
          const exitPositions = new Map<HTMLElement, number>();

          letters.forEach((letter) => {
            const letterBounds = letter.getBoundingClientRect();

            entryPositions.set(
              letter,
              sectionBounds.bottom -
                letterBounds.top +
                LETTER_EDGE_OVERSHOOT,
            );
            exitPositions.set(
              letter,
              sectionBounds.top -
                letterBounds.bottom -
                LETTER_EDGE_OVERSHOOT,
            );
          });

          gsap.set(letters, {
            y: (_index, target) =>
              entryPositions.get(target as HTMLElement) ?? 0,
            force3D: true,
            willChange: "transform",
          });
          gsap.set(intro, {
            autoAlpha: 1,
            clearProps: "transform",
          });
          gsap.set(cards, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            force3D: true,
            transformOrigin: "50% 50%",
            willChange: "transform",
          });
          gsap.set(track, {
            x: () => introOffset(),
            force3D: true,
            willChange: "transform",
          });

          let colorDisplacement = 0;

          const setColorSweep = (displacement: number) => {
            const headingWidth = heading.getBoundingClientRect().width;
            colorDisplacement = Math.max(0, displacement);
            const clampedDisplacement = Math.max(
              0,
              Math.min(headingWidth * 2, colorDisplacement),
            );
            const colorStart = Math.max(
              0,
              headingWidth - clampedDisplacement,
            );
            const colorEnd =
              clampedDisplacement <= headingWidth
                ? headingWidth
                : Math.max(0, headingWidth * 2 - clampedDisplacement);

            section.style.setProperty(
              "--attitude-color-start",
              `${colorStart}px`,
            );
            section.style.setProperty(
              "--attitude-color-end",
              `${colorEnd}px`,
            );
          };

          const glyphResizeObserver = new ResizeObserver(() => {
            syncGlyphGradients();
            setColorSweep(colorDisplacement);
          });

          glyphResizeObserver.observe(heading);

          let currentTrackX = track.getBoundingClientRect().left;
          let currentScale = 1;
          let scaleFrame = 0;

          const updateCardScale = () => {
            const nextTrackX = track.getBoundingClientRect().left;
            const pixelDelta = Math.abs(nextTrackX - currentTrackX);
            const targetScale = 1 - Math.min(pixelDelta / 70, 1) * 0.08;

            currentScale += (targetScale - currentScale) * 0.22;
            gsap.set(cards, { scale: currentScale });
            currentTrackX = nextTrackX;
            scaleFrame = requestAnimationFrame(updateCardScale);
          };

          setColorSweep(0);
          scaleFrame = requestAnimationFrame(updateCardScale);
          let colorTrackStartX = Number(gsap.getProperty(track, "x"));

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              scroller,
              start: "top top",
              end: () => `+=${pinDistance()}`,
              pin: true,
              scrub: 0.16,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onLeave: () => {
                setColorSweep(horizontalTravel());
              },
              onLeaveBack: () => {
                setColorSweep(0);
              },
            },
          });

          timeline
            .to(
              letters,
              {
                y: 0,
                duration: LETTER_INTRO_DURATION,
                stagger: { amount: LETTER_INTRO_STAGGER },
                ease: "power1.out",
              },
              0,
            )
            .addLabel("travel")
            .call(
              () => {
                colorTrackStartX = Number(gsap.getProperty(track, "x"));
                setColorSweep(0);
              },
              undefined,
              "travel",
            )
            .to(
              track,
              {
                x: () => introOffset() - horizontalTravel(),
                ease: "none",
                duration: TRAVEL_DURATION,
                onUpdate() {
                  const currentTrackX = Number(gsap.getProperty(track, "x"));

                  setColorSweep(colorTrackStartX - currentTrackX);
                },
              },
              "travel",
            )
            .addLabel("exit")
            .to(
              [...letters].reverse(),
              {
                y: (_index, target) =>
                  exitPositions.get(target as HTMLElement) ?? 0,
                duration: LETTER_EXIT_DURATION,
                stagger: { amount: LETTER_EXIT_STAGGER },
                ease: "power2.in",
              },
              "exit",
            );

          return () => {
            glyphResizeObserver.disconnect();
            cancelAnimationFrame(scaleFrame);
            gsap.set(track, { clearProps: "willChange" });
            gsap.set([...letters, ...cards], {
              clearProps: "transform,opacity,visibility,willChange",
            });
            timeline.scrollTrigger?.kill();
            timeline.kill();
          };
        });
      };

      const waitsForLenis =
        window.matchMedia("(min-width: 1024px)").matches &&
        window.matchMedia("(pointer: fine)").matches;

      if (!waitsForLenis || scroller.dataset.lenisReady === "true") {
        initializeAttitude();
      } else {
        window.addEventListener("lenis:ready", initializeAttitude, {
          once: true,
        });
      }

      return () => {
        window.removeEventListener("lenis:ready", initializeAttitude);
        mm?.revert();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="attitude"
      style={sectionStyle}
      className="relative h-dvh touch-pan-y overflow-hidden bg-background px-5 text-foreground motion-reduce:h-auto motion-reduce:min-h-dvh motion-reduce:overflow-visible sm:px-8 lg:h-[calc(100vh-1.5rem)] lg:px-[var(--site-gutter)]"
    >
      <div
        className="pointer-events-none absolute inset-0 flex items-start justify-center overflow-hidden pt-[calc(var(--header-height)+1rem)] lg:items-center lg:pt-0"
        aria-hidden="true"
      >
        <div className="relative">
          <h2
            data-attitude-heading
            className="flex select-none items-end justify-center gap-[0.018em] whitespace-nowrap text-[31vw] leading-[0.8] lg:text-[clamp(20rem,23vw,28rem)]"
            style={sectionWordStyle}
          >
            {attitudeLetters.map((letter, index) => (
              <span
                key={`${letter}-${index}`}
                data-attitude-letter
                className="inline-block origin-bottom will-change-transform lg:opacity-0 motion-reduce:opacity-100"
              >
                <span
                  data-attitude-glyph
                  className="inline-block pb-[0.035em]"
                  style={attitudeGlyphStyle}
                >
                  {letter}
                </span>
              </span>
            ))}
          </h2>
        </div>
      </div>

      <div className="relative z-10 mx-auto flex h-full min-h-[34rem] w-full max-w-[98rem] flex-col justify-start pt-[calc(var(--header-height)+5.5rem)] motion-reduce:h-auto motion-reduce:pb-12 lg:min-h-0 lg:justify-center lg:pt-0">
        <div
          data-attitude-reveal
          className="mb-7 flex items-center gap-3 lg:absolute lg:left-0 lg:top-14 lg:mb-0 lg:opacity-0"
        >
         
         
        </div>

        <div className="relative -mx-5 min-h-0 flex-1 touch-pan-y overflow-x-hidden overflow-y-visible px-5 pb-14 motion-reduce:overflow-visible sm:-mx-8 sm:px-8 sm:pb-16 lg:absolute lg:inset-0 lg:mx-0 lg:flex lg:items-center lg:overflow-visible lg:px-0 lg:pb-0">
          <div
            ref={trackRef}
            className="relative h-full w-full max-lg:pb-[min(38vw,12rem)] pb-2 will-change-transform [transform:translateZ(0)] motion-reduce:flex motion-reduce:h-auto motion-reduce:flex-col motion-reduce:gap-4 motion-reduce:pb-0 lg:flex lg:h-[78%] lg:w-max lg:items-stretch lg:gap-[4.1666vw] lg:pb-0"
          >
            {attitudeCards.map((card, index) => (
              <article
                key={card.title}
                data-attitude-reveal
                data-attitude-card
                style={
                  {
                    "--card-align": desktopCardPositions[index].align,
                    "--card-offset": desktopCardPositions[index].offset,
                  } as CSSProperties
                }
                className="pointer-events-none absolute inset-x-0 top-0 min-h-[20rem] w-full shrink-0 touch-pan-y select-none rounded-2xl border border-foreground/10 bg-background p-7 opacity-100 [-webkit-touch-callout:none] last:max-lg:border-b-foreground/25 last:max-lg:shadow-[inset_0_-1px_0_0_color-mix(in_srgb,var(--foreground)_22%,transparent)] motion-reduce:relative motion-reduce:inset-auto sm:min-h-[22rem] lg:pointer-events-auto lg:relative lg:inset-auto lg:min-h-[clamp(23rem,54vh,32rem)] lg:w-[clamp(24rem,29vw,35rem)] lg:select-auto lg:shadow-none lg:[align-self:var(--card-align)] lg:[top:var(--card-offset)] lg:p-[clamp(2rem,3.2vw,4rem)]"
              >
                <div className="flex items-center gap-3">
                  <span className="grid size-4 place-items-center rounded-full border border-foreground/20">
                    <span className="size-1.5 rounded-full bg-accent" />
                  </span>
                  <p className="text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-foreground/88 lg:text-[0.84rem]">
                    {card.rule}
                  </p>
                </div>

                <h3 className="font-display mt-7 text-[clamp(2.5rem,11vw,3.5rem)] uppercase leading-[0.9] tracking-[-0.035em] text-foreground lg:mt-8 lg:text-[clamp(3.4rem,3.5vw,5.4rem)]">
                  {card.title}
                </h3>

                <p className="mt-8 max-w-md text-base font-semibold leading-7 text-foreground/62 sm:text-[1.05rem] sm:leading-7 lg:mt-[clamp(3rem,8vh,5.5rem)] lg:max-w-[30rem] lg:text-[clamp(1.12rem,1.35vw,1.45rem)] lg:leading-[1.45]">
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
