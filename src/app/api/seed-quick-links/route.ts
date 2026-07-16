import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

const seedLinks = [
  {
    label: 'Help centre',
    url: 'https://app.cloudrent.me/help',
    slug: 'help-centre',
    sortOrder: 1,
    enabled: true,
  },
  {
    label: 'Book a training session',
    url: 'https://www.cloudrent.me/training/',
    slug: 'book-a-training-session',
    sortOrder: 2,
    enabled: true,
  },
  {
    label: 'Leave a Google review',
    url: 'https://g.page/r/CTHTnghv6pgQEBM/review',
    slug: 'leave-a-google-review',
    sortOrder: 3,
    enabled: true,
  },
  {
    label: 'Review us on Capterra',
    url: 'https://reviews.capterra.com/products/new/242602fc-8f85-4e38-bf85-a33f718934e0',
    slug: 'review-us-on-capterra',
    sortOrder: 4,
    enabled: true,
  },
]

export async function POST() {
  const payload = await getPayload({ config: configPromise })
  const results: string[] = []

  for (const link of seedLinks) {
    // Check if already exists
    const existing = await payload.find({
      collection: 'quick-links',
      where: { slug: { equals: link.slug } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      results.push(`Skipped: ${link.label} (already exists)`)
      continue
    }

    await payload.create({
      collection: 'quick-links',
      data: link,
    })
    results.push(`Created: ${link.label}`)
  }

  return NextResponse.json({ success: true, results })
}
