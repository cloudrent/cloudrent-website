import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

const seedLinks = [
  {
    label: 'Help centre',
    subline: null,
    url: 'https://app.cloudrent.me/help',
    slug: 'help-centre',
    sort_order: 1,
    enabled: true,
    clicks: 0,
  },
  {
    label: 'Book a training session',
    subline: null,
    url: 'https://www.cloudrent.me/training/',
    slug: 'book-a-training-session',
    sort_order: 2,
    enabled: true,
    clicks: 0,
  },
  {
    label: 'Leave a Google review',
    subline: null,
    url: 'https://g.page/r/CTHTnghv6pgQEBM/review',
    slug: 'leave-a-google-review',
    sort_order: 3,
    enabled: true,
    clicks: 0,
  },
  {
    label: 'Review us on Capterra',
    subline: null,
    url: 'https://reviews.capterra.com/products/new/242602fc-8f85-4e38-bf85-a33f718934e0',
    slug: 'review-us-on-capterra',
    sort_order: 4,
    enabled: true,
    clicks: 0,
  },
]

export async function up({ db }: MigrateUpArgs): Promise<void> {
  for (const link of seedLinks) {
    await db.execute(sql`
      INSERT INTO "quick_links" (label, subline, url, slug, sort_order, enabled, clicks, updated_at, created_at)
      VALUES (
        ${link.label},
        ${link.subline},
        ${link.url},
        ${link.slug},
        ${link.sort_order},
        ${link.enabled},
        ${link.clicks},
        NOW(),
        NOW()
      )
      ON CONFLICT (slug) DO NOTHING
    `)
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  const slugs = seedLinks.map((l) => l.slug)
  for (const slug of slugs) {
    await db.execute(sql`DELETE FROM "quick_links" WHERE slug = ${slug}`)
  }
}
