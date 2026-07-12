import type { Metadata } from 'next'
import TrialPageClient from './TrialPageClient'

export const metadata: Metadata = {
  title: 'Start your $1 trial — CloudRent Pro',
  description:
    'Run your entire hire business from one platform. Bookings, availability, dispatch, invoicing, digital contracts and a 24/7 customer portal. Full access for 30 days.',
  alternates: {
    canonical: 'https://www.cloudrent.me/trial/',
  },
  openGraph: {
    title: 'Start your $1 trial — CloudRent Pro',
    description:
      'Run your entire hire business from one platform. Full access for 30 days, just $1. Cancel anytime.',
    url: 'https://www.cloudrent.me/trial/',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function TrialPage() {
  return <TrialPageClient />
}
