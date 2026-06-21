import type { Metadata } from 'next'
import { Suspense } from 'react'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { BreadcrumbSchema } from '@/components/StructuredData'
import AICheckPageClient from './page.client'

// Enable ISR - regenerate page every hour
export const revalidate = 3600

// SEO metadata
export const metadata: Metadata = {
  title: 'AI Visibility Checker | Is Your Business Found by AI? – CloudRent',
  description:
    'Check if your hire business appears in ChatGPT, Perplexity, Copilot, Gemini and Google AI Overviews. Free AI visibility report with actionable recommendations.',
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
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-purple-500" />
      </div>
    </div>
  )
}
