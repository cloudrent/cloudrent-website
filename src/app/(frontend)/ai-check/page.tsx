import type { Metadata } from 'next'
import { Suspense } from 'react'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { BreadcrumbSchema } from '@/components/StructuredData'
import AICheckPageClient from './page.client'

// Enable ISR - regenerate page every hour
export const revalidate = 3600

// SEO metadata
export const metadata: Metadata = {
  title: 'AI Visibility Checker | Is AI Recommending Your Competitors? – CloudRent',
  description:
    'See whether ChatGPT, Gemini, Perplexity and Google AI recommend your business. Free AI visibility report with actionable recommendations.',
  keywords: [
    'AI visibility checker',
    'ChatGPT business search',
    'Perplexity business visibility',
    'AI search optimization',
    'hire business AI presence',
    'equipment rental AI visibility',
  ],
  alternates: {
    canonical: 'https://www.cloudrent.me/ai-check/',
  },
  openGraph: mergeOpenGraph({
    title: 'AI Visibility Checker | Is Your Business Found by AI?',
    description:
      'Check if your hire business appears in ChatGPT, Perplexity, Copilot, Gemini and Google AI Overviews.',
    url: '/ai-check/',
  }),
  robots: {
    index: true,
    follow: true,
  },
}

export default function AICheckPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.cloudrent.me/' },
          { name: 'AI Visibility Checker', url: 'https://www.cloudrent.me/ai-check/' },
        ]}
      />
      <Suspense fallback={<AICheckLoading />}>
        <AICheckPageClient />
      </Suspense>
    </>
  )
}

function AICheckLoading() {
  return (
    <div className="relative min-h-screen bg-[#0e0b14]">
      <div className="mx-auto max-w-3xl px-6 py-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
          Is AI Recommending Your Competitors?
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-white/60">
          See whether ChatGPT, Gemini, Perplexity and Google AI recommend your business.
        </p>
        <div className="mt-12 flex justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-purple-500" />
        </div>
      </div>
    </div>
  )
}
