/**
 * SEO Schema Markup Utilities
 * Generates JSON-LD structured data for better search engine understanding
 */

export interface OrganizationSchema {
  "@context": string;
  "@type": string;
  name: string;
  url: string;
  logo: string;
  description: string;
  sameAs: string[];
  address: {
    "@type": string;
    addressCountry: string;
    addressLocality: string;
  };
  contactPoint: {
    "@type": string;
    contactType: string;
    telephone: string;
  };
}

export interface LocalServiceSchema {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  provider: {
    "@type": string;
    name: string;
  };
  areaServed: string;
  availableLanguage: string[];
}

export interface FAQSchema {
  "@context": string;
  "@type": string;
  mainEntity: Array<{
    "@type": string;
    name: string;
    acceptedAnswer: {
      "@type": string;
      text: string;
    };
  }>;
}

/**
 * Generate Organization Schema for YarsaByte
 */
export function getOrganizationSchema(
  baseUrl: string = "https://yarsabyte.vercel.app"
): OrganizationSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "YarsaByte",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`, // Update with actual logo path
    description:
      "YarsaByte is a digital presence partner helping Nepali businesses with web design, development, branding, video editing, and digital solutions.",
    sameAs: [
      "https://www.facebook.com/yarsabyte", // Update with actual social profiles
      "https://www.instagram.com/yarsabyte",
      "https://www.linkedin.com/company/yarsabyte",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "NP",
      addressLocality: "Nepal", // Update with actual city/address
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      telephone: "+977-1234567890", // Update with actual phone
    },
  };
}

/**
 * Generate LocalBusiness Schema (better for local SEO in Nepal)
 */
export function getLocalBusinessSchema(
  baseUrl: string = "https://yarsabyte.vercel.app"
) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "YarsaByte",
    description:
      "Web design, development, branding, and digital marketing agency in Nepal",
    url: baseUrl,
    telephone: "+977-1234567890", // Update with actual phone
    email: "contact@yarsabyte.vercel.app", // Update with actual email
    address: {
      "@type": "PostalAddress",
      addressCountry: "NP",
      addressLocality: "Nepal", // Update with actual location
    },
    priceRange: "$$",
    image: `${baseUrl}/logo.png`, // Update with actual image
    sameAs: [
      "https://www.facebook.com/yarsabyte",
      "https://www.instagram.com/yarsabyte",
    ],
  };
}

/**
 * Generate Service Schema
 */
export function getServiceSchema(
  name: string,
  description: string,
  baseUrl: string = "https://yarsabyte.vercel.app"
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "LocalBusiness",
      name: "YarsaByte",
      url: baseUrl,
    },
    areaServed: {
      "@type": "Country",
      name: "Nepal",
    },
    availableLanguage: ["en", "ne"],
  };
}

/**
 * Generate Breadcrumb Schema
 */
export function getBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
  baseUrl: string = "https://yarsabyte.vercel.app"
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  };
}

/**
 * Generate FAQ Schema
 */
export function getFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
