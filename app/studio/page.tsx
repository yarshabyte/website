import type { Metadata } from "next";

import { StudioPageClient } from "@/components/sections/studio-page-client";

export const metadata: Metadata = {
  title: "Studio | Yarsa Byte",
  description:
    "Meet the Yarsa Byte studio, a motion-led digital team for websites, portfolios, campaigns, and launch-ready online presence.",
  keywords: ["digital studio", "motion design", "web design team"],
  alternates: { canonical: "https://yarsabyte.com/studio" },
  openGraph: {
    title: "Studio | YarsaByte",
    description: "Meet the Yarsa Byte studio and our creative approach.",
    url: "https://yarsabyte.com/studio",
    images: ["https://yarsabyte.com/og-studio.png"],
  },
};

export default function StudioPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://yarsabyte.com/" },
      { "@type": "ListItem", position: 2, name: "Studio", item: "https://yarsabyte.com/studio" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <StudioPageClient />
    </>
  );
}
