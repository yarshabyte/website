"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { projects, projectsIntro } from "@/data/projects";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const CLIP_HIDDEN =
  "polygon(0% 0%, 100% 0%, 100% 0.15%, 91% 0.15%, 82% 0.15%, 73% 0.15%, 64% 0.15%, 55% 0.15%, 45% 0.15%, 36% 0.15%, 27% 0.15%, 18% 0.15%, 9% 0.15%, 0% 0.15%)";

const CLIP_WAVES = [
  "polygon(0% 0%, 100% 0%, 100% 41%, 91% 33%, 82% 53%, 73% 35%, 64% 71%, 55% 45%, 45% 62%, 36% 15%, 27% 50%, 18% 28%, 9% 38%, 0% 22%)",
  "polygon(0% 0%, 100% 0%, 100% 27%, 91% 57%, 82% 32%, 73% 73%, 64% 48%, 55% 22%, 45% 55%, 36% 38%, 27% 65%, 18% 21%, 9% 45%, 0% 58%)",
  "polygon(0% 0%, 100% 0%, 100% 39%, 91% 52%, 82% 21%, 73% 68%, 64% 33%, 55% 58%, 45% 24%, 36% 72%, 27% 40%, 18% 51%, 9% 30%, 0% 48%)",
  "polygon(0% 0%, 100% 0%, 100% 53%, 91% 28%, 82% 62%, 73% 42%, 64% 18%, 55% 55%, 45% 31%, 36% 60%, 27% 22%, 18% 48%, 9% 68%, 0% 35%)",
];

const CLIP_FULL =
  "polygon(0% 0%, 100% 0%, 100% 100%, 91% 100%, 82% 100%, 73% 100%, 64% 100%, 55% 100%, 45% 100%, 36% 100%, 27% 100%, 18% 100%, 9% 100%, 0% 100%)";


function AnimatedTitle({ text, className }: { text: string; className?: string }) {
  const words = text.trim().split(/\s+/);
  return (
    <h2 className={className}>
      {words.map((word, wi) => (
        <span key={wi}>
          <span className="inline-block overflow-hidden align-bottom leading-[0.88] pb-[0.05em] -mb-[0.05em]">
            {word.split("").map((char, ci) => (
              <span key={ci} data-work-char className="inline-block will-change-transform">
                {char}
              </span>
            ))}
          </span>
          {wi < words.length - 1 && <br />}
        </span>
      ))}
      <span className="ml-4 inline-block size-3 translate-y-[-0.3em] rounded-sm bg-accent sm:size-4 lg:size-5" aria-hidden="true" />
    </h2>
  );
}


export function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const featuredProjects = projects.slice(0, 2);

  const getRandomWave = useCallback(() => {
    return CLIP_WAVES[Math.floor(Math.random() * CLIP_WAVES.length)];
  }, []);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduceMotion) return;

      const scroller = document.querySelector<HTMLElement>(".site-frame");
      if (!scroller) return;

      const charSpans = gsap.utils.toArray<HTMLElement>("[data-work-char]");
      
      if (charSpans.length > 0) {
        gsap.from(charSpans, {
          y: "100%",
          duration: 1,
          stagger: 0.05, // fixed stagger amount
          ease: "expo.out",
          scrollTrigger: {
            trigger: charSpans[0].closest("h2"),
            scroller,
            start: "top 88%",
          },
        });
      }

      const eyebrow = section.querySelector<HTMLElement>("[data-work-eyebrow]");
      const desc = section.querySelector<HTMLElement>("[data-work-desc]");

      [eyebrow, desc].filter(Boolean).forEach((el) => {
        gsap.from(el!, {
          y: 30,
          opacity: 0,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el!,
            scroller,
            start: "top 92%",
          },
        });
      });

      const cards = gsap.utils.toArray<HTMLElement>("[data-work-card]");

      cards.forEach((card) => {
        const imageContainers = card.querySelectorAll<HTMLElement>("[data-work-image-reveal]");
        const imageEls = card.querySelectorAll<HTMLElement>("[data-work-image]");
        
        if (imageContainers.length === 0) return;

        const waveShape = getRandomWave();

        // Animate both mobile and desktop image wrappers simultaneously
        gsap.fromTo(
          imageContainers,
          { clipPath: CLIP_HIDDEN },
          {
            clipPath: waveShape,
            duration: 0.7,
            ease: "power4.in",
            scrollTrigger: {
              trigger: card,
              scroller,
              start: "top 72%",
            },
            onComplete: () => {
              gsap.to(imageContainers, {
                clipPath: CLIP_FULL,
                duration: 0.7,
                ease: "power4.out",
              });
            }
          }
        );

        gsap.fromTo(
          imageEls,
          { y: -40, filter: "brightness(8)", scale: 1.1 },
          {
            y: 0,
            filter: "brightness(1)",
            scale: 1,
            duration: 1.4,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: card,
              scroller,
              start: "top 72%",
            },
          }
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="work"
      className="fluid-section relative min-h-screen overflow-hidden bg-transparent lg:min-h-[calc(100vh-1.5rem)]"
    >
      <div className="mx-auto flex min-h-[calc(100vh-9rem)] w-full max-w-[90rem] flex-col lg:min-h-[calc(100vh-5rem)]">
        <div className="hidden min-h-[12vh] lg:block" aria-hidden="true" />

        <div className="grid gap-[var(--space-stack)] pb-10 pt-10 lg:grid-cols-2 lg:items-start lg:gap-x-12 lg:pb-0 lg:pt-6">
          <div className="lg:pt-6">
            <div data-work-eyebrow className="flex items-center gap-3">
              <span className="grid size-4 place-items-center rounded-full border border-foreground/20">
                <span className="size-1.5 rounded-full bg-accent" />
              </span>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-foreground/90">
                {projectsIntro.eyebrow}
              </p>
            </div>

            <AnimatedTitle text="Recent Works" className="mt-14 max-w-[35rem] text-[clamp(4.4rem,11.2vw,11.5rem)] font-normal uppercase leading-[0.88] tracking-normal text-foreground" />

            <p data-work-desc className="mt-8 max-w-md text-base leading-7 text-foreground/68">
              {projectsIntro.description}
            </p>

            {featuredProjects[1] && (
              <article
                data-work-card
                className="brand-preview-surface group relative mt-14 overflow-hidden rounded-2xl border border-foreground/10 shadow-[0_22px_70px_rgba(0,0,0,0.18)] lg:mt-20"
              >
                <a
                  href={featuredProjects[1].href}
                  target="_blank"
                  rel="noreferrer"
                  className="relative block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  <div className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden bg-foreground/5 sm:block">
                    <div data-work-image-reveal className="absolute inset-0">
                      <Image data-work-image src={featuredProjects[1].thumbnail} alt={`${featuredProjects[1].title} landing page thumbnail`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 48vw, 52vw" className="object-cover object-top transition duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-r from-background/42 via-background/14 to-background/78 transition duration-[850ms] group-hover:from-background/20 group-hover:via-background/10 group-hover:to-background/46" />
                    </div>
                  </div>

                  <div className="relative z-0 min-h-[15rem] overflow-hidden bg-foreground/5 sm:hidden">
                    <div data-work-image-reveal className="absolute inset-0">
                      <Image data-work-image src={featuredProjects[1].thumbnail} alt={`${featuredProjects[1].title} landing page thumbnail`} fill sizes="100vw" className="object-cover object-top transition duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/82 via-background/10 to-transparent" />
                    </div>
                  </div>

                  <div className="relative z-10 flex min-h-[18rem] flex-col justify-between p-6 transition duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:ml-[48%] sm:min-h-[21rem] sm:w-[52%] sm:bg-[color-mix(in_srgb,var(--background)_84%,var(--accent)_16%)] sm:p-8">
                    <div className="flex items-center justify-between gap-4 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-foreground/68">
                      <span>{featuredProjects[1].category}</span>
                      <span>{featuredProjects[1].year}</span>
                    </div>

                    <div className="py-8">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                        {featuredProjects[1].label}
                      </p>
                      <h3 className="mt-3 max-w-xl text-3xl font-normal uppercase leading-[0.95] text-foreground sm:text-4xl lg:text-5xl">
                        {featuredProjects[1].title}
                      </h3>
                      <p className="mt-4 max-w-lg text-sm leading-6 text-foreground/72">
                        {featuredProjects[1].summary}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <div className="flex flex-wrap gap-2">
                        {featuredProjects[1].tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-foreground/12 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-foreground/72"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="grid size-12 shrink-0 place-items-center rounded-full bg-accent text-foreground transition group-hover:scale-105">
                        <ArrowUpRight className="size-5" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </a>
                <span
                  className="pointer-events-none absolute left-5 top-5 rounded-full bg-background/72 px-3 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-foreground backdrop-blur"
                  aria-hidden="true"
                >
                  02
                </span>
              </article>
            )}
          </div>

          <div>
            {featuredProjects[0] && (
              <article
                data-work-card
                className="brand-preview-surface group relative overflow-hidden rounded-2xl border border-foreground/10 shadow-[0_22px_70px_rgba(0,0,0,0.18)]"
              >
                <a
                  href={featuredProjects[0].href}
                  target="_blank"
                  rel="noreferrer"
                  className="relative block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  <div className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden bg-foreground/5 sm:block">
                    <div data-work-image-reveal className="absolute inset-0">
                      <Image data-work-image src={featuredProjects[0].thumbnail} alt={`${featuredProjects[0].title} landing page thumbnail`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 48vw, 52vw" className="object-cover object-top transition duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-r from-background/42 via-background/14 to-background/78 transition duration-[850ms] group-hover:from-background/20 group-hover:via-background/10 group-hover:to-background/46" />
                    </div>
                  </div>

                  <div className="relative z-0 min-h-[15rem] overflow-hidden bg-foreground/5 sm:hidden">
                    <div data-work-image-reveal className="absolute inset-0">
                      <Image data-work-image src={featuredProjects[0].thumbnail} alt={`${featuredProjects[0].title} landing page thumbnail`} fill sizes="100vw" className="object-cover object-top transition duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/82 via-background/10 to-transparent" />
                    </div>
                  </div>

                  <div className="relative z-10 flex min-h-[18rem] flex-col justify-between p-6 transition duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:ml-[48%] sm:min-h-[21rem] sm:w-[52%] sm:bg-[color-mix(in_srgb,var(--background)_84%,var(--accent)_16%)] sm:p-8">
                    <div className="flex items-center justify-between gap-4 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-foreground/68">
                      <span>{featuredProjects[0].category}</span>
                      <span>{featuredProjects[0].year}</span>
                    </div>

                    <div className="py-8">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                        {featuredProjects[0].label}
                      </p>
                      <h3 className="mt-3 max-w-xl text-3xl font-normal uppercase leading-[0.95] text-foreground sm:text-4xl lg:text-5xl">
                        {featuredProjects[0].title}
                      </h3>
                      <p className="mt-4 max-w-lg text-sm leading-6 text-foreground/72">
                        {featuredProjects[0].summary}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <div className="flex flex-wrap gap-2">
                        {featuredProjects[0].tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-foreground/12 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-foreground/72"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="grid size-12 shrink-0 place-items-center rounded-full bg-accent text-foreground transition group-hover:scale-105">
                        <ArrowUpRight className="size-5" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </a>
                <span
                  className="pointer-events-none absolute left-5 top-5 rounded-full bg-background/72 px-3 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-foreground backdrop-blur"
                  aria-hidden="true"
                >
                  01
                </span>
              </article>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
