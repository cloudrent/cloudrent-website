import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import AIDamageDetectionPageClient from './page.client'

export const metadata: Metadata = {
  title: 'AI Damage Detection | CloudRent Pro Rental Software',
  description:
    'AI-powered damage detection for hire and rental businesses. Automatically capture, compare, and document equipment condition with before/after photo analysis.',
  alternates: {
    canonical: 'https://www.cloudrent.me/ai-damage-detection/',
  },
  openGraph: mergeOpenGraph({
    title: 'AI Damage Detection | CloudRent Pro Rental Software',
    description:
      'AI-powered damage detection for hire and rental businesses. Automatically capture, compare, and document equipment condition with before/after photo analysis.',
    url: '/ai-damage-detection/',
  }),
}

export default function AIDamageDetectionPage() {
  return <AIDamageDetectionPageClient />
}
