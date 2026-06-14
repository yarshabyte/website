import { Quote } from "lucide-react";

import { Container } from "@/components/ui/container";
import { testimonials } from "@/data/testimonials";

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="section-spacing relative overflow-hidden border-y border-foreground/10"
    >
      <div
        className="service-grid-surface pointer-events-none absolute inset-0 opacity-20"
        aria-hidden="true"
      />
      <Container className="relative">
        <div className="grid gap-6 lg:grid-cols-[0.38fr_0.62fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">
              Client stories
            </p>
            <h2 className="mt-5 max-w-lg text-[clamp(2.7rem,6vw,5.5rem)] font-black uppercase leading-[0.88]">
              Work that earns trust.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-foreground/62 lg:justify-self-end">
            Clear collaboration, useful design, and digital work built to help
            real people move forward.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <figure
              key={testimonial.name}
              className="flex min-h-72 flex-col border border-foreground/10 bg-background/80 p-6 backdrop-blur-sm sm:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <Quote className="size-7 text-accent" aria-hidden="true" />
                <span className="font-display text-4xl text-foreground/12">
                  0{index + 1}
                </span>
              </div>
              <blockquote className="mt-8 text-lg font-medium leading-8 text-foreground/78">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-auto border-t border-foreground/10 pt-6">
                <p className="text-sm font-black uppercase">
                  {testimonial.name}
                </p>
                <p className="mt-1 text-xs leading-5 text-foreground/50">
                  {testimonial.role} &middot; {testimonial.project}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
