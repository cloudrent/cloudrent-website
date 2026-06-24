import type { Block } from 'payload'

export const HTML: Block = {
  slug: 'html',
  interfaceName: 'HTMLBlock',
  labels: {
    singular: 'HTML',
    plural: 'HTML Blocks',
  },
  fields: [
    {
      name: 'html',
      type: 'code',
      label: 'HTML Code',
      required: true,
      admin: {
        language: 'html',
        description: 'Enter raw HTML. This will be rendered without escaping.',
      },
    },
  ],
}
