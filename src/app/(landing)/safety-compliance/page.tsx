import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import SafetyComplianceClient from './page.client'

export const metadata: Metadata = {
  title: 'SWMS & Safety Compliance | CloudRent Pro',
  description:
    'Safe Work Method Statements built into your hire software. CloudRent Pro is the only hire management platform with SWMS compliance built in from day one.',
  alternates: {
    canonical: 'https://www.cloudrent.me/safety-compliance/',
  },
  openGraph: mergeOpenGraph({
    title: 'SWMS & Safety Compliance | CloudRent Pro',
    description:
      'Safe Work Method Statements built into your hire software. CloudRent Pro is the only hire management platform with SWMS compliance built in from day one.',
    url: '/safety-compliance/',
  }),
}

export default function SafetyCompliancePage() {
  return <SafetyComplianceClient />
}
