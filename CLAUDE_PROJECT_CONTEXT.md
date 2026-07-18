# CloudRent Website - Project Context for Claude Code

## Overview

This is a **Next.js 15 + Payload CMS** marketing site for CloudRent Pro (equipment rental management software). The site uses Tailwind CSS, TypeScript, and a sophisticated block-based page building system. It's optimized for SEO with structured data, dynamic sitemaps, and industry-specific landing pages.

**Domain:** https://www.cloudrent.me

---

## Tech Stack

```json
{
  "framework": "Next.js 15.4.10",
  "cms": "Payload CMS 3.71.1",
  "database": "PostgreSQL (via @payloadcms/db-postgres)",
  "styling": "Tailwind CSS 3.4.3",
  "language": "TypeScript 5.7.3",
  "runtime": "React 19.2.1",
  "storage": "Vercel Blob (@payloadcms/storage-vercel-blob)",
  "sitemap": "next-sitemap 4.2.3"
}
```

**Key Dependencies:**
- `@payloadcms/richtext-lexical` - Rich text editing
- `@payloadcms/plugin-seo` - SEO metadata fields
- `@payloadcms/plugin-redirects` - Redirect management
- `lucide-react` - Icon library
- `resend` - Email service
- `twilio` - SMS service
- `sharp` - Image optimization

---

## Directory Structure

```
src/
├── app/
│   ├── (frontend)/           # Main site pages with header/footer
│   │   ├── layout.tsx        # MAIN LAYOUT
│   │   ├── [slug]/           # Dynamic CMS pages
│   │   ├── posts/            # Blog
│   │   ├── features/
│   │   ├── pricing/
│   │   ├── demo/
│   │   ├── contact/
│   │   └── ...
│   │
│   ├── (landing)/            # Conversion-focused pages (NO header/footer)
│   │   ├── layout.tsx        # ISOLATED LAYOUT
│   │   ├── event-hire-software/
│   │   ├── plant-tool-hire-software/
│   │   ├── temp-fence-hire-software/
│   │   └── toilet-hire-software/
│   │
│   ├── (payload)/            # Payload CMS admin
│   ├── api/                  # API routes
│   └── embed/                # Embeddable widgets
│
├── components/               # Shared components
├── blocks/                   # Payload page blocks
├── collections/              # Payload collections
├── Header/                   # Header component
├── Footer/                   # Footer component
├── hooks/                    # React hooks
└── utilities/                # Helper functions
```

---

## Layouts

### Main Layout (`src/app/(frontend)/layout.tsx`)

Used for all standard pages. Includes:
- `<EyebrowBanner>` - Rotating promo banner at top
- `<Header>` - Site navigation (from Payload)
- `{children}` - Page content
- `<Footer>` - Site footer with links
- `<PublicChatWidget>` - Support chat
- `<RevenueLeakPopup>` / `<AIVisibilityPopup>` - Lead capture popups
- `<AdminBar>` - CMS toolbar (draft mode only)
- Analytics: GoogleTagManager, MicrosoftClarity
- Structured data: OrganizationSchema

**Global background:** Dark gradient with subtle grid pattern.

### Landing Layout (`src/app/(landing)/layout.tsx`)

Used for ad landing pages. Isolated for conversion optimization:
- NO header, footer, chat widget, or popups
- Only analytics and OrganizationSchema
- Same dark gradient background

---

## Adding New Pages

### Option 1: CMS Page (via Payload Admin)

1. Login to `/admin`
2. Create new "Page" record
3. Set slug (e.g., "new-feature")
4. Add hero + layout blocks
5. Fill SEO tab (title, description, image)
6. Publish

Page appears at `/new-feature/` automatically.

### Option 2: Hard-Coded Frontend Page

Create in `src/app/(frontend)/your-page/`:

```typescript
// page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Title | CloudRent Pro',
  description: 'Description under 160 chars',
}

export default function YourPage() {
  return <div>Content</div>
}
```

### Option 3: SEO Landing Page (Conversion-Focused)

Create in `src/app/(landing)/your-keyword-software/`:

```typescript
// page.tsx (Server Component - SEO)
import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { JsonLd } from '@/components/StructuredData'
import YourPageClient from './page.client'

export const metadata: Metadata = {
  title: 'Your Keyword Software Australia | CloudRent Pro',
  description: 'Purpose-built rental software for...',
  keywords: ['keyword 1', 'keyword 2', ...],
  alternates: {
    canonical: 'https://www.cloudrent.me/your-keyword-software/',
  },
  openGraph: mergeOpenGraph({
    title: 'Your Keyword Software | CloudRent Pro',
    description: '...',
    url: '/your-keyword-software/',
  }),
}

function generateSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'CloudRent Pro - Your Keyword Software',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Rental Management',
    operatingSystem: 'Web, iOS, Android',
    offers: {
      '@type': 'Offer',
      price: '1.00',
      priceCurrency: 'AUD',
      description: '30-day full access trial',
    },
    featureList: ['Feature 1', 'Feature 2', ...],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '47',
    },
  }
}

export default function YourKeywordPage() {
  return (
    <>
      <JsonLd data={generateSchema()} />
      <YourPageClient />
    </>
  )
}
```

```typescript
// page.client.tsx (Client Component - Interactive UI)
'use client'

import { useEffect } from 'react'
import { useUTMParams } from '@/hooks/useUTMParams'
import { trackLandingPageView, trackLandingPageEvent } from '@/utilities/trackLandingPageEvent'
import { LandingFooter } from '@/components/LandingFooter'
import { EngageCTA } from '@/components/EngageCTA'

export default function YourPageClient() {
  const utmString = useUTMParams()

  useEffect(() => {
    trackLandingPageView('your-keyword')
  }, [])

  const handleTrialClick = () => {
    trackLandingPageEvent('begin_trial', 'your-keyword')
  }

  const trialUrl = `https://app.cloudrent.me/register${utmString}`
  const demoUrl = `/demo${utmString}`

  return (
    <div className="min-h-screen bg-[#08080c]">
      {/* NAV - minimal with logo + CTA */}
      {/* HERO - badge, h1, description, CTAs */}
      {/* STATS - key metrics */}
      {/* PAIN POINTS - problems solved */}
      {/* FEATURES - feature grid */}
      {/* HOW IT WORKS - 4 steps */}
      {/* MOBILE APP - screenshot + benefits */}
      {/* TESTIMONIAL - customer quote */}
      {/* FINAL CTA - pricing + trial button */}
      <EngageCTA />
      <LandingFooter />
    </div>
  )
}
```

---

## SEO Components

### Structured Data (`src/components/StructuredData/index.tsx`)

```typescript
import { JsonLd, OrganizationSchema, SoftwareSchema, HomepageFaqSchema, FAQSchema } from '@/components/StructuredData'

// Generic JSON-LD
<JsonLd data={schemaObject} />

// Organization schema (in layouts)
<OrganizationSchema />

// Software product schema
<SoftwareSchema />

// FAQ schema
<FAQSchema faqs={[{ question: '...', answer: '...' }]} />
```

### Meta Utilities (`src/utilities/`)

```typescript
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { generateMeta } from '@/utilities/generateMeta'
import { getServerSideURL } from '@/utilities/getURL'
```

---

## Landing Page Sections Pattern

Based on `event-hire-software/page.client.tsx`:

1. **Lightbox Modal** - For image previews
2. **Nav** - Fixed, minimal: logo + "Book a Demo" CTA
3. **Hero** - Badge, H1 with gradient text, description, dual CTAs (Trial + Demo)
4. **Stats** - 4 key metrics (e.g., "75% Faster quoting")
5. **Pain Points** - 4 cards showing problems solved (red icons)
6. **Feature Image Section** - Screenshot + bullet points
7. **How It Works** - 4-step process with icons
8. **Event/Use Case Types** - Grid of supported scenarios
9. **Features Grid** - 6 feature cards (purple icons)
10. **Mobile App Section** - Screenshot + benefits
11. **Testimonial** - Quote with large quotation mark
12. **Final CTA** - Large headline, $1 price, trial button, trust badges
13. **EngageCTA** - Shared engagement component
14. **LandingFooter** - Simplified footer

---

## Sitemap Configuration

### `next-sitemap.config.cjs`

```javascript
module.exports = {
  siteUrl: 'https://www.cloudrent.me',
  generateRobotsTxt: true,
  exclude: ['/admin/*', '/api/*', '/posts/*', '/search', '/help/*'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', disallow: ['/admin/*', '/api/*', '/*?kuid=', '/*?kref='] },
      // AI bots explicitly allowed
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      // ... more AI bots
    ],
    additionalSitemaps: [
      'https://www.cloudrent.me/pages-sitemap.xml',
      'https://www.cloudrent.me/posts-sitemap.xml',
    ],
  },
  additionalPaths: async () => [
    { loc: '/', priority: 1.0, changefreq: 'weekly' },
    { loc: '/features', priority: 0.9, changefreq: 'weekly' },
    { loc: '/pricing', priority: 0.9, changefreq: 'weekly' },
    { loc: '/demo', priority: 0.9, changefreq: 'weekly' },
    // ... more static pages
  ],
}
```

### Dynamic Sitemaps

- `src/app/(frontend)/(sitemaps)/pages-sitemap.xml/route.ts` - CMS pages
- `src/app/(frontend)/(sitemaps)/posts-sitemap.xml/route.ts` - Blog posts

---

## Next.js Configuration

### `next.config.js`

```javascript
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'ipjpelt6tqi5wdno.public.blob.vercel-storage.com' },
      { protocol: 'https', hostname: 'img.youtube.com' },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  headers: async () => [
    {
      source: '/:all*(svg|jpg|jpeg|png|webp|avif|woff2)',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
    },
  ],
}

export default withPayload(nextConfig)
```

---

## Common Components

| Component | Path | Usage |
|-----------|------|-------|
| `Header` | `src/Header/Component.tsx` | Main site navigation |
| `Footer` | `src/Footer/Component.tsx` | Site footer with links |
| `LandingFooter` | `src/components/LandingFooter` | Simplified footer for landing pages |
| `EngageCTA` | `src/components/EngageCTA` | Engagement call-to-action |
| `EyebrowBanner` | `src/components/EyebrowBanner` | Rotating promo banner |
| `JsonLd` | `src/components/StructuredData` | JSON-LD schema renderer |
| `Logo` | `src/components/Logo` | Brand logo |

---

## Payload CMS Collections

| Collection | Purpose |
|------------|---------|
| Pages | Website pages (hero + blocks + SEO) |
| Posts | Blog articles |
| Media | Images/files (Vercel Blob) |
| Categories | Content categorization |
| Users | CMS accounts |
| Videos | Video content |
| Bookings | Demo/trial submissions |

---

## Available Blocks

Located in `src/blocks/`:

- **Archive** - Collection archive (posts list)
- **Banner** - Simple banner
- **Benefits** - Features/benefits cards
- **CallToAction** - CTA section
- **Content** - Rich text (Lexical)
- **FinalCTA** - End-of-page CTA
- **Form** - Form builder
- **Hero** - Page hero (CloudRent, HighImpact, MediumImpact, LowImpact)
- **HTML** - Custom HTML
- **MediaBlock** - Image/video with text
- **RelatedPosts** - Blog recommendations
- **ShipFast** - Feature showcase
- **Testimonial** - Customer quote

---

## Build Scripts

```bash
pnpm dev          # Development server
pnpm build        # Build Next.js + Payload
pnpm postbuild    # Generate sitemap
pnpm start        # Production server
pnpm lint         # ESLint check
pnpm db:migrate   # Run Payload migrations (manual)
```

---

## Vercel Deployment & Migrations

**CRITICAL: Never add automatic migrations to builds.**

Payload CMS migrations are run **manually** via `pnpm db:migrate`, not automatically during builds.

### Why No Automatic Migrations

Adding `payload migrate` to `prebuild` causes 15-17 minute build times because Payload must fully bootstrap (load all collections, plugins, compile TypeScript) even when no migrations are pending.

```json
// ❌ NEVER DO THIS - adds 15+ minutes to every deploy
"prebuild": "payload migrate"

// ✅ CORRECT - migrations run manually when needed
"db:migrate": "payload migrate"
```

### When to Run Migrations

Run `pnpm db:migrate` **only** when:
1. You've added a new collection
2. You've modified collection fields
3. You've created a new migration file

### Migration Workflow

```bash
# 1. Make schema changes to collections
# 2. Generate migration
pnpm payload migrate:create

# 3. Review generated migration in src/migrations/
# 4. Run migration locally
pnpm db:migrate

# 5. Commit and deploy - build will be fast (~1-2 min)
git add . && git commit -m "feat: Add new collection"
git push
```

---

## Key File References

| File | Purpose |
|------|---------|
| `src/app/(frontend)/layout.tsx` | Main site layout |
| `src/app/(landing)/layout.tsx` | Landing page layout |
| `src/app/(frontend)/[slug]/page.tsx` | Dynamic CMS page renderer |
| `src/app/(landing)/event-hire-software/page.tsx` | SEO landing page example |
| `src/components/StructuredData/index.tsx` | JSON-LD schemas |
| `src/utilities/mergeOpenGraph.ts` | OpenGraph helper |
| `next-sitemap.config.cjs` | Sitemap rules |
| `next.config.js` | Next.js configuration |
| `tailwind.config.mjs` | Tailwind theme |

---

## Design System

**Colors:**
- Brand purple: `#881ba9` (used in gradients)
- Background: `#0a0a1a` / `#08080c`
- Border: `white/[0.08]`
- Text: `white`, `white/60`, `white/50`, `white/40`

**Typography:**
- Font: Inter (variable, 400-700)
- Headings: `font-black` (900 weight)

**Common Patterns:**
- Cards: `rounded-2xl border border-white/[0.08] bg-white/[0.02]`
- CTAs: `rounded-xl bg-purple-600 hover:bg-purple-500`
- Gradients: `bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-transparent`
