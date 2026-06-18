import type { Metadata } from "next";

import { WorkPageClient } from "@/components/sections/work-page-client";

export const metadata: Metadata = {
  title: "Work | Yarsha Byte",
  description:
    "Explore Yarsha Byte work across websites, portfolios, digital launch systems, and campaign-ready creative.",
  keywords: ["web design portfolio", "website projects", "case studies"],
  alternates: { canonical: "https://yarshabyte.vercel.app/work" },
  openGraph: {
    title: "Work | YarshaByte Portfolio",
    description:
      "Explore YarshaByte work across websites, portfolios, and digital projects.",
    url: "https://yarshabyte.vercel.app/work",
    images: ["https://yarshabyte.vercel.app/og-work.png"],
  },
};

export default function WorkPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://yarshabyte.vercel.app/" },
      { "@type": "ListItem", position: 2, name: "Work", item: "https://yarshabyte.vercel.app/work" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <WorkPageClient />
    </>
  );
}
