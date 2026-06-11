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
      <div className="relative mx-auto flex w-full max-w-[90rem] flex-col lg:hidden">
        <Link
          href="/contact"
          className={`${displayLinkClass} text-[clamp(3.65rem,17vw,5.5rem)]`}
        >
          Let&apos;s talk
          <AccentMark />
        </Link>

        <div className="mt-8 h-px w-full bg-foreground/30" />

        <div className="grid min-h-0 gap-0 pb-12 pt-10">
          <div className="flex min-w-0 flex-col items-start">
            <Link
              href="/studio"
              className={`${displayLinkClass} text-[clamp(3.5rem,16vw,5rem)]`}
            >
              Studio
              <AccentMark />
            </Link>

            <div className="mt-9 grid gap-3 text-sm font-semibold leading-6 text-foreground/68">
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

          <div className="mt-14 min-w-0 pl-[30%] sm:pl-[36%]">
            <nav
              aria-label="Mobile footer services"
              className="grid content-center gap-2.5 text-base font-semibold leading-6 text-foreground/76"
            >
              {contactData.services.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="group flex min-h-7 items-center justify-between gap-3 transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
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

          <Link
            href="/services"
            className={`${displayLinkClass} ml-auto mt-14 text-right text-[clamp(3rem,14vw,4.25rem)]`}
          >
            Services
            <AccentMark />
          </Link>
        </div>

        <div className="h-px w-full bg-foreground/30" />

        <div className="flex flex-col pt-10">
          <div>
            <Link
              href="/work"
              className={`${displayLinkClass} text-[clamp(3.5rem,16vw,5rem)]`}
            >
              Work
              <AccentMark />
            </Link>
          </div>

          <form
            action={`mailto:${contactData.email}`}
            method="post"
            encType="text/plain"
            className="mt-14 w-full rounded-2xl bg-foreground/[0.04] p-5 sm:p-6"
          >
            <label
              htmlFor="footer-email-mobile"
              className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground/58"
            >
              Newsletter
            </label>
            <div className="mt-8 flex min-h-12 items-center border-b border-foreground/48">
              <input
                id="footer-email-mobile"
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
                <ArrowRight className="size-4" aria-hidden="true" />
              </button>
            </div>
          </form>

          <p className="mt-12 text-center text-sm font-semibold text-foreground/58">
            &copy; 2026 {contactData.companyName}
          </p>

          <nav
            aria-label="Mobile social links"
            className="mt-10 flex flex-wrap justify-center gap-x-7 gap-y-4 text-sm font-semibold"
          >
            {contactData.socials.map((social) => (
              <a
                key={social.label}
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

      <div className="relative mx-auto hidden h-full w-full max-w-[90rem] grid-rows-[auto_1px_minmax(0,1fr)_1px_auto] lg:grid">
        <Link
          href="/contact"
          className={`${displayLinkClass} mx-auto text-center text-[clamp(5rem,8.2vw,8.5rem)]`}
        >
          Let&apos;s talk
          <AccentMark />
        </Link>

        <div className="mt-4 h-px w-full bg-foreground/30" />

        <div className="grid min-h-0 grid-cols-[0.9fr_0.7fr_1.25fr] items-center gap-8 py-5">
          <div className="flex min-w-0 flex-col items-start">
            <Link
              href="/studio"
              className={`${displayLinkClass} text-[clamp(3.5rem,5.8vw,6rem)]`}
            >
              Studio
              <AccentMark />
            </Link>

            <div className="mt-7 grid gap-3 text-sm font-semibold leading-5 text-foreground/68">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" />
                <span>{contactData.address}</span>
              </div>
              <a
                href={`mailto:${contactData.email}`}
                className="flex items-start gap-3 transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                <Mail className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" />
                <span className="whitespace-nowrap text-sm">{contactData.email}</span>
              </a>
            </div>
          </div>

          <nav
            aria-label="Desktop footer services"
            className="grid content-center gap-1.5 text-xs font-semibold uppercase leading-[1.25] tracking-[0.035em] text-foreground/76"
          >
            {contactData.services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group flex items-center justify-between gap-3 py-1 transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                <span>{service.label}</span>
                <ArrowUpRight
                  className="size-3 shrink-0 opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </nav>

          <div className="flex justify-end">
            <Link
              href="/services"
              className={`${displayLinkClass} text-right text-[clamp(3.25rem,5.2vw,5.8rem)]`}
            >
              Services
              <AccentMark />
            </Link>
          </div>
        </div>

        <div className="mx-auto h-px w-[72%] bg-foreground/30" />

        <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-10 pt-4">
          <form
            action={`mailto:${contactData.email}`}
            method="post"
            encType="text/plain"
            className="w-full max-w-xs"
          >
            <label
              htmlFor="footer-email-desktop"
              className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-foreground/58"
            >
              Newsletter
            </label>
            <div className="mt-2 flex min-h-10 items-center border-b border-foreground/48">
              <input
                id="footer-email-desktop"
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
                <ArrowRight className="size-5" aria-hidden="true" />
              </button>
            </div>
          </form>

          <div className="grid content-end justify-items-center">
            <Link
              href="/work"
              className={`${displayLinkClass} text-[clamp(3.5rem,5.5vw,5.8rem)]`}
            >
              Work
              <AccentMark />
            </Link>
            <p className="mt-3 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-foreground/48">
              &copy; 2026 {contactData.companyName}
            </p>
          </div>

          <nav
            aria-label="Desktop social links"
            className="flex flex-wrap justify-end gap-x-5 gap-y-2 pr-16 text-xs font-semibold"
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
