import type { Metadata } from "next";

import { ContactPageClient } from "@/components/sections/contact-page-client";

export const metadata: Metadata = {
  title: "Contact | Yarsa Byte",
  description:
    "Start a project with Yarsa Byte for websites, portfolios, posters, reels, branding, and digital launch support.",
  keywords: ["contact yarsabyte", "hire web designer nepal", "start project"],
  alternates: { canonical: "https://yarsabyte.vercel.app/contact" },
  openGraph: {
    title: "Contact | YarsaByte",
    description: "Start a project with YarsaByte for web and digital services.",
    url: "https://yarsabyte.vercel.app/contact",
    images: ["https://yarsabyte.vercel.app/og-contact.png"],
  },
};

type ContactPageProps = {
  searchParams: Promise<{
    service?: string | string[];
  }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const service = Array.isArray(params.service)
    ? params.service[0]
    : params.service;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://yarsabyte.vercel.app/" },
      { "@type": "ListItem", position: 2, name: "Contact", item: "https://yarsabyte.vercel.app/contact" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <ContactPageClient prefilledServiceSlug={service} />
    </>
  );
}
