import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";

import { Container } from "@/components/ui/container";
import { teamMembers } from "@/data/team";

export const metadata: Metadata = {
  title: "About Us | Yarsa Byte",
  description:
    "Meet the six-person Yarsa Byte team creating websites, brands, campaigns, motion, and digital launch systems from Nepal.",
  keywords: ["Yarsa Byte team", "about Yarsa Byte", "creative team Nepal"],
  alternates: { canonical: "https://yarsabyte.vercel.app/about" },
  openGraph: {
    title: "About Yarsa Byte",
    description:
      "A six-person digital team combining strategy, design, development, and motion.",
    url: "https://yarsabyte.vercel.app/about",
    images: ["https://yarsabyte.vercel.app/og-image.png"],
  },
};

const values = [
  {
    number: "01",
    title: "Useful before flashy",
    text: "Strong visual work matters most when it makes a business clearer, easier to trust, and easier to choose.",
  },
  {
    number: "02",
    title: "Built together",
    text: "Strategy, design, development, content, and launch support stay connected from the first conversation.",
  },
  {
    number: "03",
    title: "Local insight, wider standard",
    text: "We understand Nepali businesses and build with the quality, speed, and care expected anywhere.",
  },
] as const;

const capabilities = [
  "Web design and development",
  "Brand identity and graphic design",
  "Portfolio and e-commerce experiences",
  "Video, reels, and motion graphics",
  "Digital setup and launch support",
  "Creative strategy and project planning",
] as const;

export default function AboutPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://yarsabyte.vercel.app/" },
      { "@type": "ListItem", position: 2, name: "About", item: "https://yarsabyte.vercel.app/about" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <main className="overflow-hidden">
        <section className="page-hero-spacing relative border-b border-foreground/10">
          <div className="service-grid-surface absolute inset-0 opacity-25" aria-hidden="true" />
          <Container className="relative grid min-h-[min(52rem,100dvh)] content-end gap-10 pb-[var(--space-section)] lg:grid-cols-[0.68fr_0.32fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">
                About Yarsa Byte
              </p>
              <h1 className="mt-6 max-w-5xl text-[clamp(3.4rem,10vw,9.5rem)] font-black uppercase leading-[0.84] tracking-[-0.04em]">
                Six minds.
                <br />
                One direction.
              </h1>
            </div>
            <p className="max-w-md text-base leading-8 text-foreground/66 sm:text-lg">
              We are a six-person digital team in Nepal bringing strategy,
              design, code, content, and motion together to help useful ideas
              look credible and launch well.
            </p>
          </Container>
        </section>

        <section className="section-spacing border-b border-foreground/10">
          <Container className="grid gap-12 lg:grid-cols-[0.38fr_0.62fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">
                Our story
              </p>
              <h2 className="mt-5 max-w-md text-[clamp(2.5rem,5vw,4.8rem)] font-black uppercase leading-[0.9]">
                Small team, complete thinking.
              </h2>
            </div>
            <div className="grid gap-6 text-base leading-8 text-foreground/68 sm:text-lg">
              <p>
                Yarsa Byte exists to make professional digital work more
                practical and accessible for growing businesses. Instead of
                separating every discipline, our team works as one unit from
                the first idea to the public launch.
              </p>
              <p>
                That means fewer handoff gaps, clearer decisions, and a final
                result that feels consistent across the website, identity,
                content, and campaign materials.
              </p>
            </div>
          </Container>
        </section>

        <section className="section-spacing border-b border-foreground/10">
          <Container>
            <div className="grid gap-4 lg:grid-cols-3">
              {values.map((value) => (
                <article
                  key={value.number}
                  className="border border-foreground/10 bg-foreground/[0.035] p-6 sm:p-8"
                >
                  <p className="font-display text-4xl text-accent">{value.number}</p>
                  <h2 className="mt-10 text-2xl font-black uppercase leading-tight">
                    {value.title}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-foreground/64">
                    {value.text}
                  </p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section id="team" className="section-spacing border-b border-foreground/10">
          <Container>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">
                  Meet the team
                </p>
                <h2 className="mt-4 text-[clamp(2.6rem,6vw,5.5rem)] font-black uppercase leading-[0.88]">
                  The people behind the work.
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-7 text-foreground/60">
                Select a team member to open their dedicated portfolio,
                experience, skills, and project highlights.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
              {teamMembers.map((member) => (
                <Link
                  key={member.slug}
                  href={`/team/${member.slug}`}
                  className="group text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-6 focus-visible:outline-accent"
                >
                  <span className="relative mx-auto block aspect-square w-full max-w-40 overflow-hidden rounded-full border border-foreground/12 bg-foreground/[0.04] transition duration-300 group-hover:-translate-y-1 group-hover:border-accent group-hover:shadow-[0_18px_45px_color-mix(in_srgb,var(--accent)_20%,transparent)]">
                    <Image
                      src={member.image}
                      alt={`${member.name}, ${member.role}`}
                      fill
                      sizes="(max-width: 640px) 42vw, (max-width: 1024px) 28vw, 160px"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </span>
                  <span className="mt-5 block text-sm font-black uppercase leading-tight">
                    {member.name}
                  </span>
                  <span className="mt-2 block text-xs leading-5 text-foreground/52">
                    {member.role}
                  </span>
                  <span className="mt-3 inline-flex items-center gap-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-accent">
                    View portfolio
                    <ArrowUpRight className="size-3" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </section>

        <section className="section-spacing border-b border-foreground/10">
          <Container className="grid gap-12 lg:grid-cols-[0.42fr_0.58fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">
                What we cover
              </p>
              <h2 className="mt-5 text-[clamp(2.5rem,5vw,4.75rem)] font-black uppercase leading-[0.9]">
                One team from idea to launch.
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {capabilities.map((capability) => (
                <div
                  key={capability}
                  className="flex min-h-16 items-center gap-3 border border-foreground/10 bg-foreground/[0.035] px-4 text-sm font-semibold"
                >
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                    <Check className="size-3.5" aria-hidden="true" />
                  </span>
                  {capability}
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="section-spacing">
          <Container>
            <div className="flex flex-col gap-8 bg-foreground p-7 text-background sm:p-10 lg:flex-row lg:items-end lg:justify-between lg:p-14">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">
                  Work with the team
                </p>
                <h2 className="mt-5 max-w-3xl text-[clamp(2.6rem,6vw,5.5rem)] font-black uppercase leading-[0.88]">
                  Have something worth building?
                </h2>
              </div>
              <Link
                href="/contact"
                className="group inline-flex min-h-12 w-fit items-center gap-3 rounded-full bg-accent px-5 text-sm font-bold text-foreground"
              >
                Start a project
                <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
