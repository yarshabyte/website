import Link from "next/link";
import { ArrowRight, ArrowUpRight, Mail, MapPin } from "lucide-react";

import { services } from "@/data/services";
import { socialLinks } from "@/data/socials";

const contactData = {
  companyName: "Yarsa Byte",
  address: "Butwal, Nepal",
  email: "yarsabyte@gmail.com",
  services: services.map((service) => ({
    label: service.title,
    href: `/contact?service=${encodeURIComponent(service.slug)}`,
  })),
  socials: socialLinks,
} as const;

function AccentMark() {
  return (
    <span
      className="ml-[0.08em] inline-block size-[0.15em] min-h-3 min-w-3 translate-y-[0.02em] bg-accent [clip-path:polygon(25%_6%,75%_6%,100%_50%,75%_94%,25%_94%,0_50%)]"
      aria-hidden="true"
    />
  );
}

const displayLinkClass =
  "group inline-flex w-fit items-baseline font-display uppercase leading-[0.82] tracking-[-0.055em] transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-accent";

export function ContactSection() {
  return (
    <footer
      id="contact"
      className="fluid-section relative min-h-dvh overflow-hidden bg-background text-foreground lg:min-h-[calc(100vh-1.5rem)] lg:py-10"
    >
      <div className="pointer-events-none absolute -right-36 -top-40 size-[31rem] rounded-full border border-foreground/8" />
      <div className="pointer-events-none absolute -bottom-52 -left-40 size-[32rem] rounded-full border border-foreground/8" />

      <div className="relative mx-auto flex min-h-[calc(100dvh-9rem)] w-full max-w-[90rem] flex-col lg:min-h-[calc(100vh-6rem)]">
        <Link
          href="/contact"
          className={`${displayLinkClass} mx-auto text-center text-[clamp(4rem,11vw,10.5rem)]`}
        >
          Let&apos;s talk
          <AccentMark />
        </Link>

        <div className="mt-8 h-px w-full bg-foreground/35 lg:mt-10" />

        <div className="grid flex-1 gap-12 py-10 lg:grid-cols-[0.95fr_0.65fr_1.4fr] lg:items-center lg:gap-8 lg:py-8">
          <div className="flex flex-col items-start">
            <Link
              href="/studio"
              className={`${displayLinkClass} text-[clamp(3.8rem,8vw,8.5rem)]`}
            >
              Studio
              <AccentMark />
            </Link>

            <div className="mt-8 grid gap-5 text-sm font-semibold leading-6 text-foreground/68 lg:mt-12">
              <div className="flex items-start gap-3">
                <MapPin
                  className="mt-1 size-4 shrink-0 text-accent"
                  aria-hidden="true"
                />
                <span>{contactData.address}</span>
              </div>
              <a
                href={`mailto:${contactData.email}`}
                className="flex items-start gap-3 transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                <Mail
                  className="mt-1 size-4 shrink-0 text-accent"
                  aria-hidden="true"
                />
                <span>{contactData.email}</span>
              </a>
            </div>
          </div>

          <nav
            aria-label="Footer services"
            className="grid content-center gap-2 border-y border-foreground/14 py-8 text-sm font-semibold uppercase tracking-[0.035em] text-foreground/76 lg:border-y-0 lg:py-0"
          >
            {contactData.services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group flex items-center justify-between gap-5 py-1.5 transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                <span>{service.label}</span>
                <ArrowUpRight
                  className="size-3.5 shrink-0 opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </nav>

          <div className="flex justify-start lg:justify-end">
            <Link
              href="/services"
              className={`${displayLinkClass} text-[clamp(3.4rem,6.3vw,7.5rem)] lg:text-right`}
            >
              Services
              <AccentMark />
            </Link>
          </div>
        </div>

        <div className="mx-auto h-px w-full bg-foreground/35 lg:w-[62%]" />

        <div className="grid gap-10 pt-9 lg:grid-cols-[1fr_auto_1fr] lg:items-end lg:gap-12">
          <form
            action={`mailto:${contactData.email}`}
            method="post"
            encType="text/plain"
            className="w-full max-w-sm"
          >
            <label
              htmlFor="footer-email"
              className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/58"
            >
              Newsletter
            </label>
            <div className="mt-5 flex min-h-12 items-center border-b border-foreground/58">
              <input
                id="footer-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Your email"
                className="min-w-0 flex-1 bg-transparent py-3 text-base text-foreground outline-none placeholder:text-foreground/42"
              />
              <button
                type="submit"
                aria-label="Send newsletter email"
                className="grid size-11 shrink-0 place-items-center transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <ArrowRight className="size-5" aria-hidden="true" />
              </button>
            </div>
          </form>

          <div className="grid justify-items-start lg:justify-items-center">
            <Link
              href="/work"
              className={`${displayLinkClass} text-[clamp(3.8rem,7.5vw,8rem)]`}
            >
              Work
              <AccentMark />
            </Link>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.12em] text-foreground/48">
              &copy; 2026 {contactData.companyName}
            </p>
          </div>

          <nav
            aria-label="Social links"
            className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold lg:justify-end lg:pr-20"
          >
            {contactData.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {social.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
