import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | CloudRent Pro Support & Sales',
  description:
    'Get in touch with CloudRent Pro. Sales enquiries, support requests, or just say hello. Australian-based team ready to help your hire business.',
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
