import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { BreadcrumbSchema, FAQSchema } from '@/components/StructuredData'
import CloudRentVsSpreadsheetsClient from './page.client'

export const metadata: Metadata = {
  title: 'CloudRent vs Spreadsheets | Equipment Hire Software',
  description:
    'See why hire businesses switch from spreadsheets to CloudRent. Real-time availability, automated invoicing, and zero double bookings.',
  keywords: [
    'rental software vs spreadsheets',
    'hire business software',
    'replace spreadsheets hire',
    'equipment hire management',
    'manual booking system',
  ],
  alternates: {
    canonical: 'https://www.cloudrent.me/compare/cloudrent-vs-spreadsheets/',
  },
  openGraph: mergeOpenGraph({
    title: 'CloudRent vs Spreadsheets | Equipment Hire Software',
    description:
      'See why hire businesses switch from spreadsheets to CloudRent. Real-time availability, automated invoicing, and zero double bookings.',
    url: '/compare/cloudrent-vs-spreadsheets/',
  }),
}

const faqs = [
  {
    question: 'Is CloudRent hard to switch to from spreadsheets?',
    answer:
      'Our team handles data migration and onboarding. Most businesses are fully operational within a week.',
  },
  {
    question: 'Will my staff need a lot of training?',
    answer:
      'CloudRent is designed to be intuitive. Most staff are confident after one guided session.',
  },
  {
    question: 'What if my hire business is small?',
    answer:
      "CloudRent is built for growing hire businesses. You don't need to be large to benefit from proper software.",
  },
  {
    question: 'Does CloudRent replace my accounting software?',
    answer:
      'No. CloudRent integrates with Xero so your invoicing and accounts stay in sync automatically.',
  },
]

export default function CloudRentVsSpreadsheetsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.cloudrent.me/' },
          { name: 'Compare', url: 'https://www.cloudrent.me/compare/' },
          {
            name: 'CloudRent vs Spreadsheets',
            url: 'https://www.cloudrent.me/compare/cloudrent-vs-spreadsheets/',
          },
        ]}
      />
      <FAQSchema faqs={faqs} />
      <CloudRentVsSpreadsheetsClient />
    </>
  )
}
