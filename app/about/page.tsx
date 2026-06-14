import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";

import { Container } from "@/components/ui/container";
import { teamMembers } from "@/data/team";

export const metadata: Metadata = {
  title: "About Us | Yarsa Byte",
  description:
    "A six-person digital team in Nepal unifying strategy, design, code, and motion.",
  keywords: ["Yarsa Byte team", "about Yarsa Byte", "creative team Nepal"],
  alternates: { canonical: "https://yarsabyte.vercel.app/about" },
  openGraph: {
    title: "About Yarsa Byte",
    description:
      "A six-person digital team in Nepal unifying strategy, design, code, and motion.",
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
      <main className="overflow-hidden bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
        
        {/* --- HERO SECTION --- */}
        {/* Fixed: Drastically reduced top padding (pt-6 lg:pt-10) to sit flush under the nav */}
        <section className="relative border-b border-foreground/5 pb-16 pt-6 sm:pb-20 sm:pt-8 lg:pb-28 lg:pt-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(var(--accent-rgb),0.03),transparent_50%)]" aria-hidden="true" />
          <div className="service-grid-surface absolute inset-0 opacity-10" aria-hidden="true" />
          
          <Container className="relative grid gap-8 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Heading */}
            <div className="lg:col-span-7">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
                About Yarsa Byte
              </p>
              <h1 className="mt-4 font-display text-[clamp(2.5rem,6vw,6rem)] font-black uppercase leading-[0.9] tracking-tighter">
                Six minds.
                <br />
                <span className="text-foreground/30">One direction.</span>
              </h1>
            </div>
            
            {/* Right Column: Shortened, punchy text */}
            <div className="border-t border-foreground/5 pt-6 lg:col-span-5 lg:border-t-0 lg:pt-0 lg:pl-6">
              <p className="text-lg leading-relaxed text-foreground/70 sm:text-xl">
                A six-person digital team based in Nepal. We unify strategy,
                design, code, and motion to build and launch credible brands.
              </p>
            </div>
          </Container>
        </section>

        {/* --- OUR STORY SECTION --- */}
        <section className="border-b border-foreground/5 py-16 lg:py-24">
          <Container className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
                Our story
              </p>
              <h2 className="mt-3 font-display text-2xl font-black uppercase leading-[0.95] tracking-tight sm:text-3xl lg:text-4xl">
                Small team,
                <br />complete thinking.
              </h2>
            </div>
            {/* Shortened the story text for better scannability */}
            <div className="flex flex-col gap-6 text-base leading-relaxed text-foreground/60 sm:text-lg lg:col-span-7">
              <p>
                We exist to make professional digital work practical. Instead of
                fragmenting disciplines, we operate as a single unit from concept to launch.
              </p>
              <p>
                The result? Zero handoff gaps, faster decisions, and an output that stays consistent
                across your website, identity, and campaigns.
              </p>
            </div>
          </Container>
        </section>

        {/* --- VALUES SECTION --- */}
        <section className="border-b border-foreground/5 py-16 lg:py-24 bg-foreground/[0.005]">
          <Container>
            <div className="grid gap-6 md:grid-cols-3">
              {values.map((value) => (
                <article
                  key={value.number}
                  className="group relative border border-foreground/5 bg-background p-8 transition-all duration-300 hover:border-foreground/15"
                >
                  <p className="font-display text-3xl font-black text-accent/20 transition-colors duration-300 group-hover:text-accent">
                    {value.number}
                  </p>
                  <h3 className="mt-8 text-lg font-black uppercase tracking-tight text-foreground">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/60">
                    {value.text}
                  </p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        {/* --- TEAM SECTION --- */}
        <section id="team" className="border-b border-foreground/5 py-16 lg:py-24">
          <Container>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
                  Meet the team
                </p>
                <h2 className="mt-3 font-display text-2xl font-black uppercase leading-none tracking-tight sm:text-3xl lg:text-4xl">
                  The people behind the work.
                </h2>
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-foreground/50">
                Select a team member to open their dedicated portfolio,
                experience, skills, and project highlights.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
              {teamMembers.map((member) => (
                <Link
                  key={member.slug}
                  href={`/team/${member.slug}`}
                  className="group flex flex-col items-center text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-6 focus-visible:outline-accent"
                >
                  <div className="relative aspect-square w-full max-w-[140px] overflow-hidden rounded-full border border-foreground/10 bg-foreground/[0.01] transition duration-500 ease-out group-hover:-translate-y-1 group-hover:border-accent group-hover:shadow-[0_15px_40px_rgba(var(--accent-rgb),0.15)]">
                    <Image
                      src={member.image}
                      alt={`${member.name}, ${member.role}`}
                      fill
                      quality={72}
                      sizes="(max-width: 640px) 42vw, (max-width: 1024px) 28vw, 140px"
                      className="object-cover transition duration-700 ease-out group-hover:scale-103"
                    />
                  </div>
                  <span className="mt-4 block text-sm font-bold uppercase tracking-tight text-foreground transition-colors group-hover:text-accent">
                    {member.name}
                  </span>
                  <span className="mt-0.5 block text-xs text-foreground/40">
                    {member.role}
                  </span>
                  <span className="mt-3 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.15em] text-accent opacity-0 transition-all duration-300 group-hover:opacity-100">
                    Portfolio
                    <ArrowUpRight className="size-3" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </section>

        {/* --- CAPABILITIES SECTION --- */}
        <section className="border-b border-foreground/5 py-16 lg:py-24">
          <Container className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
                What we cover
              </p>
              <h2 className="mt-3 font-display text-2xl font-black uppercase leading-[0.95] tracking-tight sm:text-3xl lg:text-4xl">
                One team from
                <br />idea to launch.
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
              {capabilities.map((capability) => (
                <div
                  key={capability}
                  className="flex min-h-[64px] items-center gap-4 border border-foreground/5 bg-foreground/[0.005] p-4 text-sm font-medium transition-colors hover:border-foreground/10"
                >
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
                    <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                  </span>
                  <span className="text-foreground/70">{capability}</span>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* --- CTA SECTION --- */}
        <section className="py-16 lg:py-24">
          <Container>
            <div className="relative overflow-hidden bg-foreground px-6 py-10 text-background sm:px-10 sm:py-14 lg:px-16 lg:py-20">
              <div className="absolute -right-10 -top-10 size-40 rounded-full bg-accent/10 blur-3xl" aria-hidden="true" />
              
              <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
                    Work with the team
                  </p>
                  <h2 className="mt-3 max-w-2xl font-display text-2xl font-black uppercase leading-none tracking-tight sm:text-3xl lg:text-5xl">
                    Have something
                    <br />worth building?
                  </h2>
                </div>
                <Link
                  href="/contact"
                  className="group inline-flex h-11 items-center gap-3 rounded-full bg-accent px-5 text-sm font-bold text-accent-foreground transition-transform active:scale-98"
                >
                  Start a project
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
