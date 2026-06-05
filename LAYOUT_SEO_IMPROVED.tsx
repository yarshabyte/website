/**
 * Improved Layout with Enhanced SEO
 * Features: Better metadata, Schema markup, Twitter cards, Canonical URLs
 */

import type { Metadata } from "next";
import { Archivo_Black } from "next/font/google";

import { PageLoader } from "@/components/page-loader";
import { ScrollHexBackground } from "@/components/scroll-hex-background";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { SiteHeader } from "@/components/site-header";
import { getOrganizationSchema, getLocalBusinessSchema } from "@/lib/seo-schema";

import "./globals.css";

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--next-display-font",
  fallback: ["Arial Black", "Arial", "sans-serif"],
  adjustFontFallback: false,
});

const baseUrl = "https://yarsabyte.vercel.app";

export const metadata: Metadata = {
  // Basic Meta Tags
  title: "YarsaByte | Web Design, Development & Digital Services in Nepal",
  description:
    "YarsaByte helps Nepali businesses create websites, portfolios, posters, videos, reels, branding, and digital presence. Professional web design and development services.",
  keywords: [
    "web design Nepal",
    "web development Nepal",
    "website design Kathmandu",
    "digital marketing Nepal",
    "branding Nepal",
    "portfolio website",
    "e-commerce website Nepal",
  ],
  metadataBase: new URL(baseUrl),
  
  // Canonical URL
  alternates: {
    canonical: baseUrl,
  },

  // Open Graph (Social Media)
  openGraph: {
    title: "YarsaByte | Your Digital Presence Partner in Nepal",
    description:
      "Professional web design, development, branding, and digital solutions for Nepali businesses.",
    siteName: "YarsaByte",
    locale: "en_US",
    type: "website",
    url: baseUrl,
    images: [
      {
        url: `${baseUrl}/og-image.png`, // Create this image (1200x630px)
        width: 1200,
        height: 630,
        alt: "YarsaByte - Digital Presence Partner",
        type: "image/png",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "YarsaByte | Your Digital Presence Partner in Nepal",
    description:
      "Professional web design, development, branding, and digital solutions.",
    images: [`${baseUrl}/og-image.png`], // Same image as OG
    creator: "@yarsabyte", // Update with actual Twitter handle
    site: "@yarsabyte", // Update with actual Twitter handle
  },

  // Mobile & PWA
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "YarsaByte",
  },

  // Robots Meta Tags
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  // Category & Author
  category: "Business",
  authors: [
    {
      name: "YarsaByte",
      url: baseUrl,
    },
  ],

  // Additional Meta Tags
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
};

/**
 * Generate structured data scripts
 */
function getSchemaScripts() {
  const organizationSchema = getOrganizationSchema(baseUrl);
  const localBusinessSchema = getLocalBusinessSchema(baseUrl);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${archivoBlack.variable}`}>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Structured Data (JSON-LD) */}
        {getSchemaScripts()}

        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body className="min-h-full font-sans text-foreground">
        <PageLoader>
          <div className="site-frame">
            <ScrollHexBackground />
            <div className="site-frame-content">
              <SmoothScrollProvider>
                <SiteHeader />
                {children}
              </SmoothScrollProvider>
            </div>
          </div>
        </PageLoader>
      </body>
    </html>
  );
}
