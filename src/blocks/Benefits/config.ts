import type { Block } from 'payload'

export const Benefits: Block = {
  slug: 'benefits',
  interfaceName: 'BenefitsBlock',
  labels: {
    singular: 'Benefits',
    plural: 'Benefits',
  },
  fields: [
    {
      name: 'headline',
      type: 'text',
      defaultValue: 'Built for how you actually work',
    },
    {
      name: 'subheadline',
      type: 'text',
      defaultValue: 'Not another generic tool. CloudRent Pro is designed specifically for Australian equipment hire businesses.',
    },
    {
      name: 'benefits',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'icon',
          type: 'select',
          defaultValue: 'calendar',
          options: [
            { label: 'Calendar', value: 'calendar' },
            { label: 'Credit Card', value: 'creditCard' },
            { label: 'Shield', value: 'shield' },
            { label: 'Zap', value: 'zap' },
            { label: 'Users', value: 'users' },
            { label: 'Check', value: 'check' },
          ],
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
      defaultValue: [
        {
          icon: 'calendar',
          title: 'Never double-book again',
          description: 'Real-time availability checking across all your equipment. See conflicts before they happen.',
        },
        {
          icon: 'creditCard',
          title: 'Get paid faster',
          description: 'One-click invoicing with Stripe payments. Send payment links that actually get paid.',
        },
        {
          icon: 'shield',
          title: 'Paperwork sorted',
          description: 'Digital signatures, SWMS documents, and inspection forms. All legally compliant.',
        },
        {
          icon: 'zap',
          title: 'Xero in sync',
          description: 'Two-way sync with your accounting. Invoices, contacts, and payments—always up to date.',
        },
      ],
    },
  ],
}
