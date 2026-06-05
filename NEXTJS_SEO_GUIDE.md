# Next.js 16 SEO Optimization Guide for YarsaByte

## 🚀 Next.js Specific SEO Features

### 1. App Router Advantages (Already Using)
```tsx
✅ Better metadata API
✅ Server-side rendering for SEO
✅ Automatic sitemap generation (Next.js 14+)
✅ RSS feed generation
✅ Open Graph route handlers
✅ Canonical URL support
```

### 2. Image Optimization

#### Current State
- Images likely loading without optimization
- Potential performance impact

#### Optimization Needed
```tsx
// Before (Bad for SEO)
<img src="/work/project.png" alt="Project" />

// After (Good for SEO)
import Image from 'next/image';

<Image
  src="/work/project.png"
  alt="Descriptive alt text"
  width={1200}
  height={630}
  quality={80}
  placeholder="blur"
  blurDataURL="data:image/..." // Optional
  priority={false} // Set true for above-fold images
  onLoadingComplete={(result) => {}}
/>
```

#### Benefits
- Automatic format conversion (WebP)
- Responsive image sizing
- Lazy loading by default
- Improved Core Web Vitals

---

## 3. Font Optimization

### Current Setup ✅ (Already Good)
```tsx
const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  display: "swap", // ← Good for LCP
  variable: "--next-display-font",
  fallback: ["Arial Black", "Arial", "sans-serif"],
  adjustFontFallback: false,
});
```

### Recommendations
- ✅ Keep `display: "swap"` (better than "block")
- ✅ Only load used character subsets
- ✅ Consider variable fonts for fewer requests
- ✅ Limit to 2-3 fonts maximum

---

## 4. Dynamic Sitemap Generation

### Current: Static sitemap.xml
### Recommended: Dynamic generation

```tsx
// app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://yarsabyte.com';
  
  const staticRoutes = [
    { url: '/', changeFreq: 'monthly', priority: 1.0 },
    { url: '/work', changeFreq: 'monthly', priority: 0.9 },
    { url: '/services', changeFreq: 'monthly', priority: 0.9 },
    { url: '/studio', changeFreq: 'monthly', priority: 0.8 },
    { url: '/contact', changeFreq: 'yearly', priority: 0.8 },
  ];

  return staticRoutes.map(({ url, changeFreq, priority }) => ({
    url: `${baseUrl}${url}`,
    lastModified: new Date(),
    changeFrequency: changeFreq as 'yearly' | 'monthly' | 'weekly' | 'daily' | 'hourly' | 'never' | 'always',
    priority,
  }));
}
```

---

## 5. Dynamic RSS Feed

```tsx
// app/feed.xml/route.ts
import { MetadataRoute } from 'next';

export async function GET() {
  const baseUrl = 'https://yarsabyte.com';
  
  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>YarsaByte Blog</title>
    <link>${baseUrl}</link>
    <description>Latest from YarsaByte</description>
    <language>en-us</language>
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
```

---

## 6. Meta Tags Improvements

### Current: Basic metadata in layout.tsx
### Add These Enhancements:

```tsx
// Add to metadata object in layout.tsx

// Verification tags
verification: {
  google: "google-site-verification=...",
  yandex: "yandex-verification=...",
  // Add your verification codes
},

// Structured data
other: {
  'application/ld+json': JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    // ... rest of schema
  }),
},

// Social profiles
profile: {
  firstName: 'Yarsa',
  lastName: 'Byte',
  username: 'yarsabyte',
},
```

---

## 7. Performance Optimization for SEO

### Core Web Vitals Priority
```tsx
// app/layout.tsx
export const metadata: Metadata = {
  // ... other metadata ...
  
  // Performance hints
  other: {
    'theme-color': '#000000',
    'color-scheme': 'dark light',
  },
};
```

### Image Optimization Checklist
- [ ] Convert PNG to WebP (save 20-30% bytes)
- [ ] Compress JPG (quality 75-85)
- [ ] Add width/height to prevent CLS
- [ ] Lazy load below-fold images
- [ ] Use responsive images with srcset

### JavaScript Optimization
- [ ] Code splitting (automatic in Next.js)
- [ ] Remove unused packages
- [ ] Tree-shake unused code
- [ ] Defer non-critical scripts
- [ ] Monitor bundle size

---

## 8. Cache Strategy for SEO

```tsx
// next.config.ts
export default {
  // ... existing config ...
  
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

---

## 9. Compression & GZIP

```tsx
// next.config.ts
export default {
  compress: true, // Enable GZIP compression
  swcMinify: true, // Minify with SWC
};
```

---

## 10. Search Parameters & Canonicals

### Avoid SEO Issues with Query Params
```tsx
// Good: No session IDs or tracking params in URLs
/work
/work/project-1

// Bad: Session IDs, tracking params
/work?session=abc123&utm_source=google
/work?sort=date&page=1 (use proper pagination)

// For pagination, use proper canonicals:
<link rel="canonical" href="https://yarsabyte.com/work" />
<link rel="next" href="https://yarsabyte.com/work?page=2" />
<link rel="prev" href="https://yarsabyte.com/work?page=1" />
```

---

## 11. SEO Monitoring Tools Integration

### Google Analytics 4 Integration
```tsx
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        {/* GA4 Script */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### Search Console Integration
- Add verification code to metadata
- Monitor Core Web Vitals
- Check coverage and sitemaps
- Monitor search analytics

---

## 12. Mobile Optimization

### Next.js Mobile Features
- ✅ Responsive images (automatic)
- ✅ Touch-friendly components
- ✅ Viewport meta tag (automatic)
- ✅ Mobile-safe colors and contrast

### Add Viewport Meta Tags (Already in layout)
```tsx
viewport: "width=device-width, initial-scale=1, maximum-scale=5",
```

### Test Mobile Performance
- Chrome DevTools (Lighthouse)
- PageSpeed Insights
- Mobile Usability Report (GSC)

---

## 13. Pre-rendering & Static Content

### Optimize Static Pages
```tsx
// app/work/page.tsx
export const revalidate = 3600; // Revalidate every hour

export default function WorkPage() {
  return <WorkPageClient />;
}
```

### Benefit for SEO
- Faster first-page load
- Better Largest Contentful Paint (LCP)
- More consistent SERP results

---

## 14. Error Handling & Status Codes

### Already Implemented ✅
- `app/not-found.tsx` (404 handling)

### Additional Needed
```tsx
// app/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h1>Something went wrong!</h1>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

### Status Codes
- 200 OK: ✅ Page loaded successfully
- 301 Redirect: For moved pages (permanent)
- 302 Redirect: For temporary redirects
- 404 Not Found: ✅ Already handled
- 500 Server Error: Handle gracefully

---

## 15. Robots & Crawlability

### Current robots.txt ✅
Already created and configured

### Additional Improvements
```robots
# Prevent crawling of admin/private areas
Disallow: /admin
Disallow: /api/
Disallow: /.next/
Disallow: /private/

# Allow crawling of important content
Allow: /

# Specify sitemap
Sitemap: https://yarsabyte.com/sitemap.xml
Sitemap: https://yarsabyte.com/app/sitemap.ts
```

---

## 🎯 Next Steps

### Immediate (Today)
- [ ] Review and copy `lib/seo-schema.ts`
- [ ] Update `app/layout.tsx` with enhanced metadata
- [ ] Ensure 404 page is in place

### This Week
- [ ] Create dynamic sitemap.ts
- [ ] Optimize all images
- [ ] Update page metadata
- [ ] Add GA4 tracking code

### This Month
- [ ] Setup Google Search Console
- [ ] Monitor Core Web Vitals
- [ ] Implement performance optimizations
- [ ] Get initial Google rankings

---

## 📊 Monitoring Next.js SEO Health

### Lighthouse Scores (Target)
| Metric | Target |
|--------|--------|
| Performance | 90+ |
| Accessibility | 90+ |
| Best Practices | 90+ |
| SEO | 95+ |

### Core Web Vitals (Target)
| Metric | Good | Needs Work |
|--------|------|-----------|
| LCP | < 2.5s | > 4s |
| FID | < 100ms | > 300ms |
| CLS | < 0.1 | > 0.25 |

### Run Lighthouse Audits
```bash
# Command line audit
npm install -g lighthouse
lighthouse https://yarsabyte.com --view
```

