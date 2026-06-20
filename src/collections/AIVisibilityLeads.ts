import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const AIVisibilityLeads: CollectionConfig = {
  slug: 'ai-visibility-leads',
  access: {
    create: anyone, // Public can create via API
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'businessName',
    defaultColumns: ['businessName', 'email', 'score', 'totalEngines', 'status', 'createdAt'],
    group: 'Leads',
    description: 'Leads captured from the AI Visibility Checker',
  },
  fields: [
    // Contact Information
    {
      type: 'row',
      fields: [
        {
          name: 'firstName',
          type: 'text',
          admin: { width: '50%' },
        },
        {
          name: 'businessName',
          type: 'text',
          required: true,
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'email',
          type: 'email',
          required: true,
          admin: { width: '50%' },
        },
        {
          name: 'phone',
          type: 'text',
          admin: { width: '50%' },
        },
      ],
    },

    // Keywords searched
    {
      name: 'keywords',
      type: 'array',
      minRows: 1,
      maxRows: 3,
      fields: [
        {
          name: 'keyword',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description: 'Keywords used for AI visibility search',
      },
    },

    // Results
    {
      type: 'row',
      fields: [
        {
          name: 'score',
          type: 'number',
          admin: {
            width: '25%',
            description: 'Engines where business was found',
          },
        },
        {
          name: 'totalEngines',
          type: 'number',
          admin: {
            width: '25%',
            description: 'Total engines successfully checked',
          },
        },
      ],
    },

    // Engine results as JSON
    {
      name: 'engineResults',
      type: 'json',
      admin: {
        description: 'Detailed results per engine per keyword',
      },
    },

    // Apify tracking
    {
      name: 'apifyRunId',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Apify actor run ID',
      },
    },

    // Lead Management
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Demo Booked', value: 'demo_booked' },
        { label: 'Converted', value: 'converted' },
        { label: 'Lost', value: 'lost' },
      ],
      required: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Internal notes about this lead',
      },
    },
    {
      name: 'emailSent',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        readOnly: true,
        description: 'Report email sent to lead',
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
  defaultSort: '-createdAt',
}
