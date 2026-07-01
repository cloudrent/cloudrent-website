import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const RoadmapItems: CollectionConfig = {
  slug: 'roadmap-items',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'category', 'product', 'quarter'],
    group: 'Content',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
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
    {
      name: 'status',
      type: 'select',
      required: true,
      options: [
        { label: 'Shipped', value: 'shipped' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Planned', value: 'planned' },
      ],
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Dispatch', value: 'Dispatch' },
        { label: 'Invoicing', value: 'Invoicing' },
        { label: 'Mobile', value: 'Mobile' },
        { label: 'Integrations', value: 'Integrations' },
        { label: 'Inventory', value: 'Inventory' },
        { label: 'Customer Portal', value: 'Customer Portal' },
        { label: 'Reporting', value: 'Reporting' },
        { label: 'Staff', value: 'Staff' },
        { label: 'AI', value: 'AI' },
        { label: 'Safety', value: 'Safety' },
        { label: 'Platform', value: 'Platform' },
      ],
    },
    {
      name: 'product',
      type: 'select',
      required: true,
      options: [
        { label: 'CloudRent Pro', value: 'CloudRent Pro' },
        { label: 'CloudRent Crew', value: 'CloudRent Crew' },
        { label: 'CloudRent Command', value: 'CloudRent Command' },
        { label: 'CloudRent Connect', value: 'CloudRent Connect' },
        { label: 'All Products', value: 'All Products' },
      ],
    },
    {
      name: 'quarter',
      type: 'text',
      admin: {
        description: 'e.g. Q3 2026 — shown on in-progress and planned items only',
        placeholder: 'Q3 2026',
      },
    },
    {
      name: 'learnMoreUrl',
      type: 'text',
      admin: {
        description:
          'Optional deep link to a feature page or anchor. e.g. /features/#dispatch or /mobile-app/',
        placeholder: '/features/#dispatch',
      },
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        description: 'Controls display order within each status column. Lower numbers appear first.',
      },
    },
  ],
}
