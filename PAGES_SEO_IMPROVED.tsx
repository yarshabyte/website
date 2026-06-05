/**
 * IMPROVED PAGES - Copy the content from these files into your actual page.tsx files
 * This shows the enhanced metadata and SEO structure you should use
 */

// ============================================
// 1. HOME PAGE - app/page.tsx (ENHANCED)
// ============================================
/*
import type { Metadata } from "next";
import { AboutSection } from "@/components/sections/about-section";
import { AttitudeSection } from "@/components/sections/attitude-section";
import { ContactSection } from "@/components/sections/contact-section";
import { HeroSection } from "@/components/sections/hero-section";
import { AwardsSection } from "@/components/sections/awards_section";
import { WorkSection } from "@/components/sections/work-section";
import { getBreadcrumbSchema } from "@/lib/seo-schema";

export const metadata: Metadata = {
  title: "YarsaByte | Web Design, Development & Digital Services in Nepal",
  description:
    "YarsaByte creates professional websites, portfolios, branding, videos, and digital solutions for Nepali businesses. Expert web design & development.",
  openGraph: {
    title: "YarsaByte | Your Digital Presence Partner",
    description:
      "Professional web design, development, branding, and digital services for Nepali businesses.",
    url: "https://yarsabyte.com/",
    type: "website",
    images: [
      {
        url: "https://yarsabyte.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "YarsaByte Portfolio",
      },
    ],
  },
};

export default function Home() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main>
        <HeroSection />
        <AboutSection />
        <div
          className="hidden items-center px-[8%] lg:flex"
          aria-hidden="true"
        >
          <span className="size-3.5 rounded-full border border-foreground/90" />
          <span className="h-px flex-1 bg-foreground/80" />
          <span className="size-3.5 rounded-full border border-foreground/90" />
        </div>
        <WorkSection />
        <AttitudeSection />
        <AwardsSection />
        <ContactSection />
      </main>
    </>
  );
}
*/

// ============================================
// 2. WORK PAGE - app/work/page.tsx (ENHANCED)
// ============================================
/*
import type { Metadata } from "next";
import { WorkPageClient } from "@/components/sections/work-page-client";
import { getBreadcrumbSchema } from "@/lib/seo-schema";

export const metadata: Metadata = {
  title: "Our Work & Portfolio | YarsaByte Web Design Projects",
  description:
    "Explore YarsaByte portfolio of websites, portfolios, and digital projects for Nepali businesses and personal brands.",
  keywords: [
    "web design portfolio",
    "website projects",
    "portfolio examples",
    "case studies",
  ],
  openGraph: {
    title: "Our Work | YarsaByte Portfolio",
    description:
      "Explore our recent web design and development projects.",
    url: "https://yarsabyte.com/work",
    type: "website",
    images: [
      {
        url: "https://yarsabyte.com/og-work.png",
        width: 1200,
        height: 630,
        alt: "YarsaByte Work & Portfolio",
      },
    ],
  },
  alternates: {
    canonical: "https://yarsabyte.com/work",
  },
};

export default function WorkPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Work", url: "/work" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <WorkPageClient />
    </>
  );
}
*/

// ============================================
// 3. SERVICES PAGE - app/services/page.tsx (ENHANCED)
// ============================================
/*
import type { Metadata } from "next";
import { ServicesPageClient } from "@/components/sections/services-page-client";
import { getServiceSchema, getBreadcrumbSchema, getFAQSchema } from "@/lib/seo-schema";

export const metadata: Metadata = {
  title: "Web Design & Development Services | YarsaByte Nepal",
  description:
    "YarsaByte offers web design, web development, branding, video editing, graphic design, and digital marketing services in Nepal.",
  keywords: [
    "web design services",
    "web development services",
    "website design Nepal",
    "digital marketing services",
    "branding services",
    "graphic design",
  ],
  openGraph: {
    title: "Services | YarsaByte",
    description: "Professional web and digital services for Nepali businesses.",
    url: "https://yarsabyte.com/services",
    type: "website",
    images: [
      {
        url: "https://yarsabyte.com/og-services.png",
        width: 1200,
        height: 630,
        alt: "YarsaByte Services",
      },
    ],
  },
  alternates: {
    canonical: "https://yarsabyte.com/services",
  },
};

export default function ServicesPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
  ]);

  const faqSchema = getFAQSchema([
    {
      question: "What is included in website design?",
      answer:
        "Our website design includes responsive page design, conversion-ready content flow, contact and WhatsApp actions, domain and hosting guidance.",
    },
    {
      question: "How long does a website project take?",
      answer: "Website projects typically take 10-21 days from start to launch.",
    },
    {
      question: "Do you provide post-launch support?",
      answer:
        "Yes, we provide ongoing support and can help with updates, maintenance, and optimization.",
    },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ServicesPageClient />
    </>
  );
}
*/

// ============================================
// 4. CONTACT PAGE - app/contact/page.tsx (ENHANCED)
// ============================================
/*
import type { Metadata } from "next";
import { ContactPageClient } from "@/components/sections/contact-page-client";
import { getBreadcrumbSchema } from "@/lib/seo-schema";

export const metadata: Metadata = {
  title: "Contact YarsaByte | Start Your Digital Project",
  description:
    "Get in touch with YarsaByte for website design, development, branding, and digital services. Start your project today.",
  openGraph: {
    title: "Contact | YarsaByte",
    description: "Contact YarsaByte to start your digital project.",
    url: "https://yarsabyte.com/contact",
    type: "website",
    images: [
      {
        url: "https://yarsabyte.com/og-contact.png",
        width: 1200,
        height: 630,
        alt: "Contact YarsaByte",
      },
    ],
  },
  alternates: {
    canonical: "https://yarsabyte.com/contact",
  },
};

export default function ContactPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Contact", url: "/contact" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ContactPageClient />
    </>
  );
}
*/

// ============================================
// 5. STUDIO PAGE - app/studio/page.tsx (ENHANCED)
// ============================================
/*
import type { Metadata } from "next";
import { StudioPageClient } from "@/components/sections/studio-page-client";
import { getBreadcrumbSchema } from "@/lib/seo-schema";

export const metadata: Metadata = {
  title: "Our Studio | YarsaByte Team & Expertise",
  description:
    "Meet the YarsaByte studio team - motion-led digital creators specializing in web design, development, branding, and digital presence.",
  openGraph: {
    title: "Studio | YarsaByte",
    description: "Meet the YarsaByte team and learn about our expertise.",
    url: "https://yarsabyte.com/studio",
    type: "website",
    images: [
      {
        url: "https://yarsabyte.com/og-studio.png",
        width: 1200,
        height: 630,
        alt: "YarsaByte Studio",
      },
    ],
  },
  alternates: {
    canonical: "https://yarsabyte.com/studio",
  },
};

export default function StudioPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Studio", url: "/studio" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <StudioPageClient />
    </>
  );
}
*/
