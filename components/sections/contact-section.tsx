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
      className="relative h-dvh overflow-hidden bg-background px-4 pb-4 pt-[calc(var(--header-height)+0.25rem)] text-foreground sm:px-8 sm:pb-6 lg:h-[calc(100vh-1.5rem)] lg:px-[var(--site-gutter)] lg:pb-8 lg:pt-8"
    >
      <div className="relative mx-auto grid h-full w-full max-w-[90rem] grid-rows-[auto_1px_minmax(0,1fr)_1px_auto]">
        <Link
          href="/contact"
          className={`${displayLinkClass} mx-auto text-center text-[clamp(3rem,14vw,4.75rem)] lg:text-[clamp(5rem,8.2vw,8.5rem)]`}
        >
          Let&apos;s talk
          <AccentMark />
        </Link>

        <div className="mt-3 h-px w-full bg-foreground/30 lg:mt-4" />

        <div className="grid min-h-0 grid-cols-[1.05fr_0.95fr] items-center gap-5 py-4 sm:gap-8 lg:grid-cols-[0.9fr_0.7fr_1.25fr] lg:gap-8 lg:py-5">
          <div className="flex min-w-0 flex-col items-start">
            <Link
              href="/studio"
              className={`${displayLinkClass} text-[clamp(2.25rem,11vw,3.5rem)] lg:text-[clamp(3.5rem,5.8vw,6rem)]`}
            >
              Studio
              <AccentMark />
            </Link>

            <div className="mt-4 grid gap-2.5 text-[0.7rem] font-semibold leading-5 text-foreground/68 sm:text-xs lg:mt-7 lg:gap-3 lg:text-sm">
              <div className="flex items-start gap-3">
                <MapPin
                  className="mt-1 size-3.5 shrink-0 text-accent lg:size-4"
                  aria-hidden="true"
                />
                <span>{contactData.address}</span>
              </div>
              <a
                href={`mailto:${contactData.email}`}
                className="flex items-start gap-3 transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                <Mail
                  className="mt-1 size-3.5 shrink-0 text-accent lg:size-4"
                  aria-hidden="true"
                />
                <span className="whitespace-nowrap text-[0.62rem] sm:text-xs lg:text-sm">
                  {contactData.email}
                </span>
              </a>
            </div>
          </div>

          <div className="min-w-0 border-l border-foreground/14 pl-4 sm:pl-6 lg:border-l-0 lg:pl-0">
            <Link
              href="/services"
              className={`${displayLinkClass} mb-3 text-[clamp(1.3rem,6vw,2rem)] lg:hidden`}
            >
              Services
              <AccentMark />
            </Link>

            <nav
              aria-label="Footer services"
              className="grid content-center gap-1 text-[0.62rem] font-semibold uppercase leading-[1.25] tracking-[0.035em] text-foreground/76 sm:text-[0.7rem] lg:gap-1.5 lg:text-xs"
            >
              {contactData.services.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="group flex min-h-6 items-center justify-between gap-3 transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent lg:min-h-0 lg:py-1"
                >
                  <span>{service.label}</span>
                  <ArrowUpRight
                    className="size-3 shrink-0 opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </nav>
          </div>

          <div className="hidden justify-end lg:flex">
            <Link
              href="/services"
              className={`${displayLinkClass} text-right text-[clamp(3.25rem,5.2vw,5.8rem)]`}
            >
              Services
              <AccentMark />
            </Link>
          </div>
        </div>

        <div className="h-px w-full bg-foreground/30 lg:mx-auto lg:w-[72%]" />

        <div className="grid grid-cols-[1.1fr_0.9fr] gap-x-5 gap-y-3 pt-3 sm:gap-x-8 lg:grid-cols-[1fr_auto_1fr] lg:items-end lg:gap-10 lg:pt-4">
          <form
            action={`mailto:${contactData.email}`}
            method="post"
            encType="text/plain"
            className="col-span-2 w-full lg:col-span-1 lg:max-w-xs"
          >
            <label
              htmlFor="footer-email"
              className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-foreground/58 lg:text-[0.68rem]"
            >
              Newsletter
            </label>
            <div className="mt-1 flex min-h-10 items-center border-b border-foreground/48 lg:mt-2">
              <input
                id="footer-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Your email"
                className="min-w-0 flex-1 bg-transparent py-2 text-base text-foreground outline-none placeholder:text-foreground/42"
              />
              <button
                type="submit"
                aria-label="Send newsletter email"
                className="grid size-11 shrink-0 place-items-center transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <ArrowRight className="size-4 lg:size-5" aria-hidden="true" />
              </button>
            </div>
          </form>

          <div className="grid content-end justify-items-start lg:justify-items-center">
            <Link
              href="/work"
              className={`${displayLinkClass} text-[clamp(2.35rem,11vw,3.5rem)] lg:text-[clamp(3.5rem,5.5vw,5.8rem)]`}
            >
              Work
              <AccentMark />
            </Link>
            <p className="mt-2 text-[0.55rem] font-semibold uppercase tracking-[0.1em] text-foreground/48 lg:mt-3 lg:text-[0.65rem]">
              &copy; 2026 {contactData.companyName}
            </p>
          </div>

          <nav
            aria-label="Social links"
            className="grid content-end justify-items-start gap-y-0.5 text-[0.62rem] font-semibold sm:grid-cols-2 sm:gap-x-4 sm:gap-y-1 sm:text-[0.68rem] lg:flex lg:flex-wrap lg:justify-end lg:gap-x-5 lg:gap-y-2 lg:pr-16 lg:text-xs"
          >
            {contactData.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="min-h-6 transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent lg:min-h-0"
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
