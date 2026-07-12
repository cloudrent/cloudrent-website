import type { Metadata } from 'next'
import TrialPageClient from './TrialPageClient'

export const metadata: Metadata = {
  title: 'Start Your $1 Trial | CloudRent Pro — Equipment Hire Software',
  description:
    'Get full access to CloudRent Pro for 30 days for just $1. Bookings, dispatch, invoicing, customer portal — everything included. Cancel anytime.',
  alternates: {
    canonical: 'https://www.cloudrent.me/trial/',
  },
  openGraph: {
    title: 'Start Your $1 Trial | CloudRent Pro',
    description:
      'Run your entire hire business from one platform. Full access for 30 days, just $1. No setup fees, cancel anytime.',
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
