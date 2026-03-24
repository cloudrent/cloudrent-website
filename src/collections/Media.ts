import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

// Vercel Blob storage base URL - extracted from token
const BLOB_BASE_URL = 'https://ipjpelt6tqi5wdno.public.blob.vercel-storage.com/media'

export const Media: CollectionConfig = {
  slug: 'media',
  folders: true,
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  hooks: {
    afterRead: [
      ({ doc }) => {
        // Transform URLs to use Vercel Blob storage
        if (doc.filename && (!doc.url || doc.url.startsWith('/api/media/file/'))) {
          doc.url = `${BLOB_BASE_URL}/${doc.filename}`
        }
        if (doc.sizes) {
          for (const size of Object.keys(doc.sizes)) {
            const sizeData = doc.sizes[size]
            if (sizeData?.filename && (!sizeData.url || sizeData.url.startsWith('/api/media/file/'))) {
              sizeData.url = `${BLOB_BASE_URL}/${sizeData.filename}`
            }
          }
        }
        return doc
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      //required: true,
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
  ],
  upload: {
    // Using Vercel Blob storage via plugin - no staticDir needed
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
      },
      {
        name: 'small',
        width: 600,
      },
      {
        name: 'medium',
        width: 900,
      },
      {
        name: 'large',
        width: 1400,
      },
      {
        name: 'xlarge',
        width: 1920,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
      },
    ],
  },
}
