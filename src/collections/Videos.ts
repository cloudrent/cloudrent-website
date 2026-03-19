import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Videos: CollectionConfig = {
  slug: 'videos',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'featured', 'publishedAt'],
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data?.youtubeId) {
          data.youtubeId = data.youtubeId.trim()
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'youtubeId',
      type: 'text',
      required: true,
      admin: {
        description: 'The YouTube video ID (e.g., "dQw4w9WgXcQ" from youtube.com/watch?v=dQw4w9WgXcQ)',
      },
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Custom thumbnail image (recommended: 1920x1080). Falls back to YouTube thumbnail if not set.',
      },
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Product Demo', value: 'demo' },
        { label: 'Tutorial', value: 'tutorial' },
        { label: 'Feature Spotlight', value: 'feature' },
        { label: 'Customer Story', value: 'customer' },
        { label: 'Webinar', value: 'webinar' },
      ],
      defaultValue: 'demo',
      required: true,
    },
    {
      name: 'duration',
      type: 'text',
      admin: {
        description: 'Video duration (e.g., "5:30")',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Feature this video at the top of the videos page',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Lower numbers appear first',
      },
    },
  ],
  defaultSort: 'order',
}
