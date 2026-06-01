"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Pencil } from "lucide-react";

import { HeroCanvasShell } from "@/components/hero/hero-canvas-shell";
import { heroLatestProject, heroMission } from "@/data/hero";

const ease = [0.22, 1, 0.36, 1] as const;

const fade = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease },
  },
};

const heroDisplay =
  "font-helvetica-bold text-[clamp(3.5rem,15.2vw,14.65rem)] uppercase leading-[0.8] tracking-normal";

const mobileHeroDisplay =
  "font-helvetica-bold text-[clamp(4.15rem,18vw,5.35rem)] uppercase leading-[0.82] tracking-normal";

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-transparent pt-20 sm:min-h-screen sm:pt-[4.5rem]">
      <HeroCanvasShell />

      <div className="studio-container relative z-10 flex min-h-[calc(100svh-5rem)] flex-col pb-20 sm:min-h-[calc(100vh-4.5rem)] sm:pb-24">
        <div className="relative z-20 flex flex-1 flex-col justify-end pb-6 pt-[44vh] sm:block sm:pb-0 sm:pt-0 lg:ml-auto lg:w-full lg:max-w-[88%]">
          <motion.h1
            className="pointer-events-none relative z-20 block sm:hidden"
            aria-label="Portfoo"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
          >
            <motion.span
              className={`block text-left text-accent ${mobileHeroDisplay}`}
              variants={fade}
            >
              Yarsa
            </motion.span>
            <motion.span
              className={`block text-left text-foreground ${mobileHeroDisplay}`}
              variants={fade}
            >
              Byte
            </motion.span>
          </motion.h1>

          <motion.h1
            className="pointer-events-none relative z-20 hidden pt-6 text-right sm:block lg:pt-10"
            aria-label="Portfoo"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            <motion.span
              className={`relative z-20 block text-accent ${heroDisplay}`}
              variants={fade}
            >
              Yarsa
            </motion.span>
            <motion.span
              className={`relative z-20 block text-foreground ${heroDisplay}`}
              variants={fade}
            >
              Byte
            </motion.span>
          </motion.h1>

          <motion.div
            className="pointer-events-auto relative z-10 mt-7 flex justify-start sm:mt-12 sm:justify-end lg:mt-14"
            variants={fade}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <Link
              href={heroLatestProject.href}
              className="group flex min-h-[4.4rem] w-full max-w-full items-center justify-between gap-4 rounded-md border border-foreground/14 bg-background/50 px-5 py-4 transition hover:border-foreground/25 sm:min-h-0 sm:w-fit sm:justify-start sm:rounded-none sm:bg-background sm:px-5 sm:py-3"
            >
              <span className="shrink-0 text-[0.82rem] font-semibold uppercase tracking-[0.08em] text-foreground sm:text-[0.62rem] sm:tracking-[0.28em] sm:text-foreground/50">
                {heroLatestProject.label}
              </span>
              
              <span
                className="text-foreground/50 sm:inline"
                aria-hidden="true"
              >
                -&gt;
              </span>
              <span className="hidden truncate text-xs font-bold uppercase tracking-[0.12em] text-foreground sm:inline sm:text-sm">
                {heroLatestProject.title}
              </span>
            </Link>
          </motion.div>
        </div>

        <motion.p
          className="relative z-10 mt-auto hidden max-w-md self-end text-right text-[0.58rem] font-medium uppercase leading-[1.9] tracking-[0.18em] text-foreground/45 lg:block lg:text-[0.62rem]"
          variants={fade}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.35 }}
        >
          {heroMission}
        </motion.p>
      </div>

      <motion.a
        href="#contact"
        className="fixed bottom-4 right-4 z-40 grid size-14 place-items-center rounded-full bg-accent text-foreground shadow-none transition hover:scale-105 sm:bottom-6 sm:right-6 sm:size-12 lg:bottom-8 lg:right-[calc((100vw-var(--site-content-width))/2)] lg:size-14"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        aria-label="Start a project"
      >
        <Pencil className="size-5 lg:size-6" />
      </motion.a>
    </section>
  );
}
