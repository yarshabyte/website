"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowRight, Check, Layers3, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { serviceHighlights, services } from "@/data/services";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { PremiumButton } from "@/components/ui/premium-button";

type Service = (typeof services)[number];

const smoothEase = [0.22, 1, 0.36, 1] as const;

function ServiceTitle({ title }: { title: string }) {
  const words = title.split(" ");

  return (
    <span className="inline-flex max-w-full flex-wrap gap-x-3 gap-y-1 break-words">
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="inline-block"
          initial={{ opacity: 0, y: 36, rotateX: -40 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.55, delay: index * 0.045, ease: smoothEase }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

function ServiceCard({
  service,
  isExpanded,
  reduceMotion,
  onToggle,
}: {
  service: Service;
  isExpanded: boolean;
  reduceMotion: boolean;
  onToggle: () => void;
}) {
  const Icon = service.icon;

  return (
    <motion.div
      layout
      data-service-slug={service.slug}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      whileHover={
        reduceMotion || isExpanded ? undefined : { y: -8, scale: 1.015 }
      }
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        layout: { duration: reduceMotion ? 0 : 0.4, ease: smoothEase },
        scale: { duration: 0.22, ease: smoothEase },
        opacity: { duration: 0.35 },
        y: { duration: 0.35 },
      }}
      onClick={onToggle}
      className={cn(
        "service-card group relative flex h-full w-full transform-gpu cursor-pointer flex-col overflow-hidden rounded-[1.15rem] border p-px text-left transition-[border-color,box-shadow] duration-300",
        isExpanded
          ? "col-span-full min-h-[min(34rem,calc(100dvh-3rem))] max-w-[46rem] justify-self-center border-accent/65 shadow-[0_20px_52px_color-mix(in_srgb,var(--accent)_16%,transparent)]"
          : "min-h-[25rem] border-foreground/10 shadow-[0_12px_30px_rgba(0,0,0,0.07)] hover:border-accent/60 hover:shadow-[0_20px_44px_color-mix(in_srgb,var(--accent)_13%,transparent)] sm:aspect-square sm:min-h-0",
      )}
    >
      <span
        className="absolute inset-0 bg-gradient-to-br from-accent/8 via-transparent to-sky/12 opacity-80 transition-colors duration-300 group-hover:from-accent/20 group-hover:to-sky/20"
      />
      <span className="absolute -right-10 top-8 h-24 w-40 rotate-[-22deg] border-y border-foreground/10 bg-foreground/[0.04] transition-[right] duration-300 group-hover:right-0" />

      <div
        className={cn(
          "relative grid h-full w-full rounded-[calc(1.15rem-1px)] bg-background/95 p-5",
          isExpanded
            ? "grid-rows-[auto_1fr_auto] gap-4 overflow-y-auto sm:p-6 lg:grid-cols-[0.44fr_0.56fr] lg:grid-rows-[1fr_auto] lg:gap-x-7"
            : "grid-rows-[auto_auto_1fr_auto] sm:p-5 lg:p-6",
        )}
      >
        <div className={cn(isExpanded && "lg:col-start-1 lg:row-start-1")}>
          <div className="flex items-start justify-between gap-[var(--space-grid)]">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-foreground text-background transition duration-300 group-hover:rotate-6 group-hover:scale-105">
              <Icon className="size-4.5" aria-hidden="true" />
            </span>
            <span className="rounded-full border border-foreground/10 px-3 py-1 text-xs font-bold uppercase text-foreground/52">
              {service.category}
            </span>
          </div>

          <span className="mt-7 block text-balance text-[1.35rem] font-black uppercase leading-[1.08] text-foreground sm:mt-8 lg:text-[1.45rem]">
            <ServiceTitle title={service.title} />
          </span>

          <span className="mt-3 block break-words text-sm leading-6 text-foreground/62">
            {service.description}
          </span>
        </div>

        {isExpanded && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.32, ease: smoothEase }}
            className="min-h-0 lg:col-start-2 lg:row-start-1"
          >
            <p className="text-base font-medium leading-7 text-foreground/76 sm:text-lg sm:leading-8">
              {service.outcome}
            </p>

            <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {service.deliverables.map((item) => (
                <div
                  key={item}
                  className="flex min-h-12 items-center gap-3 rounded-xl border border-foreground/8 bg-foreground/[0.035] px-3.5 py-2.5 text-sm font-semibold text-foreground/72"
                >
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                    <Check className="size-3.5" aria-hidden="true" />
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <PremiumButton href="/#contact" className="w-full sm:w-auto">
                Start this service
              </PremiumButton>
            </div>
          </motion.div>
        )}

        <div
          className={cn(
            "flex items-end justify-between gap-4",
            isExpanded
              ? "border-t border-foreground/10 pt-5 lg:col-span-2 lg:row-start-2"
              : "mt-auto pt-6",
          )}
        >
          <span>
            <span className="block text-xs font-bold uppercase text-sky">
              {service.timeline}
            </span>
            <span className="mt-1 block text-sm text-foreground/52">
              {service.stat}
            </span>
          </span>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onToggle();
            }}
            aria-expanded={isExpanded}
            aria-label={`${isExpanded ? "Collapse" : "Expand"} ${service.title} details`}
            className={cn(
              "z-20 grid size-11 shrink-0 place-items-center rounded-full shadow-sm transition duration-300",
              isExpanded
                ? "bg-accent text-background"
                : "bg-foreground/[0.08] text-foreground group-hover:bg-accent group-hover:text-background",
            )}
          >
            <motion.div
              animate={{ rotate: isExpanded ? -90 : 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.3, ease: smoothEase }}
            >
              <ArrowRight className="size-5" aria-hidden="true" />
            </motion.div>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function ServicesPageClient() {
  const reduceMotion = useReducedMotion();
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(services.map((service) => service.category)))],
    [],
  );
  
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const filteredServices = useMemo(
    () =>
      activeCategory === "All"
        ? services
        : services.filter((service) => service.category === activeCategory),
    [activeCategory],
  );

  const selectCategory = (category: string) => {
    setActiveCategory(category);
    setSelectedSlug(null);
  };

  useEffect(() => {
    if (!selectedSlug) {
      return;
    }

    const frame = document.querySelector<HTMLElement>(".site-frame");
    const card = document.querySelector<HTMLElement>(
      `[data-service-slug="${selectedSlug}"]`,
    );

    if (!card) {
      return;
    }

    const centerExpandedCard = () => {
      const cardRect = card.getBoundingClientRect();
      const frameRect = frame?.getBoundingClientRect();
      const viewportTop = frameRect?.top ?? 0;
      const viewportHeight = frame?.clientHeight ?? window.innerHeight;
      const targetOffset = Math.max(12, (viewportHeight - cardRect.height) / 2);
      const delta = cardRect.top - viewportTop - targetOffset;

      if (Math.abs(delta) < 8) {
        return;
      }

      if (frame) {
        frame.scrollTo({
          top: frame.scrollTop + delta,
          behavior: reduceMotion ? "auto" : "smooth",
        });
      } else {
        window.scrollTo({
          top: window.scrollY + delta,
          behavior: reduceMotion ? "auto" : "smooth",
        });
      }
    };

    const animationTimer = window.setTimeout(centerExpandedCard, 420);

    return () => window.clearTimeout(animationTimer);
  }, [reduceMotion, selectedSlug]);

  const scrollToExplorer = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("service-explorer")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <main className="overflow-x-hidden">
      <section className="page-hero-spacing relative min-h-[max(100dvh,52rem)] overflow-hidden border-b border-foreground/10">
        <div className="service-grid-surface absolute inset-0 opacity-35" aria-hidden="true" />
        <motion.div
          className="absolute left-0 top-[calc(var(--header-height)+1.25rem)] h-16 w-[140%] -rotate-3 border-y border-foreground/10 bg-accent text-background"
          animate={reduceMotion ? undefined : { x: ["0%", "-12%"] }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 10, repeat: Infinity, ease: "linear" }
          }
          aria-hidden="true"
        >
          <div className="flex h-full items-center gap-8 whitespace-nowrap text-xl font-black uppercase">
            {Array.from({ length: 10 }).map((_, index) => (
              <span key={index}>Build / Create / Shape / Launch</span>
            ))}
          </div>
        </motion.div>

       <Container className="relative z-10 flex min-h-[calc(max(100dvh,52rem)_-_var(--header-height))] flex-col justify-end pb-[var(--space-section)] pt-36 sm:pt-44">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: smoothEase }}
            className="max-w-2xl text-base leading-8 text-foreground/68 sm:text-lg text-balance lg:pt-8"
          >
            A motion-led service system for websites, portfolios, posters, reels,
            branding, and launch setup. Open a card for deliverables, then
            move straight into contact.
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 52 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.78, ease: smoothEase }}
            className="mt-8 max-w-full text-[clamp(3.4rem,13vw,12rem)] font-black uppercase leading-[0.82] text-foreground"
          >
            Services
          </motion.h1>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {serviceHighlights.map((highlight, index) => (
              <motion.span
                key={highlight}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.25 + index * 0.05, ease: smoothEase }}
                className="rounded-full border border-foreground/10 bg-foreground/[0.04] px-4 py-2 text-sm text-foreground/68"
              >
                {highlight}
              </motion.span>
            ))}
          </div>

          <a
            href="#service-explorer"
            onClick={scrollToExplorer}
            className="mt-10 inline-flex size-14 items-center justify-center rounded-full border border-foreground/12 bg-foreground/[0.05] text-foreground transition hover:bg-foreground hover:text-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            aria-label="Jump to service explorer"
          >
            <ArrowDown className="size-5" aria-hidden="true" />
          </a>
        </Container>
      </section>

      <section
        id="service-explorer"
        className="section-spacing relative scroll-mt-24 border-b border-foreground/10"
      >
        <Container>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/[0.04] px-4 py-2 text-sm font-bold text-sky">
                <Layers3 className="size-4" aria-hidden="true" />
                Manage services
              </div>
              <h2 className="mt-5 text-[clamp(2.5rem,6vw,5.75rem)] font-black uppercase leading-[0.88] text-foreground text-balance">
                Navigate by service type.
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => selectCategory(category)}
                  className={cn(
                    "min-h-11 rounded-full border px-4 text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
                    activeCategory === category
                      ? "border-accent bg-accent text-background"
                      : "border-foreground/10 bg-foreground/[0.04] text-foreground/68 hover:border-sky/60 hover:text-foreground",
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div
            className="mt-[var(--space-stack)] grid items-stretch gap-[var(--space-grid)] md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.slug}
                service={service}
                isExpanded={selectedSlug === service.slug}
                reduceMotion={Boolean(reduceMotion)}
                onToggle={() =>
                  setSelectedSlug((current) =>
                    current === service.slug ? null : service.slug,
                  )
                }
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="section-spacing-tight relative overflow-hidden">
        <motion.div 
          className="flex w-max gap-6 whitespace-nowrap will-change-transform"
          animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 25, repeat: Infinity, ease: "linear" }
          }
        >
          {[...services, ...services].map((service, index) => (
            <span
              key={`${service.slug}-${index}`}
              className="inline-flex items-center gap-4 text-[clamp(2rem,5vw,5rem)] font-black uppercase leading-none text-foreground/16"
            >
              <Sparkles className="size-8 text-accent/55" aria-hidden="true" />
              {service.title}
            </span>
          ))}
        </motion.div>
      </section>
    </main>
  );
}
