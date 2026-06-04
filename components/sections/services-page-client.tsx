"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowRight, Check, Layers3, Sparkles } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { serviceHighlights, services } from "@/data/services";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { PremiumButton } from "@/components/ui/premium-button";

type Service = (typeof services)[number];

// We use a beautiful, buttery-smooth ease curve instead of bouncy springs
const smoothEase = [0.22, 1, 0.36, 1] as const;

function ServiceTitle({ title }: { title: string }) {
  const words = title.split(" ");

  return (
    <span className="inline-flex max-w-full flex-wrap gap-x-3 gap-y-1 break-words">
      {words.map((word, index) => (
        <motion.span
          layout
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
  index,
  isActive,
  isExpanded,
  onSelect,
  onToggleExpand,
}: {
  service: Service;
  index: number;
  isActive: boolean;
  isExpanded: boolean;
  onSelect: () => void;
  onToggleExpand: () => void;
}) {
  const Icon = service.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      animate={{ 
        scale: isActive && !isExpanded ? 1.02 : 1,
      }}
      viewport={{ once: true, margin: "-10% 0px" }}
      // Replaced bouncy springs with strict, smooth durations
      transition={{
        layout: { duration: 0.5, ease: smoothEase },
        scale: { duration: 0.4, ease: smoothEase },
        opacity: { duration: 0.4 },
        y: { duration: 0.4 }
      }}
      onClick={onSelect}
      className={cn(
        // Added 'service-card' class so our auto-scroll script can find it easily
        "service-card group relative flex w-full flex-col overflow-hidden rounded-[1.5rem] border p-px text-left cursor-pointer transition-colors duration-500",
        isActive && !isExpanded 
          ? "border-accent/70 shadow-[0_22px_80px_color-mix(in_srgb,var(--accent)_16%,transparent)] z-10" 
          : "border-foreground/10 hover:border-sky/45",
        isExpanded 
          ? "md:col-span-2 lg:col-span-2 border-accent shadow-[0_24px_90px_color-mix(in_srgb,#000_22%,transparent)] z-20" 
          : "col-span-1"
      )}
    >
      <motion.span
        layout
        className={cn(
          "absolute inset-0 opacity-80 transition-colors duration-500",
          isActive || isExpanded
            ? "bg-gradient-to-br from-accent/22 via-blue/18 to-sky/18"
            : "bg-foreground/[0.03]"
        )}
      />
      <span className="absolute -right-10 top-8 h-24 w-40 rotate-[-22deg] border-y border-foreground/10 bg-foreground/[0.04] transition duration-500 group-hover:right-0" />

      <motion.span layout className="relative flex h-full w-full flex-col rounded-[calc(1.5rem-1px)] bg-background/92 p-5 sm:p-6 sm:pb-8 backdrop-blur-sm">
        
        <motion.span layout="position" className="flex items-start justify-between gap-5">
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-foreground text-background transition duration-300 group-hover:rotate-6 group-hover:scale-105">
            <Icon className="size-5" aria-hidden="true" />
          </span>
          <span className="rounded-full border border-foreground/10 px-3 py-1 text-xs font-bold uppercase text-foreground/52">
            {service.category}
          </span>
        </motion.span>

        <motion.span layout="position" className="mt-10 block text-2xl font-black uppercase leading-[1.1] text-foreground text-balance">
          <ServiceTitle title={service.title} />
        </motion.span>
        
        <motion.span layout="position" className="mt-4 block text-sm leading-7 text-foreground/62 break-words">
          {service.description}
        </motion.span>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0, filter: "blur(4px)" }}
              animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
              exit={{ height: 0, opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.5, ease: smoothEase }}
              className="overflow-hidden"
            >
              <div className="pt-8 border-t border-foreground/10 mt-8">
                <p className="text-base leading-8 text-foreground/80 break-words font-medium">
                  {service.outcome}
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {service.deliverables.map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.03 + 0.1 }}
                      className="flex items-center gap-3 rounded-2xl border border-foreground/8 bg-foreground/[0.03] px-4 py-3 text-sm text-foreground/72"
                    >
                      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-sky/16 text-sky">
                        <Check className="size-3.5" aria-hidden="true" />
                      </span>
                      <span className="break-words">{item}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8">
                  <PremiumButton href="/#contact" className="w-full sm:w-auto">
                    Start this service
                  </PremiumButton>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.span layout="position" className="mt-auto flex items-end justify-between gap-4 pt-8">
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
            onClick={(e) => {
              e.stopPropagation(); 
              onToggleExpand();

              // Auto-Centering Logic:
              // If the card is currently closed (meaning we just clicked to open it)
              if (!isExpanded) {
                const card = e.currentTarget.closest(".service-card");
                
                // We wait a tiny 150ms so the card starts its height expansion, 
                // allowing the browser to calculate exactly where the "center" should be.
                setTimeout(() => {
                  card?.scrollIntoView({
                    behavior: "smooth",
                    block: "center", // This centers the card perfectly in the viewport
                  });
                }, 150); 
              }
            }}
            aria-label={isExpanded ? "Collapse details" : "Expand details"}
            className={cn(
              "grid size-12 shrink-0 place-items-center rounded-full transition duration-300 z-20 shadow-sm",
              isActive || isExpanded
                ? "bg-accent text-background"
                : "bg-foreground/[0.08] text-foreground hover:bg-sky hover:text-background",
            )}
          >
            <motion.div 
              animate={{ rotate: isExpanded ? -90 : isActive ? -45 : 0 }} 
              transition={{ duration: 0.4, ease: smoothEase }}
            >
              <ArrowRight className="size-5" aria-hidden="true" />
            </motion.div>
          </button>
        </motion.span>
      </motion.span>
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
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

  const filteredServices = useMemo(
    () =>
      activeCategory === "All"
        ? services
        : services.filter((service) => service.category === activeCategory),
    [activeCategory],
  );

  const selectCategory = (category: string) => {
    setActiveCategory(category);
    setActiveSlug(null);
    setExpandedSlug(null);
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

        <Container className="relative z-10 flex min-h-[calc(100dvh-7rem)] flex-col justify-end pb-20 lg:pb-24 mt-15 lg:mt-0">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: smoothEase }}
            className="max-w-2xl text-base leading-8 text-foreground/68 sm:text-lg text-balance"
          >
            A motion-led service system for websites, portfolios, posters, reels,
            branding, and launch setup. Select a card, expand for deliverables, then
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
        className="relative scroll-mt-24 border-b border-foreground/10 py-20 lg:py-24"
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

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start">
            {filteredServices.map((service, index) => (
              <ServiceCard
                key={service.slug}
                service={service}
                index={index}
                isActive={activeSlug === service.slug}
                isExpanded={expandedSlug === service.slug}
                onSelect={() => {
                  if (expandedSlug === service.slug) return;
                  setActiveSlug(activeSlug === service.slug ? null : service.slug);
                }}
                onToggleExpand={() => {
                  if (expandedSlug === service.slug) {
                    setExpandedSlug(null); 
                  } else {
                    setExpandedSlug(service.slug); 
                    setActiveSlug(service.slug); 
                  }
                }}
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden py-20 lg:py-24">
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