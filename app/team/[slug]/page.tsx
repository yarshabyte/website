import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Mail, MapPin } from "lucide-react";
import { notFound } from "next/navigation";

import { ContactSection } from "@/components/sections/contact-section";
import { Container } from "@/components/ui/container";
import { teamMembers } from "@/data/team";

export function generateStaticParams() {
  return teamMembers.map((member) => ({ slug: member.slug }));
}

type TeamMemberPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: TeamMemberPageProps): Promise<Metadata> {
  const { slug } = await params;
  const member = teamMembers.find((item) => item.slug === slug);

  if (!member) {
    return { title: "Team Member Not Found | Yarsa Byte" };
  }

  return {
    title: `${member.name} | Yarsa Byte Team`,
    description: member.intro,
    alternates: {
      canonical: `https://yarsabyte.vercel.app/team/${member.slug}`,
    },
  };
}

export default async function TeamMemberPage({
  params,
}: TeamMemberPageProps) {
  const { slug } = await params;
  const member = teamMembers.find((item) => item.slug === slug);

  if (!member) {
    notFound();
  }

  return (
    <>
    <main className="page-hero-spacing overflow-hidden">
      <section className="border-b border-foreground/10 pb-[var(--space-section)]">
        <Container>
          <Link
            href="/about#team"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-foreground/58 transition hover:text-accent"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to the team
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[0.38fr_0.62fr] lg:items-center">
            <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-full border border-foreground/12 bg-foreground/[0.04]">
              <Image
                src={member.image}
                alt={`${member.name}, ${member.role}`}
                fill
                priority
                sizes="(max-width: 1024px) 80vw, 380px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">
                {member.role}
              </p>
              <h1 className="mt-5 text-[clamp(3rem,8vw,7.5rem)] font-black uppercase leading-[0.86] tracking-[-0.04em]">
                {member.name}
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-foreground/68">
                {member.intro}
              </p>
              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-foreground/58">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="size-4 text-accent" aria-hidden="true" />
                  {member.location}
                </span>
                <a
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center gap-2 transition hover:text-accent"
                >
                  <Mail className="size-4 text-accent" aria-hidden="true" />
                  {member.email}
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-spacing border-b border-foreground/10">
        <Container className="grid gap-12 lg:grid-cols-[0.38fr_0.62fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">
              Profile
            </p>
            <h2 className="mt-5 text-[clamp(2.5rem,5vw,4.75rem)] font-black uppercase leading-[0.9]">
              About the work.
            </h2>
          </div>
          <div>
            <p className="max-w-3xl text-base leading-8 text-foreground/68 sm:text-lg">
              {member.bio}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {member.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-foreground/10 bg-foreground/[0.04] px-4 py-2 text-xs font-bold uppercase tracking-[0.08em]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="section-spacing">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">
                Selected work
              </p>
              <h2 className="mt-5 text-[clamp(2.5rem,5vw,5rem)] font-black uppercase leading-[0.9]">
                Project highlights.
              </h2>
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {member.projects.map((project, index) => (
              <article
                key={project.title}
                className="group min-h-64 border border-foreground/10 bg-foreground/[0.035] p-6 transition hover:border-accent/50 sm:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-accent">
                    {project.type}
                  </p>
                  <span className="font-display text-4xl text-foreground/12">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-20 max-w-md text-2xl font-black uppercase leading-tight sm:text-3xl">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm text-foreground/48">{project.year}</p>
              </article>
            ))}
          </div>

          <Link
            href="/contact"
            className="group mt-10 inline-flex min-h-12 items-center gap-3 rounded-full bg-accent px-5 text-sm font-bold text-foreground"
          >
            Work with {member.name}
            <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </Container>
      </section>
    </main>
    <ContactSection />
    </>
  );
}
