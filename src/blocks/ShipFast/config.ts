import type { Block } from 'payload'

export const ShipFast: Block = {
  slug: 'shipFast',
  interfaceName: 'ShipFastBlock',
  labels: {
    singular: 'Ship Fast',
    plural: 'Ship Fast',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      defaultValue: 'Built different',
    },
    {
      name: 'headline',
      type: 'text',
      defaultValue: 'We ship fast',
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: "Got a feature request? We don't add it to a backlog that never moves. We build it—usually within weeks. Your feedback directly shapes the product.",
    },
    {
      name: 'stats',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
      defaultValue: [
        { value: '2-4', label: 'weeks average feature delivery' },
        { value: '24hr', label: 'bug fix turnaround' },
        { value: 'Direct', label: 'access to developers' },
      ],
    },
    {
      name: 'ctaLabel',
      type: 'text',
      defaultValue: 'Request a Feature',
    },
    {
      name: 'ctaUrl',
      type: 'text',
      defaultValue: '/contact',
    },
  ],
}
