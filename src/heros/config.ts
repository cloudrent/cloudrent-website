import type { Field } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'cloudrent',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'CloudRent (Marketing)',
          value: 'cloudrent',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
      ],
      required: true,
    },
    // CloudRent hero fields
    {
      name: 'badge',
      type: 'text',
      label: 'Badge Text',
      defaultValue: 'Built in Australia for Australian hire businesses',
      admin: {
        condition: (_, { type } = {}) => type === 'cloudrent',
      },
    },
    {
      name: 'headline',
      type: 'text',
      label: 'Headline',
      defaultValue: 'Everything you need to manage your hire business.',
      admin: {
        condition: (_, { type } = {}) => type === 'cloudrent',
      },
    },
    {
      name: 'subheadline',
      type: 'text',
      label: 'Subheadline',
      defaultValue: "If it's not here yet, we'll build it in weeks—not months.",
      admin: {
        condition: (_, { type } = {}) => type === 'cloudrent',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      defaultValue: 'Complete rental management software with invoicing, digital signatures, Xero integration, and AI-powered support. All in one place.',
      admin: {
        condition: (_, { type } = {}) => type === 'cloudrent',
      },
    },
    {
      name: 'primaryButtonLabel',
      type: 'text',
      defaultValue: 'Start Your Free 30-Day Trial',
      admin: {
        condition: (_, { type } = {}) => type === 'cloudrent',
      },
    },
    {
      name: 'primaryButtonUrl',
      type: 'text',
      defaultValue: 'https://app.cloudrent.me/register',
      admin: {
        condition: (_, { type } = {}) => type === 'cloudrent',
      },
    },
    {
      name: 'secondaryButtonLabel',
      type: 'text',
      defaultValue: 'Watch Demo',
      admin: {
        condition: (_, { type } = {}) => type === 'cloudrent',
      },
    },
    {
      name: 'secondaryButtonUrl',
      type: 'text',
      defaultValue: '/demo',
      admin: {
        condition: (_, { type } = {}) => type === 'cloudrent',
      },
    },
    {
      name: 'trustSignals',
      type: 'text',
      defaultValue: 'No credit card required • Free migration from spreadsheets • Cancel anytime',
      admin: {
        condition: (_, { type } = {}) => type === 'cloudrent',
      },
    },
    // Standard hero fields
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact', 'lowImpact'].includes(type),
      },
    },
    linkGroup({
      overrides: {
        maxRows: 2,
        admin: {
          condition: (_, { type } = {}) => ['highImpact', 'mediumImpact', 'lowImpact'].includes(type),
        },
      },
    }),
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
      },
      relationTo: 'media',
      required: false,
    },
  ],
  label: false,
}
