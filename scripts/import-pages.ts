import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'

const pages = [
  {
    title: 'About',
    slug: 'about',
    hero: {
      type: 'lowImpact' as const,
      richText: {
        root: {
          type: 'root',
          children: [
            {
              type: 'heading',
              tag: 'h1',
              children: [{ type: 'text', text: 'The rental software your business deserves' }],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'CloudRent Pro was born from a simple idea: equipment hire businesses deserve software that actually understands their industry.',
                },
              ],
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
    },
  },
  {
    title: 'Pricing',
    slug: 'pricing',
    hero: {
      type: 'lowImpact' as const,
      richText: {
        root: {
          type: 'root',
          children: [
            {
              type: 'heading',
              tag: 'h1',
              children: [{ type: 'text', text: 'Simple, transparent pricing' }],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'From a single excavator to a fleet of thousands. Choose the plan that fits your business today, scale when you\'re ready.',
                },
              ],
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
    },
  },
  {
    title: 'Features',
    slug: 'features',
    hero: {
      type: 'lowImpact' as const,
      richText: {
        root: {
          type: 'root',
          children: [
            {
              type: 'heading',
              tag: 'h1',
              children: [{ type: 'text', text: 'Powerful features, built for hire.' }],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Ditch the spreadsheets, sticky notes, and workarounds. Real tools solving real problems for Australian equipment rental businesses.',
                },
              ],
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
    },
  },
  {
    title: 'Contact',
    slug: 'contact',
    hero: {
      type: 'lowImpact' as const,
      richText: {
        root: {
          type: 'root',
          children: [
            {
              type: 'heading',
              tag: 'h1',
              children: [{ type: 'text', text: 'Get in Touch' }],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Have a question about CloudRent Pro? Want to see a demo? Our team is here to help you find the perfect solution for your hire business.',
                },
              ],
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
    },
  },
  {
    title: 'Mobile App',
    slug: 'mobile-app',
    hero: {
      type: 'lowImpact' as const,
      richText: {
        root: {
          type: 'root',
          children: [
            {
              type: 'heading',
              tag: 'h1',
              children: [{ type: 'text', text: 'Run your hire business from anywhere.' }],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Complete jobs, inspections, and signatures on the go. Works offline, syncs in real-time, and keeps your whole team connected.',
                },
              ],
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
    },
  },
  {
    title: 'Web Portal',
    slug: 'web-portal',
    hero: {
      type: 'lowImpact' as const,
      richText: {
        root: {
          type: 'root',
          children: [
            {
              type: 'heading',
              tag: 'h1',
              children: [{ type: 'text', text: "Your customers' 24/7 hire desk." }],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Let customers browse equipment, check availability, place orders, track deliveries, and pay invoices - all online, all self-service.',
                },
              ],
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
    },
  },
]

async function importPages() {
  const payload = await getPayload({ config })

  console.log('Importing pages to CMS...\n')

  for (const page of pages) {
    // Check if page already exists
    const existing = await payload.find({
      collection: 'pages',
      where: {
        slug: { equals: page.slug },
      },
    })

    if (existing.docs.length > 0) {
      console.log(`Page "${page.title}" already exists, skipping...`)
      continue
    }

    // Create the page (disableRevalidate to avoid Next.js cache errors in scripts)
    await payload.create({
      collection: 'pages',
      context: {
        disableRevalidate: true,
      },
      data: {
        title: page.title,
        slug: page.slug,
        hero: page.hero,
        layout: [
          {
            blockType: 'content',
            columns: [
              {
                size: 'full',
                richText: {
                  root: {
                    type: 'root',
                    children: [
                      {
                        type: 'paragraph',
                        children: [
                          {
                            type: 'text',
                            text: `This is the ${page.title} page. Edit this content in the CMS admin to add your graphics and content.`,
                          },
                        ],
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    version: 1,
                  },
                },
              },
            ],
          },
        ],
        _status: 'published',
      },
    })

    console.log(`Created page: ${page.title} (/${page.slug})`)
  }

  console.log('\nDone! You can now edit these pages in the admin at /admin/collections/pages')
  process.exit(0)
}

importPages().catch((err) => {
  console.error('Error:', err)
  process.exit(1)
})
