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

const ease = [0.22, 1, 0.36, 1] as const;

const rise: Variants = {
  hidden: { opacity: 0, y: 34, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.72, ease },
  },
};

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
      className="relative mx-auto aspect-square w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] lg:w-[480px] xl:w-[540px]"
      initial={{ opacity: 0, scale: 0.86, rotate: -8 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.9, delay: 0.2, ease }}
      aria-hidden="true"
    >
      <motion.div
        className={`absolute inset-0 rounded-full border border-foreground/12 ${!isVisible || reduceMotion ? 'animate-none' : ''}`}
        animate={!isVisible || reduceMotion ? undefined : { rotate: 360 }}
        transition={!isVisible || reduceMotion ? undefined : { duration: 26, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className={`absolute inset-[10%] rounded-full border border-dashed border-accent/36 ${!isVisible || reduceMotion ? 'animate-none' : ''}`}
        animate={!isVisible || reduceMotion ? undefined : { rotate: -360 }}
        transition={!isVisible || reduceMotion ? undefined : { duration: 18, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-[22%] grid place-items-center rounded-full border border-foreground/10 bg-foreground/[0.045]">
        <Image
          src="/logo-icon.png"
          alt=""
          width={160}
          height={160}
          className="h-20 w-20 rounded bg-white object-contain p-2 sm:h-24 sm:w-24 md:h-28 md:w-28"
          priority
        />
      </div>
      {["Design", "Build", "Motion", "Launch"].map((label, index) => (
        <motion.span
          key={label}
          className={`absolute grid place-items-center rounded-full border border-foreground/10 bg-background/86 font-black uppercase tracking-[0.16em] text-foreground shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-sm ${!isVisible || reduceMotion ? 'animate-none' : ''
            } h-12 w-20 text-[10px] sm:h-14 sm:w-24 sm:text-[11px] md:h-16 md:w-28 md:text-xs`}
          style={{
            left: index % 2 === 0 ? "0%" : "auto",
            right: index % 2 === 0 ? "auto" : "0%",
            top: index < 2 ? "11%" : "auto",
            bottom: index < 2 ? "auto" : "11%",
          }}
          animate={!isVisible || reduceMotion ? undefined : { y: [0, -12, 0] }}
          transition={
            !isVisible || reduceMotion
              ? undefined
              : { duration: 3.5, delay: index * 0.25, repeat: Infinity, ease: "easeInOut" }
          }
        >
          {label}
        </motion.span>
      ))}
    </motion.div>
  );
}

export function StudioPageClient() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="overflow-hidden">
      <section className="relative min-h-dvh overflow-hidden border-b border-foreground/10">
        <div className="absolute inset-0 -z-0 opacity-40" aria-hidden="true">
          <motion.div
            className="absolute left-1/2 top-1/2 h-[80vmax] w-[80vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-accent/15 via-transparent to-accent/5 blur-3xl"
            animate={reduceMotion ? undefined : { scale: [1, 1.2, 1], rotate: [0, 90, 0], }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          {!reduceMotion && (
            <div className="absolute inset-0">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-1 w-1 rounded-full bg-accent/30"
                  initial={{
                    x: `${Math.random() * 100}%`,
                    y: `${Math.random() * 100}%`,
                    opacity: 0.2,
                  }}
                  animate={{
                    y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                    opacity: [0.2, 0.6, 0.2],
                  }}
                  transition={{
                    duration: 8 + Math.random() * 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          )}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>

        <Container className="relative z-10 grid min-h-[calc(100dvh-7rem)] content-end gap-12 pb-12 lg:grid-cols-[0.62fr_0.38fr] lg:items-end">
          <div>
            <h1 className="mt-8 max-w-[14ch] text-[clamp(2.8rem,9vw,6rem)] font-black uppercase leading-[0.84] text-foreground transform-gpu sm:text-[clamp(3.2rem,10vw,8rem)] lg:text-[clamp(3.6rem,10.8vw,10.5rem)]">
              <SplitWords text="Minds mettle magic" />
              <HexGlyph className="ml-[0.08em] inline-block size-[0.14em] min-h-3 min-w-3 translate-y-[-0.04em] sm:size-[0.16em]" />
            </h1>

            <div className="mt-9 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
              {studioStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.35 + index * 0.06, ease }}
                  className="border border-foreground/10 bg-foreground/[0.035] p-3 transition hover:border-accent/30 hover:bg-foreground/[0.05] sm:p-4"
                >
                  <p className="font-display text-2xl uppercase leading-none text-accent sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[11px] font-bold uppercase leading-5 tracking-[0.14em] text-foreground/58 sm:mt-2 sm:text-xs">
                    {stat.label}
                  </p>
                </motion.div>
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
