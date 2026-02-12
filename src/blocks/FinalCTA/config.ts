import type { Block } from 'payload'

export const FinalCTA: Block = {
  slug: 'finalCta',
  interfaceName: 'FinalCtaBlock',
  labels: {
    singular: 'Final CTA',
    plural: 'Final CTAs',
  },
  fields: [
    {
      name: 'headline',
      type: 'text',
      defaultValue: 'Ready to streamline your hire business?',
    },
    {
      name: 'subheadline',
      type: 'text',
      defaultValue: 'Join Australian hire businesses already saving time with CloudRent Pro.',
    },
    {
      name: 'primaryButtonLabel',
      type: 'text',
      defaultValue: 'Start Your Free 30-Day Trial',
    },
    {
      name: 'primaryButtonUrl',
      type: 'text',
      defaultValue: '/contact',
    },
    {
      name: 'secondaryButtonLabel',
      type: 'text',
      defaultValue: 'Book a Demo',
    },
    {
      name: 'secondaryButtonUrl',
      type: 'text',
      defaultValue: '/demo',
    },
    {
      name: 'trustSignals',
      type: 'array',
      fields: [
        {
          name: 'text',
          type: 'text',
        },
      ],
      defaultValue: [
        { text: 'No credit card required' },
        { text: 'Free data migration' },
        { text: 'Cancel anytime' },
      ],
    },
  ],
}
