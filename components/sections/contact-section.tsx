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
      className="relative min-h-dvh overflow-hidden bg-background px-5 pb-10 pt-[calc(var(--header-height)+1.5rem)] text-foreground sm:px-8 lg:h-[calc(100vh-1.5rem)] lg:min-h-0 lg:px-[var(--site-gutter)] lg:pb-8 lg:pt-8"
    >
      <div className="relative mx-auto flex w-full max-w-[90rem] flex-col lg:grid lg:h-full lg:grid-rows-[auto_1px_minmax(0,1fr)_1px_auto]">
        <Link
          href="/contact"
          className={`${displayLinkClass} text-[clamp(3.65rem,17vw,5.5rem)] lg:mx-auto lg:text-center lg:text-[clamp(5rem,8.2vw,8.5rem)]`}
        >
          Let&apos;s talk
          <AccentMark />
        </Link>

        <div className="mt-8 h-px w-full bg-foreground/30 lg:mt-4" />

        <div className="grid min-h-0 gap-0 pb-12 pt-10 lg:grid-cols-[0.9fr_0.7fr_1.25fr] lg:items-center lg:gap-8 lg:py-5">
          <div className="flex min-w-0 flex-col items-start">
            <Link
              href="/studio"
              className={`${displayLinkClass} text-[clamp(3.5rem,16vw,5rem)] lg:text-[clamp(3.5rem,5.8vw,6rem)]`}
            >
              Studio
              <AccentMark />
            </Link>

            <div className="mt-9 grid gap-3 text-sm font-semibold leading-6 text-foreground/68 lg:mt-7 lg:text-sm">
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
                <span className="text-sm">
                  {contactData.email}
                </span>
              </a>
            </div>
          </div>

          <div className="mt-14 min-w-0 pl-[30%] sm:pl-[36%] lg:mt-0 lg:pl-0">
            <nav
              aria-label="Footer services"
              className="grid content-center gap-2.5 text-base font-semibold leading-6 text-foreground/76 lg:gap-1.5 lg:text-xs lg:uppercase lg:leading-[1.25] lg:tracking-[0.035em]"
            >
              {contactData.services.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="group flex min-h-7 items-center justify-between gap-3 transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent lg:min-h-0 lg:py-1"
                >
                  <span>{service.label}</span>
                  <ArrowUpRight
                    className="size-3 shrink-0 opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </nav>

            <Link
              href="/services"
              className={`${displayLinkClass} mt-14 text-[clamp(3.5rem,16vw,5rem)] lg:hidden`}
            >
              Services
              <AccentMark />
            </Link>
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

        <div className="flex flex-col pt-10 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-end lg:gap-10 lg:pt-4">
          <div className="order-1 lg:order-2 lg:grid lg:content-end lg:justify-items-center">
            <Link
              href="/work"
              className={`${displayLinkClass} text-[clamp(3.5rem,16vw,5rem)] lg:text-[clamp(3.5rem,5.5vw,5.8rem)]`}
            >
              Work
              <AccentMark />
            </Link>
            <p className="mt-3 hidden text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-foreground/48 lg:block">
              &copy; 2026 {contactData.companyName}
            </p>
          </div>

          <form
            action={`mailto:${contactData.email}`}
            method="post"
            encType="text/plain"
            className="order-2 mt-14 w-full rounded-2xl bg-foreground/[0.04] p-5 sm:p-6 lg:order-1 lg:mt-0 lg:max-w-xs lg:rounded-none lg:bg-transparent lg:p-0"
          >
            <label
              htmlFor="footer-email"
              className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground/58 lg:text-[0.68rem] lg:tracking-[0.18em]"
            >
              Newsletter
            </label>
            <div className="mt-8 flex min-h-12 items-center border-b border-foreground/48 lg:mt-2 lg:min-h-10">
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

          <nav
            aria-label="Desktop social links"
            className="hidden content-end flex-wrap justify-end gap-x-5 gap-y-2 pr-16 text-xs font-semibold lg:flex"
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

          <p className="order-3 mt-12 text-center text-sm font-semibold text-foreground/58 lg:hidden">
            &copy; 2026 {contactData.companyName}
          </p>

          <nav
            aria-label="Social links"
            className="order-4 mt-10 flex flex-wrap justify-center gap-x-7 gap-y-4 text-sm font-semibold lg:hidden"
          >
            {contactData.socials.map((social) => (
              <a
                key={`mobile-${social.label}`}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="min-h-7 transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
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
