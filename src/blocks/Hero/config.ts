import type { Block } from 'payload'

export const Hero: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  labels: {
    singular: 'Hero',
    plural: 'Heroes',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge Text',
      defaultValue: 'Built in Australia for Australian hire businesses',
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
      label: 'Headline',
      defaultValue: 'Everything you need to manage your hire business.',
    },
    {
      name: 'subheadline',
      type: 'text',
      label: 'Subheadline',
      defaultValue: "If it's not here yet, we'll build it in weeks—not months.",
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      defaultValue: 'Complete rental management software with invoicing, digital signatures, Xero integration, and AI-powered support. All in one place.',
    },
    {
      name: 'primaryCTA',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          defaultValue: 'Start Your Free 30-Day Trial',
        },
        {
          name: 'url',
          type: 'text',
          defaultValue: 'https://app.cloudrent.me/register',
        },
      ],
    },
    {
      name: 'secondaryCTA',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          defaultValue: 'Watch Demo',
        },
        {
          name: 'url',
          type: 'text',
          defaultValue: '/demo',
        },
      ],
    },
    {
      name: 'trustSignals',
      type: 'text',
      defaultValue: 'No credit card required • Free migration from spreadsheets • Cancel anytime',
    },
  ],
}
