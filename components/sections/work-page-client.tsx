"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Grid2X2, List } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";
import { ContactSection } from "@/components/sections/contact-section";
import { Container } from "@/components/ui/container";
import { PremiumButton } from "@/components/ui/premium-button";

const ease = [0.22, 1, 0.36, 1] as const;

const projectTags = Array.from(
  new Set(projects.flatMap((project) => project.tags).concat(["Motion", "Launch"])),
);

export function WorkPageClient() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isGridOpen, setIsGridOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const activeProject = projects[activeIndex] ?? projects[0];
  const count = projects.length;

  const activeServices = useMemo(
    () =>
      services
        .slice(0, 4)
        .map((service) => service.title.replace("Website Design & Development", "Website Design")),
    [],
  );

  const move = (direction: 1 | -1) => {
    setActiveIndex((current) => (current + direction + count) % count);
  };

  return (
    <>
    <main className="overflow-hidden">
      <section className="page-hero-spacing relative min-h-dvh overflow-hidden">
        <div className="service-grid-surface absolute inset-0 opacity-20" aria-hidden="true" />
        <motion.div
          className="absolute inset-y-0 right-0 w-[45vw] bg-accent/10 blur-3xl"
          animate={reduceMotion ? undefined : { x: [30, -20, 30], opacity: [0.3, 0.58, 0.3] }}
          transition={reduceMotion ? undefined : { duration: 7, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />

        <Container className="relative z-10 flex min-h-[calc(100dvh-7rem)] flex-col pb-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-accent">
              Yarsha Byte Work
            </p>
            <button
              type="button"
              onClick={() => setIsGridOpen((current) => !current)}
              className="inline-flex min-h-11 items-center gap-2 border border-foreground/10 bg-foreground/[0.04] px-4 text-sm font-bold uppercase text-foreground/76 transition hover:border-accent/50 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {isGridOpen ? <List className="size-4" /> : <Grid2X2 className="size-4" />}
              {isGridOpen ? "Close grid" : "All projects"}
            </button>
          </div>

          <div className="grid flex-1 gap-8 py-8 lg:grid-cols-[0.42fr_0.58fr] lg:items-center">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 44 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.72, ease }}
                className="text-[clamp(4.2rem,12vw,12rem)] font-black uppercase leading-[0.82] text-foreground"
              >
                Work
                <span className="ml-[0.08em] inline-block size-[0.16em] min-h-4 min-w-4 translate-y-[-0.04em] bg-accent [clip-path:polygon(25%_6%,75%_6%,100%_50%,75%_94%,25%_94%,0_50%)]" />
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.58, delay: 0.12, ease }}
                className="mt-6 max-w-md text-base leading-8 text-foreground/66"
              >
                A fast-moving reel of websites, portfolios, and launch systems
                built for real businesses and personal brands.
              </motion.p>

              <div className="mt-9 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => move(-1)}
                  className="grid size-12 place-items-center rounded-full border border-foreground/10 bg-foreground/[0.04] transition hover:border-accent hover:bg-accent hover:text-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  aria-label="Previous project"
                >
                  <ArrowLeft className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={() => move(1)}
                  className="grid size-12 place-items-center rounded-full border border-foreground/10 bg-foreground/[0.04] transition hover:border-accent hover:bg-accent hover:text-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  aria-label="Next project"
                >
                  <ArrowRight className="size-5" />
                </button>
                <span className="ml-2 font-display text-3xl text-foreground/84">
                  {String(activeIndex + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                </span>
              </div>
            </div>

            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.article
                  key={activeProject.title}
                  initial={{ opacity: 0, x: 70, rotate: 2, filter: "blur(16px)" }}
                  animate={{ opacity: 1, x: 0, rotate: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: -50, rotate: -2, filter: "blur(16px)" }}
                  transition={{ duration: 0.62, ease }}
                  className="group relative overflow-hidden border border-foreground/10 bg-foreground/[0.045]"
                >
                  <a
                    href={activeProject.href}
                    target="_blank"
                    rel="noreferrer"
                    className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    <div className="relative aspect-[1.02/1] min-h-[22rem] overflow-hidden">
                      <Image
                        src={activeProject.thumbnail}
                        alt={`${activeProject.title} website preview`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 58vw"
                        className="object-cover object-top transition duration-[900ms] group-hover:scale-105"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/12 to-transparent" />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
                      <div className="flex flex-wrap gap-2">
                        {activeProject.tags.map((tag) => (
                          <span
                            key={tag}
                            className="border border-foreground/18 bg-background/72 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-foreground backdrop-blur"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="mt-5 flex items-end justify-between gap-5">
                        <div>
                          <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">
                            {activeProject.category} / {activeProject.year}
                          </p>
                          <h2 className="mt-3 max-w-lg text-[clamp(1.6rem,2.8vw,3.1rem)] font-black uppercase leading-[0.92] text-foreground text-balance">
                            {activeProject.title}
                          </h2>
                        </div>
                        <span className="grid size-14 shrink-0 place-items-center rounded-full bg-accent text-background transition group-hover:scale-110">
                          <ArrowUpRight className="size-6" />
                        </span>
                      </div>
                    </div>
                  </a>
                </motion.article>
              </AnimatePresence>
            </div>
          </div>
        </Container>
      </section>

      <AnimatePresence>
        {isGridOpen ? (
          <motion.section
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.56, ease }}
            className="overflow-hidden border-y border-foreground/10 bg-foreground/[0.035]"
          >
            <Container className="grid gap-4 py-8 md:grid-cols-2">
              {projects.map((project, index) => (
                <button
                  key={project.title}
                  type="button"
                  onClick={() => {
                    setActiveIndex(index);
                    setIsGridOpen(false);
                  }}
                  className={cn(
                    "group grid gap-4 border p-4 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:grid-cols-[9rem_1fr]",
                    index === activeIndex
                      ? "border-accent bg-accent text-background"
                      : "border-foreground/10 bg-background/58 hover:border-accent/55",
                  )}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-foreground/8">
                    <Image
                      src={project.thumbnail}
                      alt=""
                      fill
                      sizes="9rem"
                      className="object-cover object-top transition group-hover:scale-105"
                    />
                  </div>
                  <span className="self-center">
                    <span className="block text-xs font-black uppercase tracking-[0.18em] opacity-65">
                      00{index + 1} / {project.category}
                    </span>
                    <span className="mt-2 block font-display text-3xl uppercase leading-none">
                      {project.title}
                    </span>
                  </span>
                </button>
              ))}
            </Container>
          </motion.section>
        ) : null}
      </AnimatePresence>

      <section className="relative overflow-hidden border-b border-foreground/10 py-8">
        <motion.div
          className="flex w-max gap-5 whitespace-nowrap text-[clamp(2rem,6vw,6.5rem)] font-black uppercase leading-none text-foreground/15"
          animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
          transition={reduceMotion ? undefined : { duration: 16, repeat: Infinity, ease: "linear" }}
          aria-hidden="true"
        >
          {[...projectTags, ...projectTags, ...projectTags].map((tag, index) => (
            <span key={`${tag}-${index}`}>{tag} /</span>
          ))}
        </motion.div>
      </section>

      <section className="section-spacing">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
            <div className="sticky top-24">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-sky">
                Capabilities
              </p>
              <h2 className="mt-4 text-[clamp(2.8rem,6vw,6rem)] font-black uppercase leading-[0.86]">
                Built like case studies, shipped like products.
              </h2>
            </div>
            <div className="grid gap-3">
              {activeServices.map((service, index) => (
                <motion.div
                  key={service}
                  initial={{ opacity: 0, x: 32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 0.52, delay: index * 0.05, ease }}
                  className="group flex min-h-24 items-center justify-between gap-5 border border-foreground/10 bg-foreground/[0.035] p-5 transition hover:border-accent hover:bg-accent hover:text-background"
                >
                  <span className="font-display text-3xl uppercase leading-none">
                    {service}
                  </span>
                  <span className="font-display text-5xl text-current/20">0{index + 1}</span>
                </motion.div>
              ))}
              <PremiumButton href="/contact" className="mt-4 w-full sm:w-max">
                Talk about a project
              </PremiumButton>
            </div>
          </div>
        </Container>
      </section>
    </main>
    <ContactSection />
    </>
  );
}
