import React from 'react'

interface FAQItem {
  question: string
  answer: string
}

// Generic JSON-LD component
interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[]
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// Organization schema - used site-wide
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://www.cloudrent.me/#organization',
  name: 'CloudRent',
  legalName: 'CloudRent Pty Ltd',
  url: 'https://www.cloudrent.me',
  logo: 'https://www.cloudrent.me/images/cloudrent-logo.png',
  description:
    'Australian-built rental management software for hire businesses. Manage equipment, bookings, dispatch, invoicing and safety in one platform.',
  foundingDate: '2017',
  founder: {
    '@type': 'Person',
    name: 'Ron Neville',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Mudgeeraba',
    addressRegion: 'QLD',
    addressCountry: 'AU',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+61-7-3171-2948',
    contactType: 'sales',
    areaServed: 'AU',
    availableLanguage: 'en',
  },
  sameAs: [
    'https://www.facebook.com/CloudRentSoftware',
    'https://twitter.com/cloudrental',
    'https://www.instagram.com/cloudrental',
    'https://www.linkedin.com/company/cloudrent',
    'https://www.youtube.com/@cloudrent',
  ],
  identifier: {
    '@type': 'PropertyValue',
    propertyID: 'ABN',
    value: '55619933167',
  },
}

// SoftwareApplication schema - for product pages
const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': 'https://www.cloudrent.me/#software',
  name: 'CloudRent Pro',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Equipment Rental Management Software',
  operatingSystem: 'Web, iOS, Android',
  description:
    'All-in-one rental management software for equipment hire businesses. Real-time availability, AI damage detection, digital signatures, dispatch, invoicing, and Xero integration.',
  url: 'https://www.cloudrent.me',
  publisher: { '@id': 'https://www.cloudrent.me/#organization' },
  offers: {
    '@type': 'Offer',
    price: '85.00',
    priceCurrency: 'AUD',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: '85.00',
      priceCurrency: 'AUD',
      unitText: 'user/month',
    },
    availability: 'https://schema.org/InStock',
    url: 'https://www.cloudrent.me/pricing/',
  },
  featureList: [
    'Real-time equipment availability',
    'AI-powered damage detection',
    'Digital signatures',
    'Dispatch and job management',
    'Customer self-service portal',
    'Invoicing and Xero integration',
    'Mobile apps for managers and drivers',
    'Safety and WHS compliance tracking',
    'GPS tracking and time clock',
  ],
  screenshot: 'https://www.cloudrent.me/images/cloudrent-rental-software-all-devices.webp',
}

// Homepage FAQ schema
const homepageFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is this suitable for small and multi-location rental businesses?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. CloudRent Pro works for single-location operators and scales to multi-location hire businesses with location-based inventory, staff assignments and reporting.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can we manage safety and compliance in the same system?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. CloudRent Pro includes SWMS, incident tracking, inspections, digital signatures and the AlertVisionAI fatigue management camera system, all in one platform.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does it work on mobile?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. CloudRent Command (for managers and admins) and CloudRent Crew (for drivers and warehouse) are native mobile apps for iOS and Android, with offline support.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can customers book and pay online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. CloudRent Connect is a 24/7 customer self-service portal where customers can check availability, book equipment, sign documents and pay invoices.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this built for Australian businesses?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. CloudRent is 100% Australian built and owned, based on the Gold Coast. GST handling, Xero integration and Australian compliance are built in.',
      },
    },
    {
      '@type': 'Question',
      name: 'How quickly can we get started?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most launch partners are running on CloudRent Pro within a week. Free data migration, direct onboarding support and a 30-day money-back guarantee are included.',
      },
    },
  ],
}

// Article schema builder for blog posts
interface ArticleSchemaProps {
  title: string
  description: string
  slug: string
  datePublished: string
  dateModified?: string
  author?: string
  image?: string
}

export function articleSchema(post: ArticleSchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: post.image || 'https://www.cloudrent.me/images/cloudrent-pro-og-image.webp',
    datePublished: post.datePublished,
    dateModified: post.dateModified || post.datePublished,
    author: {
      '@type': 'Person',
      name: post.author || 'Ron Neville',
    },
    publisher: { '@id': 'https://www.cloudrent.me/#organization' },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.cloudrent.me/posts/${post.slug}/`,
    },
  }
}

// Breadcrumb schema builder
interface BreadcrumbItem {
  name: string
  url: string
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

// Pre-built schema components
export function OrganizationSchema() {
  return <JsonLd data={organizationSchema} />
}

export function SoftwareSchema() {
  return <JsonLd data={softwareApplicationSchema} />
}

export function HomepageFaqSchema() {
  return <JsonLd data={homepageFaqSchema} />
}

export function FAQSchema({ faqs }: { faqs: FAQItem[] }) {
  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
  return <JsonLd data={faqData} />
}

export function ArticleSchema({ post }: { post: ArticleSchemaProps }) {
  return <JsonLd data={articleSchema(post)} />
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  return <JsonLd data={breadcrumbSchema(items)} />
}

// Legacy StructuredData component for backwards compatibility
interface StructuredDataProps {
  type: 'Organization' | 'SoftwareApplication' | 'FAQPage' | 'WebPage'
  data?: Record<string, unknown>
  faqs?: FAQItem[]
}

export function StructuredData({ type, data, faqs }: StructuredDataProps) {
  let jsonLd: Record<string, unknown> = {}

  switch (type) {
    case 'Organization':
      jsonLd = { ...organizationSchema, ...data }
      break
    case 'SoftwareApplication':
      jsonLd = { ...softwareApplicationSchema, ...data }
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

  return <JsonLd data={jsonLd} />
}
