import type { Metadata } from "next";

import { WorkPageClient } from "@/components/sections/work-page-client";

export const metadata: Metadata = {
  title: "Work | Yarsa Byte",
  description:
    "Explore Yarsa Byte work across websites, portfolios, digital launch systems, and campaign-ready creative.",
  keywords: ["web design portfolio", "website projects", "case studies"],
  alternates: { canonical: "https://yarsabyte.com/work" },
  openGraph: {
    title: "Work | YarsaByte Portfolio",
    description:
      "Explore YarsaByte work across websites, portfolios, and digital projects.",
    url: "https://yarsabyte.com/work",
    images: ["https://yarsabyte.com/og-work.png"],
  },
};

export default function WorkPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://yarsabyte.com/" },
      { "@type": "ListItem", position: 2, name: "Work", item: "https://yarsabyte.com/work" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <WorkPageClient />
    </>
  );
}
