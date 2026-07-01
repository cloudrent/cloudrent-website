import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'

interface RoadmapSeedItem {
  title: string
  description: string
  status: 'shipped' | 'in-progress' | 'planned'
  category: string
  product: string
  quarter?: string
  learnMoreUrl?: string
  order: number
}

const items: RoadmapSeedItem[] = [
  // SHIPPED
  {
    title: 'Logistics and dispatch module',
    description:
      'Visual dispatch board with drag-and-drop crew and vehicle assignment, real-time status updates, and route suggestions.',
    status: 'shipped',
    category: 'Dispatch',
    product: 'CloudRent Pro',
    learnMoreUrl: '/features/#dispatch',
    order: 1,
  },
  {
    title: 'Staff management and rostering',
    description:
      'Staff profiles, role-based permissions, shift scheduling, time clock with GPS capture, and team chat.',
    status: 'shipped',
    category: 'Staff',
    product: 'CloudRent Pro',
    learnMoreUrl: '/features/#staff',
    order: 2,
  },
  {
    title: 'CloudRent Crew mobile app',
    description:
      'Native iOS and Android app for drivers and warehouse staff. Job lists, delivery workflows, damage capture, digital signatures, and offline support.',
    status: 'shipped',
    category: 'Mobile',
    product: 'CloudRent Crew',
    learnMoreUrl: '/mobile-app/',
    order: 3,
  },
  {
    title: 'Xero two-way integration',
    description:
      'Invoices, payments, and customer records sync automatically between CloudRent and Xero.',
    status: 'shipped',
    category: 'Integrations',
    product: 'CloudRent Pro',
    learnMoreUrl: '/features/#payments',
    order: 4,
  },
  {
    title: 'Digital contracts and signatures',
    description:
      'Auto-generate hire agreements, send for signature via email, capture on any device, and store tamper-proof signed PDFs.',
    status: 'shipped',
    category: 'Invoicing',
    product: 'CloudRent Pro',
    learnMoreUrl: '/features/#signatures',
    order: 5,
  },
  {
    title: 'Quote digital signature flow',
    description:
      'Customer reviews itemised quote, agrees to terms, signs, and rental auto-confirms. Full audit trail with IP, browser, and timestamp.',
    status: 'shipped',
    category: 'Invoicing',
    product: 'CloudRent Pro',
    learnMoreUrl: '/features/#signatures',
    order: 6,
  },
  {
    title: 'Real-time availability tracking',
    description:
      'Live inventory availability updates instantly as bookings are created, changed, or cancelled. Conflict detection prevents double bookings.',
    status: 'shipped',
    category: 'Inventory',
    product: 'CloudRent Pro',
    learnMoreUrl: '/features/#equipment',
    order: 7,
  },
  {
    title: 'Customer self-service portal',
    description:
      'Customers can browse equipment, request quotes, view rental history, download invoices, sign contracts, and pay online.',
    status: 'shipped',
    category: 'Customer Portal',
    product: 'CloudRent Connect',
    learnMoreUrl: '/web-portal/',
    order: 8,
  },
  {
    title: 'Dispatch photo documentation',
    description:
      'Precheck and return photos captured per rental item. Condition notes, photo arrays, and signed delivery proofs stored against each task.',
    status: 'shipped',
    category: 'Safety',
    product: 'CloudRent Crew',
    learnMoreUrl: '/features/#safety',
    order: 9,
  },
  {
    title: 'WhatsApp Business integration',
    description:
      'Two-way WhatsApp notifications for rental confirmations, delivery ETAs, invoices, and payments. SMS fallback if WhatsApp fails.',
    status: 'shipped',
    category: 'Customer Portal',
    product: 'All Products',
    learnMoreUrl: '/features/#crm',
    order: 10,
  },
  {
    title: 'AI support agent',
    description:
      'Powered by Claude. Voice mode with live waveform, customer and equipment lookup, availability checks, and quote creation via natural language.',
    status: 'shipped',
    category: 'AI',
    product: 'CloudRent Pro',
    learnMoreUrl: '/features/#damage',
    order: 11,
  },
  {
    title: 'Brochure and catalogue generation',
    description:
      'Professional single-item brochures and multi-page equipment catalogues with company branding, pricing toggle, QR codes, and PDF export.',
    status: 'shipped',
    category: 'Inventory',
    product: 'CloudRent Pro',
    learnMoreUrl: '/features/#equipment',
    order: 12,
  },
  {
    title: 'Percentage surcharges and damage waivers',
    description:
      'Optional surcharge as a percentage of equipment subtotal. Configurable label, rate, and recurring behaviour. Toggle per rental.',
    status: 'shipped',
    category: 'Invoicing',
    product: 'CloudRent Pro',
    learnMoreUrl: '/features/#payments',
    order: 13,
  },
  {
    title: 'Advanced reporting hub',
    description:
      'Revenue, utilisation, outstanding invoices, customer performance, and team reporting in one place.',
    status: 'shipped',
    category: 'Reporting',
    product: 'CloudRent Pro',
    order: 14,
  },
  {
    title: 'Module visibility toggles',
    description:
      'Show or hide sidebar modules to match your business. 13 configurable modules including Day Book, Dispatch, POS, Maintenance, Safety, and Reports.',
    status: 'shipped',
    category: 'Platform',
    product: 'CloudRent Pro',
    order: 15,
  },
  {
    title: 'CRM task management',
    description:
      'Task list with priority levels, 8 task types, checklist support, due dates, staff assignment, and company or lead linking.',
    status: 'shipped',
    category: 'Staff',
    product: 'CloudRent Pro',
    learnMoreUrl: '/features/#crm',
    order: 16,
  },
  {
    title: 'Point of sale (POS)',
    description:
      'Walk-in customer sales with cash drawer management, barcode scanning, bond collection, end-of-day reconciliation, and receipt printing.',
    status: 'shipped',
    category: 'Invoicing',
    product: 'CloudRent Pro',
    learnMoreUrl: '/features/#payments',
    order: 17,
  },
  {
    title: 'Service jobs and maintenance',
    description:
      'Service job creation for deliveries, pickups, operators, and custom services. Site scheduling, technician assignment, and maintenance tracking.',
    status: 'shipped',
    category: 'Platform',
    product: 'CloudRent Pro',
    learnMoreUrl: '/features/#dispatch',
    order: 18,
  },
  {
    title: 'QuickBooks integration',
    description: 'Two-way invoice and contact sync between CloudRent and QuickBooks Online.',
    status: 'shipped',
    category: 'Integrations',
    product: 'CloudRent Pro',
    learnMoreUrl: '/features/#payments',
    order: 19,
  },

  // IN PROGRESS
  {
    title: 'MYOB integration',
    description:
      'Two-way sync between CloudRent invoicing and MYOB AccountRight and Essentials.',
    status: 'in-progress',
    category: 'Integrations',
    product: 'CloudRent Pro',
    quarter: 'Q3 2026',
    order: 1,
  },
  {
    title: 'Multi-location support',
    description:
      'Manage inventory, staff, and bookings across multiple depots from a single account.',
    status: 'in-progress',
    category: 'Inventory',
    product: 'CloudRent Pro',
    quarter: 'Q3 2026',
    order: 2,
  },
  {
    title: 'Public API',
    description:
      'REST API for custom integrations, data export, and third-party platform connections.',
    status: 'in-progress',
    category: 'Platform',
    product: 'CloudRent Pro',
    quarter: 'Q3 2026',
    order: 3,
  },

  // PLANNED
  {
    title: 'Zapier integration',
    description: 'Connect CloudRent to thousands of apps via Zapier without writing code.',
    status: 'planned',
    category: 'Integrations',
    product: 'CloudRent Pro',
    quarter: 'Q4 2026',
    order: 1,
  },
  {
    title: 'White-label option',
    description:
      'Brand CloudRent with your own logo, colours, and domain for reseller and enterprise customers.',
    status: 'planned',
    category: 'Platform',
    product: 'CloudRent Pro',
    quarter: 'Q4 2026',
    order: 2,
  },
  {
    title: 'Advanced analytics dashboard',
    description:
      'Custom report builder, revenue forecasting, customer lifetime value, and trend analysis.',
    status: 'planned',
    category: 'Reporting',
    product: 'CloudRent Pro',
    quarter: 'Q4 2026',
    order: 3,
  },
  {
    title: 'CloudRent Command mobile app',
    description:
      'Manager and admin mobile app for real-time oversight, approvals, and team coordination on the go.',
    status: 'planned',
    category: 'Mobile',
    product: 'CloudRent Command',
    learnMoreUrl: '/mobile-app/',
    quarter: 'Q4 2026',
    order: 4,
  },
]

async function seedRoadmap() {
  const payload = await getPayload({ config })

  console.log('Seeding roadmap items...')
  console.log(`Total items to seed: ${items.length}`)

  // First, check if any items already exist
  const existing = await payload.find({
    collection: 'roadmap-items',
    limit: 1,
  })

  if (existing.docs.length > 0) {
    console.log('Roadmap items already exist. Delete all existing items first? (y/n)')
    console.log('To delete and re-seed, run: payload.delete({ collection: "roadmap-items", where: {} })')
    console.log('Skipping seed to avoid duplicates.')
    process.exit(0)
  }

  let created = 0
  for (const item of items) {
    await payload.create({
      collection: 'roadmap-items',
      data: item,
    })
    created++
    console.log(`[${created}/${items.length}] Created: ${item.title}`)
  }

  console.log(`\nDone! Created ${created} roadmap items.`)
  console.log(`  - Shipped: ${items.filter((i) => i.status === 'shipped').length}`)
  console.log(`  - In Progress: ${items.filter((i) => i.status === 'in-progress').length}`)
  console.log(`  - Planned: ${items.filter((i) => i.status === 'planned').length}`)

  process.exit(0)
}

seedRoadmap().catch((err) => {
  console.error('Error seeding roadmap:', err)
  process.exit(1)
})

// Run: npx ts-node --project tsconfig.json scripts/seed-roadmap.ts
