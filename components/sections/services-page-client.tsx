"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowRight, Check, Layers3, Sparkles } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { serviceHighlights, services } from "@/data/services";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { PremiumButton } from "@/components/ui/premium-button";

type Service = (typeof services)[number];

const ease = [0.22, 1, 0.36, 1] as const;

// 1. TYPOGRAPHY: Service Title with safe wrapping
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
          transition={{ duration: 0.55, delay: index * 0.045, ease }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

// 2. INTERACTION: The Service Card with device-aware scrolling
function ServiceCard({
  service,
  index,
  active,
  onSelect,
}: {
  service: Service;
  index: number;
  active: boolean;
  onSelect: (slug: string) => void;
}) {
  const Icon = service.icon;

  return (
    <motion.button
      type="button"
      layout
      initial={{ opacity: 0, y: 32, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -8, rotate: active ? 0 : -0.6 }}
      whileTap={{ scale: 0.98 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.58, delay: index * 0.045, ease }}
      onClick={(e) => {
        onSelect(service.slug);
        
        const buttonElement = e.currentTarget;

        // Smart Scrolling: Let DOM settle, then scroll based on screen size
        setTimeout(() => {
          if (window.matchMedia("(min-width: 1024px)").matches) {
            // PC: Align card to the top
            buttonElement.scrollIntoView({ behavior: "smooth", block: "start" });
          } else {
            // Mobile: Scroll down to the details panel
            document.getElementById("active-service-panel")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }, 50);
      }}
      className={cn(
        "group relative flex min-h-[20rem] w-full scroll-mt-28 overflow-hidden rounded-[1.5rem] border p-px text-left transition",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
        active
          ? "border-accent/70 shadow-[0_22px_80px_color-mix(in_srgb,var(--accent)_16%,transparent)]"
          : "border-foreground/10 hover:border-sky/45",
      )}
    >
      {/* Background decorations */}
      <span
        className={cn(
          "absolute inset-0 opacity-80 transition duration-500",
          active
            ? "bg-gradient-to-br from-accent/22 via-blue/18 to-sky/18"
            : "bg-foreground/[0.03]",
        )}
      />
      <span className="absolute -right-10 top-8 h-24 w-40 rotate-[-22deg] border-y border-foreground/10 bg-foreground/[0.04] transition duration-500 group-hover:right-0" />

      {/* Foreground Content */}
      <span className="relative flex h-full w-full flex-col rounded-[calc(1.5rem-1px)] bg-background/86 p-5 sm:p-6">
        <span className="flex items-start justify-between gap-5">
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-foreground text-background transition duration-300 group-hover:rotate-6 group-hover:scale-105">
            <Icon className="size-5" aria-hidden="true" />
          </span>
          <span className="rounded-full border border-foreground/10 px-3 py-1 text-xs font-bold uppercase text-foreground/52">
            {service.category}
          </span>
        </span>

        <span className="mt-10 block text-2xl font-black uppercase leading-[1.1] text-foreground text-balance">
          {service.title}
        </span>
        <span className="mt-4 block text-sm leading-7 text-foreground/62 break-words">
          {service.description}
        </span>

        <span className="mt-auto flex items-end justify-between gap-4 pt-8">
          <span>
            <span className="block text-xs font-bold uppercase text-sky">
              {service.timeline}
            </span>
            <span className="mt-1 block text-sm text-foreground/52">
              {service.stat}
            </span>
          </span>
          <span
            className={cn(
              "grid size-11 shrink-0 place-items-center rounded-full transition duration-300",
              active
                ? "bg-accent text-background"
                : "bg-foreground/[0.08] text-foreground group-hover:bg-sky group-hover:text-background",
            )}
          >
            <ArrowRight className="size-4" aria-hidden="true" />
          </span>
        </span>
      </span>
    </motion.button>
  );
}

// 3. DISPLAY: The sticky right-side panel
function ActiveServicePanel({ service }: { service: Service }) {
  const Icon = service.icon;

  return (
    <AnimatePresence mode="wait">
      <motion.article
        key={service.slug}
        id="active-service-panel"
        initial={{ opacity: 0, x: 36, filter: "blur(10px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, x: -24, filter: "blur(10px)" }}
        transition={{ duration: 0.42, ease }}
        // self-start prevents grid stretching. scroll-mt-28 clears header on mobile.
        // Added mt-8 lg:mt-0 so there is space above it on mobile.
        className="sticky top-28 scroll-mt-28 self-start mt-8  lg:mt-0 overflow-hidden rounded-[1.75rem] border border-foreground/10 bg-foreground/[0.045] p-5 shadow-[0_24px_90px_color-mix(in_srgb,#000_22%,transparent)] backdrop-blur"
      >
        <div className="service-grid-surface relative overflow-hidden rounded-[1.25rem] border border-foreground/10 bg-background/92 p-6">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent via-sky to-blue" />
          <div className="flex items-center justify-between gap-4">
            <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-accent text-background">
              <Icon className="size-6" aria-hidden="true" />
            </div>
            <span className="rounded-full border border-foreground/10 px-3 py-1 text-xs font-bold uppercase text-foreground/52">
              {service.timeline}
            </span>
          </div>

          <h2 className="mt-8 text-[clamp(2rem,4.6vw,4.5rem)] font-black uppercase leading-[0.9] text-foreground text-balance">
            <ServiceTitle title={service.title} />
          </h2>
          <p className="mt-5 text-base leading-8 text-foreground/66 break-words">
            {service.outcome}
          </p>

          <div className="mt-8 grid gap-3">
            {service.deliverables.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.32, delay: index * 0.045, ease }}
                className="flex items-center gap-3 rounded-2xl border border-foreground/8 bg-foreground/[0.04] px-4 py-3 text-sm text-foreground/72"
              >
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-sky/16 text-sky">
                  <Check className="size-3.5" aria-hidden="true" />
                </span>
                <span className="break-words">{item}</span>
              </motion.div>
            ))}
          </div>

          <PremiumButton href="/#contact" className="mt-8 w-full">
            Start this service
          </PremiumButton>
        </div>
      </motion.article>
    </AnimatePresence>
  );
}

// 4. LAYOUT: The main page wrapper
export function ServicesPageClient() {
  const reduceMotion = useReducedMotion();
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(services.map((service) => service.category)))],
    [],
  );
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSlug, setActiveSlug] = useState(services[0].slug);

  const filteredServices = useMemo(
    () =>
      activeCategory === "All"
        ? services
        : services.filter((service) => service.category === activeCategory),
    [activeCategory],
  );

  const activeService =
    filteredServices.find((service) => service.slug === activeSlug) ??
    filteredServices[0] ??
    services[0];

  const selectCategory = (category: string) => {
    setActiveCategory(category);
    const nextService =
      category === "All"
        ? services[0]
        : services.find((service) => service.category === category) ?? services[0];
    setActiveSlug(nextService.slug);

    // UX Upgrade: Scroll back to top of grid when a new category is clicked
    document.getElementById("service-explorer")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const scrollToExplorer = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("service-explorer")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <main className="overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-dvh overflow-hidden border-b border-foreground/10 pt-28">
        <div className="service-grid-surface absolute inset-0 opacity-35" aria-hidden="true" />
        <motion.div
          className="absolute left-0 top-24 h-16 w-[140%] -rotate-3 border-y border-foreground/10 bg-accent text-background"
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

        <Container className="relative z-10 flex min-h-[calc(100dvh-7rem)] flex-col justify-end pb-20 lg:pb-24 mt-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease }}
            className="max-w-2xl text-base leading-8 text-foreground/68 sm:text-lg text-balance"
          >
            A motion-led service system for websites, portfolios, posters, reels,
            branding, and launch setup. Pick a lane, scan the deliverables, then
            move straight into contact.
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 52 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.78, ease }}
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
                transition={{ duration: 0.45, delay: 0.25 + index * 0.05, ease }}
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

      {/* EXPLORER SECTION */}
      <section
        id="service-explorer"
        className="relative scroll-mt-24 border-b border-foreground/10 py-20 lg:py-24"
      >
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.68fr_0.32fr] lg:items-start">
            <div className="flex flex-col min-w-0"> {/* min-w-0 prevents grid blowout from long text */}
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

              <div className="mt-10 grid gap-4 md:grid-cols-2">
                {filteredServices.map((service, index) => (
                  <ServiceCard
                    key={service.slug}
                    service={service}
                    index={index}
                    active={service.slug === activeService.slug}
                    onSelect={setActiveSlug}
                  />
                ))}
              </div>
            </div>

            <ActiveServicePanel service={activeService} />
          </div>
        </Container>
      </section>

      {/* FOOTER MARQUEE */}
      <section className="relative overflow-hidden py-20 lg:py-24">
        <div className="flex w-max animate-[serviceMarquee_22s_linear_infinite] gap-6 whitespace-nowrap motion-reduce:animate-none">
          {[...services, ...services].map((service, index) => (
            <span
              key={`${service.slug}-${index}`}
              className="inline-flex items-center gap-4 text-[clamp(2rem,5vw,5rem)] font-black uppercase leading-none text-foreground/16"
            >
              <Sparkles className="size-8 text-accent/55" aria-hidden="true" />
              {service.title}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}