import Image from "next/image";
import { ArrowUpRight, Quote, Star } from "lucide-react";

import { Container } from "@/components/ui/container";
import { testimonials } from "@/data/testimonials";

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="section-spacing relative overflow-hidden border-y border-foreground/10 bg-background/50"
    >
      {/* Decorative background glow for depth */}
      <div
        className="absolute left-1/2 top-0 -z-10 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 opacity-50 blur-[100px]"
        aria-hidden="true"
      />

      <div
        className="service-grid-surface pointer-events-none absolute inset-0 opacity-20"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="grid gap-8 lg:grid-cols-[0.4fr_0.6fr] lg:items-end">
          <div className="flex flex-col items-start">
            {/* Pill-shaped badge for the section label */}
            <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-accent">
              Client stories
            </span>
            <h2 className="mt-6 max-w-lg text-[clamp(2.5rem,6vw,5.5rem)] font-black uppercase leading-[0.9] tracking-tight text-foreground">
              Work that{" "}
              <span className="bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
                earns trust.
              </span>
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-relaxed text-foreground/70 lg:justify-self-end lg:pb-2">
            Clear collaboration, useful design, and digital work built to help
            real people move forward. Here is what they have to say.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:mt-16">
          {testimonials.map((testimonial, index) => (
            <a
              key={testimonial.name}
              href={testimonial.href}
              target="_blank"
              rel="noreferrer"
              className="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-background/75 shadow-sm backdrop-blur-md transition duration-500 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              aria-label={`Visit ${testimonial.name} website`}
            >
              <div className="relative aspect-[16/8.5] overflow-hidden bg-foreground/5">
                <Image
                  src={testimonial.thumbnail}
                  alt={`${testimonial.name} website preview`}
                  fill
                  sizes="(max-width: 639px) 100vw, 50vw"
                  className="object-cover object-top transition duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 rounded-full bg-background/90 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-foreground backdrop-blur">
                  Live website
                </span>
                <span className="absolute bottom-4 right-4 grid size-10 place-items-center rounded-full bg-accent text-foreground transition group-hover:scale-105">
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </span>
              </div>

              <div className="relative p-5 sm:p-6">
                {/* Subtle gradient overlay on hover */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-accent/0 to-accent/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative flex items-start justify-between gap-4">
                  <div className="rounded-full bg-accent/10 p-2.5 text-accent transition-colors duration-500 group-hover:bg-accent group-hover:text-background">
                    <Quote className="size-5" aria-hidden="true" fill="currentColor" />
                  </div>
                  <span className="font-display text-4xl font-bold text-foreground/5 transition-colors duration-500 group-hover:text-accent/10">
                    0{index + 1}
                  </span>
                </div>

                {/* 5-Star visual anchor */}
                <div className="relative mt-4 flex gap-1">
                  {[...Array(5)].map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      className="size-3.5 fill-accent/50 text-accent/50"
                    />
                  ))}
                </div>

                <blockquote className="relative mt-4 text-base leading-7 text-foreground/80">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                <div className="relative mt-6 border-t border-foreground/10 pt-5">
                  <p className="text-base font-bold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground/60">
                    {testimonial.role}
                    <span className="mx-1 text-accent">&middot;</span>
                    {testimonial.project}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
