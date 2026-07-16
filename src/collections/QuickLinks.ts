import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

/**
 * Validates that a string is an absolute HTTPS URL
 */
const isAbsoluteHttpsUrl = (value: string | null | undefined): true | string => {
  if (!value) return true // Let required validation handle empty
  try {
    const url = new URL(value)
    if (url.protocol !== 'https:') {
      return 'URL must use HTTPS'
    }
    return true
  } catch {
    return 'Must be a valid absolute URL (e.g. https://example.com)'
  }
}

/**
 * Generates a URL-safe slug from a label
 */
const generateSlug = (label: string): string => {
  return label
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const QuickLinks: CollectionConfig = {
  slug: 'quick-links',
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'slug', 'enabled', 'sortOrder', 'clicks'],
    group: 'Content',
    description: 'Links displayed on links.cloudrent.me',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: ({ req }) => {
      // Authenticated users can see all links
      if (req.user) return true
      // Public can only see enabled links (visibility window filtering done at fetch time)
      return {
        enabled: { equals: true },
      }
    },
    update: authenticated,
  },
  hooks: {
    beforeValidate: [
      ({ data, operation }) => {
        // Auto-generate slug from label if blank on create
        if (operation === 'create' && data && !data.slug && data.label) {
          data.slug = generateSlug(data.label)
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      admin: {
        description: 'Button text, sentence case',
        placeholder: 'Help centre',
      },
    },
    {
      name: 'subline',
      type: 'text',
      admin: {
        description: 'Optional small supporting line under the label',
        placeholder: 'Get answers to common questions',
      },
    },
    {
      name: 'url',
      type: 'text',
      required: true,
      validate: isAbsoluteHttpsUrl,
      admin: {
        description: 'Destination URL (must be absolute HTTPS)',
        placeholder: 'https://app.cloudrent.me/help',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL path for /go/[slug] redirect. Auto-generated from label if blank.',
        placeholder: 'help-centre',
      },
    },
    {
      name: 'sortOrder',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: {
        description: 'Lower numbers appear first',
      },
    },
    {
      name: 'enabled',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Uncheck to hide this link without deleting it',
      },
    },
    {
      name: 'visibleFrom',
      type: 'date',
      admin: {
        description: 'Optional: link becomes visible after this date',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'visibleUntil',
      type: 'date',
      admin: {
        description: 'Optional: link is hidden after this date',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'clicks',
      type: 'number',
      defaultValue: 0,
      admin: {
        readOnly: true,
        description: 'Total clicks via /go/[slug] redirect',
      },
    },
  ],
}
