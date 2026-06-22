import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { teamMembers } from "@/data/team";
import { ContactSection } from "@/components/sections/contact-section";
import { TeamMemberClient } from "@/components/sections/team-member-client";

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
    return { title: "Team Member Not Found | Yarsha Byte" };
  }

  return {
    title: `${member.name} | Yarsha Byte Team`,
    description: member.intro,
    alternates: {
      canonical: `https://yarshabyte.vercel.app/team/${member.slug}`,
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
      <TeamMemberClient member={member} />
      <ContactSection />
    </>
  );
}
