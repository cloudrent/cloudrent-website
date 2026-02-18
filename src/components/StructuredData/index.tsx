import React from 'react'

interface FAQItem {
  question: string
  answer: string
}

interface StructuredDataProps {
  type: 'Organization' | 'SoftwareApplication' | 'FAQPage' | 'WebPage'
  data?: Record<string, unknown>
  faqs?: FAQItem[]
}

export function StructuredData({ type, data, faqs }: StructuredDataProps) {
  let jsonLd: Record<string, unknown> = {}

  switch (type) {
    case 'Organization':
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'CloudRent Pro',
        description: 'Complete rental management software for Australian equipment hire businesses',
        url: 'https://www.cloudrent.me',
        logo: 'https://www.cloudrent.me/cloudrent-logo.svg',
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+61-7-3171-2948',
          contactType: 'sales',
          email: 'sales@cloudrent.me',
          areaServed: 'AU',
          availableLanguage: 'English',
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Gold Coast',
          addressCountry: 'AU',
        },
        sameAs: [
          'https://help.cloudrent.me',
        ],
        ...data,
      }
      break

    case 'SoftwareApplication':
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'CloudRent Pro',
        description: 'Complete rental management software with invoicing, digital signatures, Xero integration, and AI-powered support for Australian hire businesses.',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web, iOS, Android',
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'AUD',
          lowPrice: '49',
          highPrice: '129',
          offerCount: '3',
          offers: [
            {
              '@type': 'Offer',
              name: 'Starter',
              price: '49',
              priceCurrency: 'AUD',
              priceValidUntil: '2026-12-31',
              description: 'For small operators getting started',
            },
            {
              '@type': 'Offer',
              name: 'Professional',
              price: '85',
              priceCurrency: 'AUD',
              priceValidUntil: '2026-12-31',
              description: 'The full toolkit for growing businesses',
            },
            {
              '@type': 'Offer',
              name: 'Business',
              price: '129',
              priceCurrency: 'AUD',
              priceValidUntil: '2026-12-31',
              description: 'For enterprises that demand everything',
            },
          ],
        },
        featureList: [
          'Real-time equipment availability',
          'One-click invoicing',
          'Digital signatures',
          'Xero integration',
          'SWMS documentation',
          'Asset tracking',
          'Customer portal',
          'Mobile app',
          'AI support agent',
        ],
        screenshot: 'https://www.cloudrent.me/images/cloudrent-rental-software-all-devices-mockup.webp',
        ...data,
      }
      break

    case 'FAQPage':
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs?.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
        ...data,
      }
      break

    case 'WebPage':
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        ...data,
      }
      break
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

// Pre-built organization data for site-wide use
export function OrganizationSchema() {
  return <StructuredData type="Organization" />
}

// Software application schema for product pages
export function SoftwareSchema() {
  return <StructuredData type="SoftwareApplication" />
}

// FAQ schema builder
export function FAQSchema({ faqs }: { faqs: FAQItem[] }) {
  return <StructuredData type="FAQPage" faqs={faqs} />
}
