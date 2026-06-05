"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useState, useEffect } from "react";

import {
  studioCrew,
  studioPrinciples,
  studioStats,
  studioTimeline,
} from "@/data/studio-pages";
import { projects } from "@/data/projects";
import { Container } from "@/components/ui/container";
import { PremiumButton } from "@/components/ui/premium-button";

type Service = (typeof services)[number];

// We use a beautiful, buttery-smooth ease curve instead of bouncy springs
const smoothEase = [0.22, 1, 0.36, 1] as const;

function SplitWords({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="inline-block transform-gpu whitespace-normal break-words"
          initial={{ opacity: 0, y: "0.65em", rotateX: -55 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.68, delay: 0.08 + index * 0.045, ease }}
        >
          {word}
          {index === text.split(" ").length - 1 ? null : "\u00a0"}
        </motion.span>
      ))}
    </>
  );
}

function HexGlyph({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-block bg-accent [clip-path:polygon(25%_6%,75%_6%,100%_50%,75%_94%,25%_94%,0_50%)] ${className}`}
      aria-hidden="true"
    />
  );
}

function StudioOrbital() {
  const reduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(true);

  // Pause animation when tab is hidden to save battery/CPU
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

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
      ))}
    </motion.div>
  );
}

export function ServicesPageClient() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="overflow-x-hidden">
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
{/* forced the exact pixel value */}
       <Container className="relative z-10 flex min-h-[calc(100dvh-7rem)] flex-col justify-end pb-20 lg:pb-40 mt-[60px] ">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: smoothEase }}
            className="max-w-2xl text-base leading-8 text-foreground/68 sm:text-lg text-balance lg:pt-8"
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
              href="#studio-story"
              className="mt-10 inline-flex size-12 items-center justify-center rounded-full border border-foreground/12 bg-foreground/[0.05] text-foreground transition hover:bg-foreground hover:text-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:size-14"
              aria-label="Jump to studio story"
            >
              <ArrowDown className="size-5" aria-hidden="true" />
            </a>
          </div>

          <StudioOrbital />
        </Container>
      </section>

      <section id="studio-story" className="section-spacing relative border-b border-foreground/10">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
            <motion.div
              variants={rise}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-12% 0px" }}
              className="lg:sticky lg:top-24"
            >
              <p className="text-sm font-black uppercase tracking-[0.2em] text-accent">
                Creative Studio
              </p>
              <h2 className="mt-5 text-[clamp(2.4rem,6vw,4rem)] font-black uppercase leading-[0.86] text-foreground sm:text-[clamp(2.8rem,6vw,5rem)] lg:text-[clamp(2.8rem,6vw,6.5rem)]">
                Useful work with a pulse.
              </h2>
            </motion.div>

            <div className="grid gap-5">
              {studioPrinciples.map((item, index) => (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, x: 36 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 0.62, delay: index * 0.06, ease }}
                  className="group relative overflow-hidden border border-foreground/10 bg-foreground/[0.035] p-5 transition hover:border-accent/55 hover:bg-foreground/[0.06] sm:p-6 md:p-8"
                >
                  <div className="absolute inset-y-0 left-0 w-1 origin-bottom scale-y-0 bg-accent transition duration-500 group-hover:scale-y-100" />
                  <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:gap-6">
                    <div>
                      <p className="font-display text-2xl uppercase leading-none text-foreground sm:text-3xl">
                        {item.title}
                      </p>
                      <p className="mt-4 max-w-2xl text-sm leading-7 text-foreground/64 sm:mt-5 sm:text-base sm:leading-8">
                        {item.text}
                      </p>
                    </div>
                    <span className="font-display text-4xl text-foreground/10 sm:text-5xl">
                      0{index + 1}
                    </span>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          {/* Added motion.div, layout, and grid-flow-dense */}
          <motion.div 
            layout 
            className="mt-12 grid gap-6 grid-flow-dense md:grid-cols-2 lg:grid-cols-3 items-start"
          >
            
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
          </motion.div>
        </Container>
      </section>

      <section className="relative overflow-hidden border-b border-foreground/10 py-8 sm:py-10">
        <motion.div
          className="flex w-max gap-6 whitespace-nowrap text-[clamp(1.8rem,6vw,3rem)] font-black uppercase leading-none text-foreground/14 sm:text-[clamp(2.2rem,7vw,5rem)] md:text-[clamp(2.5rem,7vw,8rem)]"
          animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
          transition={reduceMotion ? undefined : { duration: 18, repeat: Infinity, ease: "linear" }}
          aria-hidden="true"
        >
          {[...studioCrew, ...studioCrew, ...studioCrew].map((member, index) => (
            <span key={`${member.initials}-${index}`} className="inline-flex items-center gap-4 sm:gap-6">
              <Sparkles className="size-5 text-accent/50 sm:size-7 md:size-8" />
              {member.name}
            </span>
          ))}
        </motion.div>
      </section>

      <section className="section-spacing border-b border-foreground/10">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-sky">
                The team shape
              </p>
              <h2 className="mt-4 text-[clamp(2.2rem,6vw,3.5rem)] font-black uppercase leading-[0.88] sm:text-[clamp(2.5rem,6vw,4rem)] md:text-[clamp(2.8rem,6vw,6rem)]">
                One studio, many hands.
              </h2>
            </div>
            <PremiumButton href="/contact" className="self-start sm:self-auto">
              Start with us
            </PremiumButton>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {studioCrew.map((member, index) => (
              <motion.article
                key={member.name}
                initial={{ opacity: 0, y: 30, rotate: -1 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                whileHover={{ y: -6, rotate: index % 2 === 0 ? -1 : 1 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.58, delay: index * 0.05, ease }}
                className="group flex min-h-[20rem] flex-col overflow-hidden border border-foreground/10 bg-foreground/[0.035] p-5 transition hover:border-accent/40 hover:bg-foreground/[0.05] sm:min-h-[22rem]"
              >
                <div className="grid aspect-square place-items-center overflow-hidden bg-accent text-background">
                  <motion.span
                    className="font-display text-[clamp(3rem,7vw,4.5rem)] leading-none sm:text-[clamp(3.5rem,7vw,6.4rem)]"
                    animate={reduceMotion ? undefined : { scale: [1, 1.06, 1] }}
                    transition={reduceMotion ? undefined : { duration: 3.2, repeat: Infinity, delay: index * 0.2 }}
                  >
                    {member.initials}
                  </motion.span>
                </div>
                <h3 className="mt-5 font-display text-2xl uppercase leading-none text-foreground sm:mt-6 sm:text-3xl">
                  {member.name}
                </h3>
                <p className="mt-2 text-xs font-semibold uppercase leading-6 tracking-[0.12em] text-foreground/54 sm:mt-3 sm:text-sm">
                  {member.role}
                </p>
              </motion.article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-spacing border-b border-foreground/10">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.38fr_0.62fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-accent">
                Manifesto
              </p>
              <h2 className="mt-5 text-[clamp(2.2rem,6vw,3.5rem)] font-black uppercase leading-[0.86] sm:text-[clamp(2.5rem,6vw,4rem)] md:text-[clamp(2.8rem,6vw,6.2rem)]">
                Create, learn, launch, repeat.
              </h2>
            </div>

            <div className="grid gap-4">
              {studioTimeline.map((item, index) => (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 0.56, delay: index * 0.05, ease }}
                  className="grid gap-4 border border-foreground/10 bg-foreground/[0.035] p-5 sm:grid-cols-[7rem_1fr]"
                >
                  <div className="font-display text-5xl leading-none text-accent sm:text-6xl">{item.year}</div>
                  <div>
                    <h3 className="font-display text-2xl uppercase leading-none sm:text-3xl">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-foreground/64 sm:text-base sm:leading-8">
                      {item.text}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="section-spacing">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.55fr_0.45fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-sky">
                Recent proof
              </p>
              <h2 className="mt-4 text-[clamp(2.2rem,6vw,3.5rem)] font-black uppercase leading-[0.86] sm:text-[clamp(2.5rem,6vw,4rem)] md:text-[clamp(2.8rem,6vw,6.5rem)]">
                Latest and greatest.
              </h2>
            </div>
            <div className="grid gap-3">
              {projects.slice(0, 2).map((project) => (
                <Link
                  key={project.href}
                  href="/work"
                  className="group flex min-h-20 items-center justify-between gap-4 border border-foreground/10 bg-foreground/[0.035] p-4 transition hover:border-accent/55 hover:bg-accent hover:text-background sm:min-h-24 sm:gap-5"
                >
                  <span>
                    <span className="block text-[11px] font-black uppercase tracking-[0.18em] text-current/55 sm:text-xs">
                      {project.category}
                    </span>
                    <span className="mt-1 block font-display text-xl uppercase leading-none sm:mt-2 sm:text-2xl">
                      {project.title}
                    </span>
                  </span>
                  <ArrowUpRight className="size-5 transition group-hover:translate-x-1 group-hover:-translate-y-1 sm:size-6" />
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
