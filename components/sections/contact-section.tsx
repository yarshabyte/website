import {
  ArrowRight,
  ArrowUpRight,
  Mail,
  MapPin,
} from "lucide-react";
import Link from "next/link";

import { services } from "@/data/services";
import { socialLinks } from "@/data/socials";

const pageLinks = [
  { label: "Studio", href: "/studio" },
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
] as const;

const smallLabelClass =
  "text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-background/45";

const footerLinkClass =
  "w-fit transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

function SocialIcon({
  label,
}: {
  label: (typeof socialLinks)[number]["label"];
}) {
  if (label === "Instagram") {
    return (
      <svg viewBox="0 0 30 30" className="size-[0.75rem]" aria-hidden="true">
        <rect x="2.5" y="2.5" width="16" height="16" rx="4" fill="none" stroke="currentColor" strokeWidth="1.75" />
        <circle cx="10" cy="10" r="3" fill="none" stroke="currentColor" strokeWidth="1.75" />
        <circle cx="17.4" cy="6.7" r="1.1" fill="currentColor" />
      </svg>
    );
  }

  if (label === "LinkedIn") {
    return (
      <svg viewBox="0 0 24 24" className="size-[0.75rem]" aria-hidden="true">
        <path fill="currentColor" d="M5.3 8.5H2.2V21h3.1V8.5ZM3.8 3A1.8 1.8 0 1 0 3.8 6.6 1.8 1.8 0 0 0 3.8 3ZM21.8 13.8c0-3.8-2-5.6-4.7-5.6-2.2 0-3.1 1.2-3.7 2V8.5h-3.1V21h3.1v-6.2c0-1.6.3-3.2 2.3-3.2 2 0 2 1.8 2 3.3V21h3.1l1-7.2Z" />
      </svg>
    );
  }

  if (label === "Facebook") {
    return (
      <svg viewBox="0 0 24 24" className="size-[0.75rem]" aria-hidden="true">
        <path fill="currentColor" d="M14.2 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H8V13h2.8v8h3.4Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="size-[0.75rem]" aria-hidden="true">
      <path fill="currentColor" d="M16.7 3c.4 2.2 1.7 3.5 3.8 3.7v3.1a8.7 8.7 0 0 1-3.8-1.1v5.7a6.6 6.6 0 1 1-5.7-6.5v3.2a3.5 3.5 0 1 0 2.5 3.3V3h3.2Z" />
    </svg>
  );
}

export function ContactSection() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-foreground text-background"
    >
      <div
        className="service-grid-surface pointer-events-none absolute inset-0 opacity-[0.035]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 top-0 size-80 rounded-full bg-accent/20 blur-[100px] sm:size-[30rem]"
        aria-hidden="true"
      />

      <div className="studio-container relative py-10 sm:py-12 lg:py-14">
        <div className="grid gap-6 border-b border-background/15 pb-9 sm:pb-11 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="flex items-center gap-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-background/55">
              <span className="size-1.5 rounded-full bg-accent" />
              Available for new projects
            </p>
            <h2 className="mt-5 max-w-4xl font-display text-[clamp(2.5rem,5.5vw,5.25rem)] uppercase leading-[0.88] tracking-[-0.04em]">
              Bring your
              <br />
              ideas to life
            </h2>
          </div>

          <Link
            href="/contact"
            aria-label="Start a project"
            className="group grid size-14 shrink-0 place-items-center rounded-full bg-accent text-foreground transition duration-300 hover:rotate-[-8deg] hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-background sm:size-16"
          >
            <ArrowUpRight
              className="size-6 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:size-7"
              aria-hidden="true"
            />
          </Link>
        </div>

        <div className="grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-[1.25fr_0.65fr_1.25fr_0.85fr] lg:gap-8 lg:py-12">
          <section>
            <p className={smallLabelClass}>Yarsa Byte</p>
            <p className="mt-4 max-w-sm text-base leading-7 text-background/68">
              Digital experiences, visual identities, and launch support for
              ambitious businesses in Nepal and beyond.
            </p>
            <div className="mt-6 grid gap-2.5 text-sm text-background/65">
              <a
                href="mailto:yarsabyte@gmail.com"
                className={`${footerLinkClass} inline-flex items-center gap-3`}
              >
                <Mail className="size-4 text-accent" aria-hidden="true" />
                yarsabyte@gmail.com
              </a>
              <span className="inline-flex items-center gap-3">
                <MapPin className="size-4 text-accent" aria-hidden="true" />
                Butwal, Nepal
              </span>
            </div>
          </section>

          <nav aria-label="Footer navigation">
            <p className={smallLabelClass}>Explore</p>
            <div className="mt-4 grid gap-2.5">
              {pageLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${footerLinkClass} text-sm font-semibold`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          <nav aria-label="Footer services">
            <p className={smallLabelClass}>Services</p>
            <div className="mt-4 grid gap-x-5 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/contact?service=${encodeURIComponent(service.slug)}`}
                  className={`${footerLinkClass} group inline-flex items-start gap-2 text-sm leading-6 text-background/68`}
                >
                  <span>{service.title}</span>
                  <ArrowUpRight
                    className="mt-1 size-3 shrink-0 opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </nav>

          <section>
            <p className={smallLabelClass}>Follow</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {socialLinks.map((social) => {
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    title={social.label}
                    className="group grid size-9 place-items-center rounded-full border border-background/15 text-background/70 transition duration-300 hover:border-accent hover:bg-accent hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    <span className="transition-transform duration-300 group-hover:scale-110">
                      <SocialIcon label={social.label} />
                    </span>
                  </a>
                );
              })}
            </div>

            <Link
              href="/contact"
              className="group mt-6 inline-flex min-h-10 items-center gap-2.5 rounded-full border border-background/15 px-4 text-xs font-semibold transition hover:border-background/35 hover:bg-background hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              Start a project
              <ArrowRight
                className="size-3.5 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </section>
        </div>

        <div className="flex flex-col gap-4 border-t border-background/15 pt-6 text-xs font-medium text-background/42 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Yarsa Byte. All rights reserved.</p>
          <p>Designed and built in Nepal.</p>
        </div>
      </div>
    </footer>
  );
}
