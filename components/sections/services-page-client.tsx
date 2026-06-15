"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { RefreshCw } from "lucide-react";

import { ContactSection } from "@/components/sections/contact-section";
import {
  heroAdjectives,
  resultCases,
  serviceListItems,
  workflowSteps,
} from "@/data/services-page";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="services-section-label">
      <span className="dot-ring" aria-hidden="true" />
      {children}
    </p>
  );
}

function MiniMark() {
  return (
    <span
      className="ml-[0.08em] inline-block size-[0.18em] translate-y-[-0.12em] bg-accent [clip-path:polygon(25%_6%,75%_6%,100%_50%,75%_94%,25%_94%,0_50%)]"
      aria-hidden="true"
    />
  );
}

export function ServicesPageClient() {
  const pageRef = useRef<HTMLElement>(null);
  const switchBtnRef = useRef<HTMLButtonElement>(null);
  const lifecycleRef = useRef<HTMLElement>(null);
  const panesRef = useRef<HTMLDivElement>(null);
  const [activeWord, setActiveWord] = useState(0);
  const [activePane, setActivePane] = useState(0);
  const wordIndexRef = useRef(0);

  useGSAP(
    () => {
      const panes = panesRef.current;
      const lifecycle = lifecycleRef.current;
      const switchBtn = switchBtnRef.current;

      if (!panes) {
        return;
      }

      const scroller = document.querySelector<HTMLElement>(".site-frame");
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const mm = gsap.matchMedia();

      mm.add("(max-width: 1023px)", () => {
        if (!lifecycle || reduceMotion) {
          return;
        }

        const stackItems = gsap.utils.toArray<HTMLElement>(
          ".services-fp-item.is-stack",
        );

        if (stackItems.length === 0) {
          return;
        }

        lifecycle.style.marginBottom = "35vh";

        gsap.set(stackItems, {
          yPercent: (index) => (index + 1) * 10,
          scale: 0.9,
        });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: panes,
            scroller: scroller ?? window,
            start: "top 10%",
            end: "bottom -250%",
            scrub: true,
            pin: lifecycle,
          },
        });

        timeline.to(stackItems, {
          yPercent: (index) => -100 + (index + 1) * 10,
          scale: 1,
          stagger: 0.5,
          duration: 0.5,
          ease: "none",
        });

        return () => {
          lifecycle.style.marginBottom = "";
          timeline.scrollTrigger?.kill();
          timeline.kill();
        };
      });

      let switchCleanup: (() => void) | undefined;

      if (switchBtn && !reduceMotion) {
        const circles = gsap.utils.toArray<HTMLElement>(
          ".services-button-switch i",
          switchBtn,
        );

        const onEnter = () => {
          switchBtn.classList.add("is-hovered");
          gsap.to(circles, {
            scale: 1.1,
            stagger: { amount: 0, from: "end" },
            duration: 0.35,
            ease: "back.out(1.7)",
          });
        };

        const onLeave = () => {
          gsap.to(switchBtn.querySelector("i:nth-child(1)"), {
            scale: 0.55,
            duration: 0.2,
            ease: "back.out(1.7)",
          });
          gsap.to(switchBtn.querySelector("i:nth-child(2)"), {
            scale: 0.7,
            duration: 0.2,
            ease: "back.out(1.7)",
          });
          gsap.to(switchBtn.querySelector("i:nth-child(3)"), {
            scale: 0.85,
            duration: 0.2,
            ease: "back.out(1.7)",
          });
          gsap.to(switchBtn.querySelector("i:nth-child(4)"), {
            scale: 1,
            duration: 0.2,
            ease: "back.out(1.7)",
            onComplete: () => switchBtn.classList.remove("is-hovered"),
          });
        };

        switchBtn.addEventListener("mouseenter", onEnter);
        switchBtn.addEventListener("mouseleave", onLeave);

        switchCleanup = () => {
          switchBtn.removeEventListener("mouseenter", onEnter);
          switchBtn.removeEventListener("mouseleave", onLeave);
        };
      }

      return () => {
        switchCleanup?.();
        mm.revert();
      };
    },
    { scope: pageRef },
  );

  const cycleAdjective = () => {
    const next = (wordIndexRef.current + 1) % heroAdjectives.length;
    wordIndexRef.current = next;
    setActiveWord(next);

    const switchBtn = switchBtnRef.current;
    if (switchBtn) {
      gsap.to(switchBtn.querySelector("svg"), {
        rotation: "+=180",
        duration: 0.55,
        ease: "power2.out",
      });
    }
  };

  const scrollToServices = () => {
    document
      .getElementById("service-block")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <main ref={pageRef} className="services-page bg-background text-foreground">
        <div className="services-breadcrumb">
          <Link href="/" className="opacity-70 transition hover:opacity-100">
            Yarsa Byte
          </Link>
          <span className="opacity-45" aria-hidden="true">/</span>
          <span>Services</span>
        </div>

        <section className="services-hero">
          <div className="services-hero-grid">
            <h1 className="services-hero-line">
              <div className="services-title-switch">
                {heroAdjectives.map((word, index) => (
                  <span
                    key={word}
                    className={index === activeWord ? "is-current" : undefined}
                    style={{
                      transform:
                        index === activeWord
                          ? "translateY(0%)"
                          : index < activeWord
                            ? "translateY(-110%)"
                            : "translateY(110%)",
                      transition:
                        "transform 520ms cubic-bezier(0.19, 1, 0.22, 1)",
                    }}
                  >
                    {word}
                  </span>
                ))}
              </div>

              <div className="services-hero-row shift-1">
                <button
                  ref={switchBtnRef}
                  type="button"
                  className="services-button-switch"
                  aria-label="Cycle service headline word"
                  onClick={cycleAdjective}
                >
                  <i aria-hidden="true" />
                  <i aria-hidden="true" />
                  <i aria-hidden="true" />
                  <i aria-hidden="true" />
                  <RefreshCw aria-hidden="true" />
                </button>
                Approach
              </div>

              <div className="services-hero-row right shift-2 offset">
                that helps your
              </div>
              <div className="services-hero-row right shift-3">business</div>
            </h1>

            <p className="services-hero-intro">
              At Yarsa Byte, we build digital systems for Nepali businesses:
              websites, portfolios, branding, and launch setup that look
              credible and are easy to keep improving.
            </p>
          </div>

          <button
            type="button"
            className="services-scroll-to"
            onClick={scrollToServices}
          >
            (&nbsp;&nbsp;&nbsp;Scroll&nbsp;&nbsp;&nbsp;)
          </button>
        </section>

        <section id="service-block" className="services-block scroll-mt-24">
          <div className="services-block-grid">
            <div>
              <SectionLabel>What we do</SectionLabel>
              <p className="services-block-description mt-6 max-w-md text-base leading-7 text-foreground/68 sm:text-lg">
                At Yarsa Byte, we build digital systems for Nepali businesses
                websites, portfolios, branding, and launch setup that look
                credible and are easy to keep improving.
              </p>
            </div>

            <ul className="services-list">
              {serviceListItems.map((item) => (
                <li key={item.label}>
                  <Link href={item.href}>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          ref={lifecycleRef}
          className="services-block services-lifecycle"
        >
          <div className="services-block-grid !grid-cols-1 lg:!grid-cols-[0.42fr_0.58fr]">
            <SectionLabel>Workflow</SectionLabel>
            <h2 className="services-headline lg:col-start-2">
              Our pathway to success
              <MiniMark />
            </h2>
          </div>

          <div className="services-flying-stage mx-auto mt-8 max-w-[98rem] lg:mt-10">
            <div ref={panesRef} className="services-flying-panes">
              {workflowSteps.map((step, index) => (
                <article
                  key={step.number}
                  className={cn(
                    "services-fp-item",
                    index === activePane && "is-active",
                    index > 0 && "is-stack",
                  )}
                  tabIndex={0}
                  onMouseEnter={() => setActivePane(index)}
                  onFocus={() => setActivePane(index)}
                  onClick={() => setActivePane(index)}
                >
                  <div className="services-fp-inner">
                    <p className="services-section-label services-fp-number">
                      <span className="dot-ring" aria-hidden="true" />
                      {step.number}
                    </p>

                    <div className="services-fp-bottom">
                      <h3 className="services-fp-title">
                        {step.title[0]}
                        <br />
                        {step.title[1]}
                      </h3>
                      <div className="services-fp-body-track">
                        <p className="services-fp-body">{step.description}</p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="services-block">
          <div className="mx-auto max-w-[98rem] text-center">
            <SectionLabel>Results driven</SectionLabel>
            <h2 className="services-headline mt-6">
              Driving success, delivering results
              <MiniMark />
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-foreground/62">
              We understand how much your business matters. These are not just
              promises we focus on work that helps people trust you faster and
              take action sooner.
            </p>
          </div>

          <div className="services-goal-boxes mx-auto mt-10 max-w-[98rem]">
            {resultCases.map((item) => (
              <article key={item.name} className="services-goal-card">
                <div className="inner">
                  <div className={`thumb bg-gradient-to-br ${item.tone}`}>
                    <span aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <div className="services-goal-stat">
                      {item.prefix ? (
                        <span className="text-xs font-semibold">
                          {item.prefix}
                        </span>
                      ) : null}
                      <span className="value">{item.stat}</span>
                      <span className="text-xs font-semibold">
                        {item.suffix}
                      </span>
                    </div>
                    <span className="services-goal-metric">{item.metric}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <ContactSection />
    </>
  );
}
