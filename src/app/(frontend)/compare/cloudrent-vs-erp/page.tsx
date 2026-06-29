import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { BreadcrumbSchema, FAQSchema } from '@/components/StructuredData'
import CloudRentVsErpClient from './page.client'

export const metadata: Metadata = {
  title: 'CloudRent vs ERP Systems | Hire Business Software',
  description:
    'See why hire businesses choose CloudRent over generic ERP systems. Purpose-built rental workflows, faster setup, and better fit.',
  keywords: [
    'rental management software',
    'ERP for rental businesses',
    'hire software vs ERP',
    'equipment rental ERP alternative',
    'business software for hire',
  ],
  alternates: {
    canonical: 'https://www.cloudrent.me/compare/cloudrent-vs-erp/',
  },
  openGraph: mergeOpenGraph({
    title: 'CloudRent vs ERP Systems | Hire Business Software',
    description:
      'See why hire businesses choose CloudRent over generic ERP systems. Purpose-built rental workflows, faster setup, and better fit.',
    url: '/compare/cloudrent-vs-erp/',
  }),
}

const faqs = [
  {
    question: 'Can CloudRent handle the complexity of a large hire operation?',
    answer:
      'Yes. CloudRent is used by hire businesses managing hundreds of assets across multiple locations.',
  },
  {
    question: 'What if we are already using an ERP for accounting?',
    answer:
      'CloudRent integrates with Xero. Your accounts team can keep using their existing system.',
  },
  {
    question: 'How long does it take to get set up?',
    answer:
      'Most businesses are operational within a few days. Our team handles migration and onboarding.',
  },
  {
    question: 'Is CloudRent suitable if we hire a wide range of equipment types?',
    answer:
      'Yes. CloudRent supports any hire category — plant, tools, event, fencing, toilets, and more.',
  },
]

export default function CloudRentVsErpPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.cloudrent.me/' },
          { name: 'Compare', url: 'https://www.cloudrent.me/compare/' },
          {
            name: 'CloudRent vs ERP Systems',
            url: 'https://www.cloudrent.me/compare/cloudrent-vs-erp/',
          },
        ]}
      />
      <FAQSchema faqs={faqs} />
      <CloudRentVsErpClient />
    </>
  )
}
