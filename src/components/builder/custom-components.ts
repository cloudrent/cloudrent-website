import { BenefitsBlock } from '@/blocks/Benefits/Component'
import { TestimonialBlock } from '@/blocks/Testimonial/Component'
import { FinalCtaBlock } from '@/blocks/FinalCTA/Component'
import type { RegisteredComponent } from '@builder.io/sdk-react'

// Register existing Payload blocks as Builder.io custom components
// This allows visual editing with the same UI components

export const builderCustomComponents: RegisteredComponent[] = [
  {
    component: BenefitsBlock,
    name: 'Benefits',
    inputs: [
      { name: 'headline', type: 'string', friendlyName: 'Headline' },
      { name: 'subheadline', type: 'string', friendlyName: 'Subheadline' },
      {
        name: 'benefits',
        type: 'list',
        friendlyName: 'Benefits List',
        subFields: [
          {
            name: 'icon',
            type: 'string',
            friendlyName: 'Icon',
            enum: ['calendar', 'creditCard', 'shield', 'zap', 'users', 'check'],
          },
          { name: 'title', type: 'string', required: true, friendlyName: 'Title' },
          { name: 'description', type: 'string', friendlyName: 'Description' },
        ],
      },
    ],
  },
  {
    component: TestimonialBlock,
    name: 'Testimonial',
    inputs: [
      { name: 'preHeadline', type: 'string', friendlyName: 'Pre-headline' },
      { name: 'quote', type: 'longText', required: true, friendlyName: 'Quote' },
      { name: 'authorName', type: 'string', required: true, friendlyName: 'Author Name' },
      { name: 'authorTitle', type: 'string', friendlyName: 'Author Title' },
      { name: 'authorInitials', type: 'string', friendlyName: 'Author Initials' },
    ],
  },
  {
    component: FinalCtaBlock,
    name: 'Final CTA',
    inputs: [
      { name: 'headline', type: 'string', friendlyName: 'Headline' },
      { name: 'subheadline', type: 'string', friendlyName: 'Subheadline' },
      { name: 'primaryButtonLabel', type: 'string', friendlyName: 'Primary Button Label' },
      { name: 'primaryButtonUrl', type: 'url', friendlyName: 'Primary Button URL' },
      { name: 'secondaryButtonLabel', type: 'string', friendlyName: 'Secondary Button Label' },
      { name: 'secondaryButtonUrl', type: 'url', friendlyName: 'Secondary Button URL' },
      {
        name: 'trustSignals',
        type: 'list',
        friendlyName: 'Trust Signals',
        subFields: [{ name: 'text', type: 'string', friendlyName: 'Text' }],
      },
    ],
  },
]
