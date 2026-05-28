import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import TrainingPageClient from './page.client'

export const metadata: Metadata = {
  title: 'Book a Training Session | CloudRent Pro',
  description:
    'Book a 30-minute training session with our team. Get hands-on help with CloudRent Pro features, onboarding, or implementation.',
  alternates: {
    canonical: 'https://www.cloudrent.me/training/',
  },
  openGraph: mergeOpenGraph({
    title: 'Book a Training Session | CloudRent Pro',
    description:
      'Book a 30-minute training session with our team. Get hands-on help with CloudRent Pro features, onboarding, or implementation.',
    url: '/training/',
  }),
}

export default function TrainingPage() {
  return <TrainingPageClient />
}
