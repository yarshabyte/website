import type { SVGProps } from "react";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";

import { socialLinks } from "@/data/socials";

const navigationLinks = [
  { label: "Studio", href: "/studio" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
] as const;

const serviceLinks = [
  "Websites",
  "Portfolios",
  "Brand identity",
  "Posters & graphics",
  "Video & reels",
] as const;

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6.5 8.3H3.2V21h3.3V8.3ZM4.85 3A1.93 1.93 0 1 0 4.85 6.86 1.93 1.93 0 0 0 4.85 3ZM21 13.72c0-3.83-2.04-5.61-4.77-5.61-2.2 0-3.18 1.21-3.73 2.06V8.3H9.2V21h3.3v-6.29c0-1.66.31-3.27 2.37-3.27 2.03 0 2.06 1.9 2.06 3.38V21H21v-7.28Z" />
    </svg>
  );
}

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.65 21v-8h2.69l.4-3.12h-3.09v-2c0-.9.25-1.52 1.55-1.52h1.66V3.57a22.3 22.3 0 0 0-2.42-.12c-2.4 0-4.04 1.46-4.04 4.15v2.28H7.7V13h2.7v8h3.25Z" />
    </svg>
  );
}

function TikTokIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M14.5 3c.35 2.05 1.5 3.28 3.5 3.75v3.18a7.7 7.7 0 0 1-3.47-.85v6.08A5.86 5.86 0 1 1 9.47 9.35v3.22a2.72 2.72 0 1 0 1.87 2.59V3h3.16Z" />
    </svg>
  );
}

const socialIcons = {
  LinkedIn: LinkedinIcon,
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
  TikTok: TikTokIcon,
} as const;

export function ContactSection() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-foreground text-background"
    >
      <div
        className="pointer-events-none absolute -right-32 -top-40 size-[34rem] rounded-full border border-background/8"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-16 -top-24 size-[22rem] rounded-full border border-background/8"
        aria-hidden="true"
      />

      <div className="studio-container relative py-[var(--space-section-tight)]">
        <div className="grid gap-14 border-b border-background/14 pb-14 lg:grid-cols-[1.35fr_0.65fr] lg:gap-20 lg:pb-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-background/52">
              Have a project in mind?
            </p>
            <a
              href="/contact"
              className="group mt-6 inline-flex max-w-4xl items-end gap-4 font-display text-[clamp(3.35rem,8.5vw,8.5rem)] uppercase leading-[0.82] tracking-[-0.04em] transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-accent"
            >
              Let&apos;s make
              <br />  
              it real
              <ArrowUpRight
                className="mb-[0.08em] size-[0.3em] shrink-0 transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-2"
                aria-hidden="true"
              />
            </a>
            <p className="mt-7 max-w-xl text-base leading-7 text-background/62 sm:text-lg sm:leading-8">
              Websites, identities, and launch-ready digital work for businesses
              that want to look clear, credible, and memorable.
            </p>
          </div>

          <div className="grid content-end gap-9 sm:grid-cols-2 lg:grid-cols-1">
            <a
              href="mailto:yarsabyte@gmail.com"
              className="group flex items-center gap-4 border-b border-background/16 pb-5 transition-colors hover:text-accent"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-full border border-background/18">
                <Mail className="size-4" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs uppercase tracking-[0.16em] text-background/46">
                  Email us
                </span>
                <span className="mt-1 block truncate text-sm font-semibold sm:text-base">
                  yarsabyte@gmail.com
                </span>
              </span>
            </a>

            <div className="flex items-center gap-4 border-b border-background/16 pb-5">
              <span className="grid size-11 shrink-0 place-items-center rounded-full border border-background/18">
                <MapPin className="size-4" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-[0.16em] text-background/46">
                  Based in
                </span>
                <span className="mt-1 block text-sm font-semibold sm:text-base">
                  Butwal, Nepal
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-12 py-12 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1.2fr] lg:gap-16 lg:py-16">
          <nav aria-label="Footer navigation">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-background/42">
              Explore
            </p>
            <div className="mt-5 grid gap-3">
              {navigationLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="w-fit text-lg font-semibold transition-colors hover:text-accent"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-background/42">
              What we do
            </p>
            <div className="mt-5 grid gap-3 text-sm font-medium text-background/66">
              {serviceLinks.map((service) => (
                <span key={service}>{service}</span>
              ))}
            </div>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-background/42">
              Find us
            </p>
            <nav className="mt-5 flex flex-wrap gap-3" aria-label="Social links">
              {socialLinks.map((link) => {
                const Icon = socialIcons[link.label];

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={link.label}
                    className="group grid size-12 place-items-center rounded-full border border-background/16 bg-background/[0.04] transition duration-300 hover:-translate-y-1 hover:border-accent hover:bg-accent hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    <Icon
                      className="size-5 transition-transform duration-300 group-hover:scale-110"
                      aria-hidden="true"
                    />
                  </a>
                );
              })}
            </nav>
            <p className="mt-6 max-w-sm text-sm leading-6 text-background/52">
              Follow along for recent launches, visual experiments, and useful
              digital ideas.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-background/14 pt-6 text-xs font-semibold uppercase tracking-[0.12em] text-background/42 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 Yarsa Byte</p>
          <p>Design and development from Nepal</p>
        </div>
      </div>
    </footer>
  );
}
