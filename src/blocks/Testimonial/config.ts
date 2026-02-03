import type { Block } from 'payload'

export const Testimonial: Block = {
  slug: 'testimonial',
  interfaceName: 'TestimonialBlock',
  labels: {
    singular: 'Testimonial',
    plural: 'Testimonials',
  },
  fields: [
    {
      name: 'preHeadline',
      type: 'text',
      defaultValue: 'Trusted by hire businesses across Australia',
    },
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      defaultValue: "We switched from spreadsheets and it's been a game-changer. The Xero integration alone saves us hours every week. And when we asked for a feature, they actually built it within a fortnight.",
    },
    {
      name: 'authorName',
      type: 'text',
      required: true,
      defaultValue: 'Mark Henderson',
    },
    {
      name: 'authorTitle',
      type: 'text',
      defaultValue: 'Henderson Equipment Hire, Brisbane',
    },
    {
      name: 'authorInitials',
      type: 'text',
      defaultValue: 'MH',
    },
  ],
}
