"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

import { projects, projectsIntro } from "@/data/projects";

const revealEase = [0.22, 1, 0.36, 1] as const;

export function WorkSection() {
  return (
    <section
      id="work"
      className="fluid-section relative min-h-screen overflow-hidden bg-transparent lg:min-h-[calc(100vh-1.5rem)]"
    >
      <div className="mx-auto flex min-h-[calc(100vh-9rem)] w-full max-w-[90rem] flex-col lg:min-h-[calc(100vh-5rem)]">
        <div className="hidden min-h-[12vh] lg:block" aria-hidden="true" />

        <div className="grid gap-[var(--space-stack)] pb-10 pt-10 lg:grid-cols-[0.46fr_0.54fr] lg:items-start lg:pb-0 lg:pt-6">
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: 0.72, ease: revealEase }}
            className="lg:pt-6"
          >
            <div className="flex items-center gap-3">
              <span className="grid size-4 place-items-center rounded-full border border-foreground/20">
                <span className="size-1.5 rounded-full bg-accent" />
              </span>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-foreground/90">
                {projectsIntro.eyebrow}
              </p>
            </div>

            <h2 className="mt-14 max-w-[35rem] text-[clamp(4.4rem,7vw,11rem)] font-normal uppercase leading-[0.9] tracking-normal text-foreground">
              Recent
              <br />
              Works
              <span className="ml-4 inline-block size-3 translate-y-[-0.3em] rounded-sm bg-accent sm:size-4" />
            </h2>
            <p className="mt-8 max-w-md text-base leading-7 text-foreground/68">
              {projectsIntro.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: 0.82, delay: 0.08, ease: revealEase }}
            className="grid gap-5 lg:gap-6"
          >
            {projects.map((project, index) => (
              <article
                key={project.href}
                className="brand-preview-surface group relative overflow-hidden rounded-2xl border border-foreground/10 shadow-[0_22px_70px_rgba(0,0,0,0.18)]"
              >
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="relative block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  <div
                    className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden bg-foreground/5 transition-[clip-path,filter] duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] [clip-path:inset(0_52%_0_0)] group-hover:[clip-path:inset(0_0_0_0)] sm:block"
                  >
                    <Image
                      src={project.thumbnail}
                      alt={`${project.title} landing page thumbnail`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 48vw, 52vw"
                      className="object-cover object-top transition duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-background/42 via-background/14 to-background/78 transition duration-[850ms] group-hover:from-background/20 group-hover:via-background/10 group-hover:to-background/46" />
                  </div>

                  <div className="relative z-0 min-h-[15rem] overflow-hidden bg-foreground/5 sm:hidden">
                    <Image
                      src={project.thumbnail}
                      alt={`${project.title} landing page thumbnail`}
                      fill
                      sizes="100vw"
                      className="object-cover object-top transition duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/82 via-background/10 to-transparent" />
                  </div>

                  <div className="relative z-10 flex min-h-[18rem] flex-col justify-between p-6 transition duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:ml-[48%] sm:min-h-[21rem] sm:w-[52%] sm:bg-[color-mix(in_srgb,var(--background)_84%,var(--accent)_16%)] sm:p-8 group-hover:translate-x-1 group-hover:bg-transparent group-hover:opacity-0">
                    <div className="flex items-center justify-between gap-4 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-foreground/68">
                      <span>{project.category}</span>
                      <span>{project.year}</span>
                    </div>

                    <div className="py-8">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                        {project.label}
                      </p>
                      <h3 className="mt-3 max-w-xl text-3xl font-normal uppercase leading-[0.95] text-foreground sm:text-5xl">
                        {project.title}
                      </h3>
                      <p className="mt-4 max-w-lg text-sm leading-6 text-foreground/72">
                        {project.summary}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
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
                  0{index + 1}
                </span>
              </article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
