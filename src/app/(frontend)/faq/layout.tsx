import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ | CloudRent Pro - Frequently Asked Questions',
  description:
    'Common questions about CloudRent Pro answered. Pricing, features, Xero integration, mobile apps, data security, migration & more.',
}

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children
}
