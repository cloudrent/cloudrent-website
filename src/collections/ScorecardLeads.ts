import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const ScorecardLeads: CollectionConfig = {
  slug: 'scorecard-leads',
  access: {
    create: anyone, // Public can create via API
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'businessName',
    defaultColumns: ['businessName', 'email', 'score', 'level', 'leakMonthly', 'status', 'createdAt'],
    group: 'Leads',
    description: 'Leads captured from the Revenue Leak Scorecard',
  },
  fields: [
    // Contact Information
    {
      type: 'row',
      fields: [
        {
          name: 'businessName',
          type: 'text',
          admin: { width: '50%' },
        },
        {
          name: 'email',
          type: 'email',
          required: true,
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'industry',
      type: 'select',
      options: [
        { label: 'Construction & Plant', value: 'construction' },
        { label: 'Event & Party', value: 'event' },
        { label: 'Tool Hire', value: 'tool' },
        { label: 'Scaffolding & Fencing', value: 'scaffold' },
        { label: 'AV & Film', value: 'av' },
        { label: 'Other', value: 'other' },
      ],
      admin: { width: '50%' },
    },

    // Scorecard Results
    {
      type: 'row',
      fields: [
        {
          name: 'score',
          type: 'number',
          required: true,
          min: 0,
          max: 100,
          admin: {
            width: '25%',
            description: 'Score out of 100',
          },
        },
        {
          name: 'level',
          type: 'number',
          min: 1,
          max: 5,
          admin: {
            width: '25%',
            description: 'Level 1-5',
          },
        },
        {
          name: 'levelName',
          type: 'text',
          admin: {
            width: '50%',
            readOnly: true,
          },
        },
      ],
    },

    // Revenue Leak
    {
      type: 'row',
      fields: [
        {
          name: 'leakMonthly',
          type: 'number',
          admin: {
            width: '50%',
            description: 'Estimated monthly revenue leak ($)',
          },
        },
        {
          name: 'leakAnnual',
          type: 'number',
          admin: {
            width: '50%',
            description: 'Estimated annual revenue leak ($)',
          },
        },
      ],
    },

    // Pillar Scores
    {
      name: 'pillarScores',
      type: 'group',
      admin: {
        description: 'Individual pillar scores (0-10)',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'bookingsQuotes',
              label: 'Bookings & Quotes',
              type: 'number',
              min: 0,
              max: 10,
              admin: { width: '50%' },
            },
            {
              name: 'invoicingCash',
              label: 'Invoicing & Cash',
              type: 'number',
              min: 0,
              max: 10,
              admin: { width: '50%' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'dispatchLogistics',
              label: 'Dispatch & Logistics',
              type: 'number',
              min: 0,
              max: 10,
              admin: { width: '50%' },
            },
            {
              name: 'equipmentDamage',
              label: 'Equipment & Damage',
              type: 'number',
              min: 0,
              max: 10,
              admin: { width: '50%' },
            },
          ],
        },
        {
          name: 'teamCompliance',
          label: 'Team & Compliance',
          type: 'number',
          min: 0,
          max: 10,
          admin: { width: '50%' },
        },
      ],
    },

    // Weakest/Strongest
    {
      type: 'row',
      fields: [
        {
          name: 'weakestPillar',
          type: 'text',
          admin: {
            width: '50%',
            readOnly: true,
          },
        },
        {
          name: 'strongestPillar',
          type: 'text',
          admin: {
            width: '50%',
            readOnly: true,
          },
        },
      ],
    },

    // Objection captured
    {
      name: 'objection',
      type: 'select',
      options: [
        { label: 'Too busy to migrate', value: 'busy' },
        { label: 'Team won\'t adopt', value: 'adoption' },
        { label: 'Too complex', value: 'complexity' },
        { label: 'Price concerns', value: 'cost' },
        { label: 'Ready to move', value: 'ready' },
      ],
      admin: {
        description: 'What would hold them back from switching',
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
        { label: 'Trial Started', value: 'trial_started' },
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
      name: 'source',
      type: 'select',
      defaultValue: 'scorecard_page',
      options: [
        { label: 'Scorecard Page', value: 'scorecard_page' },
        { label: 'Homepage Modal', value: 'homepage_modal' },
      ],
      admin: { position: 'sidebar' },
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
