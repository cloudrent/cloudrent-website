import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { JsonLd } from '@/components/StructuredData'
import GlossaryPageClient from './page.client'

export const metadata: Metadata = {
  title: 'Equipment Rental Glossary | Hire Industry Terms Australia',
  description:
    'Comprehensive glossary of equipment rental and hire industry terminology. Learn about scaffold hire, plant hire, tool hire, wet hire, dry hire, SWMS, and more Australian rental terms.',
  keywords: [
    'equipment rental glossary',
    'hire industry terms',
    'scaffold hire meaning',
    'plant hire definition',
    'tool hire terminology',
    'wet hire vs dry hire',
    'rental industry glossary',
    'equipment hire terms Australia',
    'construction rental terminology',
    'SWMS meaning',
  ],
  alternates: {
    canonical: 'https://www.cloudrent.me/glossary/',
  },
  openGraph: mergeOpenGraph({
    title: 'Equipment Rental Glossary | Hire Industry Terms',
    description:
      'Comprehensive glossary of equipment rental terminology. Scaffold hire, plant hire, tool hire, and more.',
    url: '/glossary/',
  }),
}

// Glossary terms organized by category
const glossaryTerms = [
  // Hire Types
  {
    term: 'Scaffold Hire',
    definition:
      'The rental of scaffolding equipment including frames, planks, couplers, and accessories for temporary access structures on construction sites. Scaffold hire companies typically offer delivery, erection, and dismantling services.',
    category: 'Hire Types',
    relatedTerms: ['Plant Hire', 'Access Equipment'],
  },
  {
    term: 'Plant Hire',
    definition:
      'The rental of heavy machinery and equipment for construction, mining, and civil works. Plant hire includes excavators, loaders, bulldozers, cranes, generators, and compressors. Also known as equipment hire or machinery rental.',
    category: 'Hire Types',
    relatedTerms: ['Wet Hire', 'Dry Hire', 'Equipment Rental'],
  },
  {
    term: 'Tool Hire',
    definition:
      'The short-term rental of hand tools, power tools, and small equipment to tradespeople, contractors, and DIY customers. Tool hire shops offer items like drills, saws, concrete mixers, pressure washers, and garden equipment.',
    category: 'Hire Types',
    relatedTerms: ['Equipment Rental', 'Trade Hire'],
  },
  {
    term: 'Wet Hire',
    definition:
      'Equipment rental that includes a qualified operator. The hire company provides both the machine and a trained operator to run it. Common for excavators, cranes, and other heavy equipment requiring licensed operators.',
    category: 'Hire Types',
    relatedTerms: ['Dry Hire', 'Operator Hire', 'Plant Hire'],
  },
  {
    term: 'Dry Hire',
    definition:
      'Equipment rental without an operator. The customer takes responsibility for operating the equipment themselves. Requires appropriate licences, tickets, or competency for certain machinery.',
    category: 'Hire Types',
    relatedTerms: ['Wet Hire', 'Self-Drive Hire'],
  },
  {
    term: 'Access Equipment Hire',
    definition:
      'Rental of equipment for working at height, including scissor lifts, boom lifts, cherry pickers, scaffolding, and ladders. Access hire requires operators to hold appropriate licences (EWP licence) for elevated work platforms.',
    category: 'Hire Types',
    relatedTerms: ['EWP', 'Scaffold Hire', 'Working at Heights'],
  },
  {
    term: 'Event Hire',
    definition:
      'Rental of equipment for events, functions, and temporary installations. Includes marquees, furniture, lighting, audio-visual equipment, portable toilets, generators, and crowd control barriers.',
    category: 'Hire Types',
    relatedTerms: ['Party Hire', 'Marquee Hire'],
  },

  // Rental Operations
  {
    term: 'Equipment Rental Software',
    definition:
      'Specialised business management software for hire companies. Handles equipment bookings, availability tracking, invoicing, dispatch, maintenance scheduling, and customer management. CloudRent Pro is an example of equipment rental software built for Australian hire businesses.',
    category: 'Technology',
    relatedTerms: ['Rental Management System', 'Hire Software'],
  },
  {
    term: 'Rental Inventory Management',
    definition:
      'The process of tracking rental equipment availability, location, condition, and utilisation. Modern rental inventory management uses software to maintain real-time visibility of assets across multiple depots and job sites.',
    category: 'Operations',
    relatedTerms: ['Asset Tracking', 'Equipment Tracking'],
  },
  {
    term: 'Hire Agreement',
    definition:
      'A legal contract between the hire company and customer outlining rental terms, rates, duration, liability, insurance requirements, and conditions of use. Also called a rental agreement or hire contract.',
    category: 'Operations',
    relatedTerms: ['Rental Contract', 'Terms and Conditions'],
  },
  {
    term: 'Off-Hire',
    definition:
      'The process of returning rented equipment and ending the hire period. Off-hire involves equipment inspection, damage assessment, and final billing calculations. The off-hire date determines when rental charges stop.',
    category: 'Operations',
    relatedTerms: ['On-Hire', 'Equipment Return'],
  },
  {
    term: 'On-Hire',
    definition:
      'The process of commencing a rental period. On-hire involves equipment inspection, documentation, delivery or collection, and starting rental charges. The on-hire date marks the beginning of the billing period.',
    category: 'Operations',
    relatedTerms: ['Off-Hire', 'Equipment Dispatch'],
  },
  {
    term: 'Minimum Hire Period',
    definition:
      'The shortest rental duration a hire company will accept, typically one day, one week, or one month depending on the equipment type. Customers are charged for the minimum period even if equipment is returned earlier.',
    category: 'Operations',
    relatedTerms: ['Hire Rate', 'Rental Period'],
  },

  // Pricing
  {
    term: 'Daily Rate',
    definition:
      'The rental charge for one day of equipment hire. Daily rates are typically the highest per-day cost, with weekly and monthly rates offering better value for longer hires.',
    category: 'Pricing',
    relatedTerms: ['Weekly Rate', 'Monthly Rate'],
  },
  {
    term: 'Weekly Rate',
    definition:
      'The rental charge for one week (typically 5-7 days) of equipment hire. Weekly rates usually offer a discount compared to 7 x daily rate, often charged as 4-5 days for a 7-day hire.',
    category: 'Pricing',
    relatedTerms: ['Daily Rate', 'Monthly Rate'],
  },
  {
    term: 'Damage Waiver',
    definition:
      'An optional fee (typically 10-15% of hire cost) that limits customer liability for accidental damage to rental equipment. Damage waiver does not cover theft, loss, misuse, or negligence.',
    category: 'Pricing',
    relatedTerms: ['Insurance', 'Liability'],
  },
  {
    term: 'Environmental Fee',
    definition:
      'A charge covering the cost of cleaning, servicing, and environmental compliance for returned equipment. Common for portable toilets, fuel tanks, and equipment that requires special disposal or treatment.',
    category: 'Pricing',
    relatedTerms: ['Cleaning Fee', 'Service Charge'],
  },

  // Safety & Compliance
  {
    term: 'SWMS',
    definition:
      'Safe Work Method Statement - a document required under Australian WHS legislation for high-risk construction work. SWMS identifies hazards, assesses risks, and outlines control measures. Hire companies often provide SWMS templates for equipment operation.',
    category: 'Safety',
    relatedTerms: ['JSA', 'Risk Assessment', 'WHS'],
  },
  {
    term: 'JSA',
    definition:
      'Job Safety Analysis - a risk assessment process that breaks down a job into steps, identifies hazards at each step, and documents controls. Similar to SWMS but used for general workplace tasks.',
    category: 'Safety',
    relatedTerms: ['SWMS', 'Risk Assessment'],
  },
  {
    term: 'Pre-Start Check',
    definition:
      'A safety inspection performed before operating equipment each day or shift. Pre-start checks verify the equipment is safe to operate and identify any damage, leaks, or faults. Required for most plant and machinery.',
    category: 'Safety',
    relatedTerms: ['Daily Inspection', 'Safety Check'],
  },
  {
    term: 'High Risk Work Licence',
    definition:
      'An Australian licence required to operate certain types of equipment including cranes, forklifts, elevated work platforms, scaffolding, and rigging. Issued by state/territory WHS regulators after completing accredited training.',
    category: 'Safety',
    relatedTerms: ['EWP Licence', 'Forklift Licence', 'Crane Licence'],
  },
  {
    term: 'EWP Licence',
    definition:
      'Elevated Work Platform licence - required to operate boom lifts over 11 metres. Two classes exist: WP (boom type over 11m) and WP (any type). Scissor lifts under 11m do not require an EWP licence but operators need competency training.',
    category: 'Safety',
    relatedTerms: ['High Risk Work Licence', 'Working at Heights'],
  },

  // Equipment Types
  {
    term: 'Excavator',
    definition:
      'A heavy machine with a boom, dipper, bucket, and rotating cab used for digging, trenching, demolition, and material handling. Available in mini (1-6 tonne), midi (6-10 tonne), and large (10+ tonne) sizes for hire.',
    category: 'Equipment',
    relatedTerms: ['Digger', 'Plant Hire'],
  },
  {
    term: 'Skid Steer',
    definition:
      'A compact, manoeuvrable loader with lift arms for attachments. Skid steers turn by varying wheel speeds (skidding) rather than steering wheels. Also called a Bobcat (brand name) or compact track loader.',
    category: 'Equipment',
    relatedTerms: ['Bobcat', 'Compact Loader'],
  },
  {
    term: 'Telehandler',
    definition:
      'A versatile machine combining forklift and crane capabilities with a telescopic boom. Used for lifting materials to height on construction sites. Also called a teleporter or reach forklift.',
    category: 'Equipment',
    relatedTerms: ['Forklift', 'Material Handler'],
  },
  {
    term: 'Compactor',
    definition:
      'Equipment used to compact soil, gravel, or asphalt. Types include plate compactors (hand-operated), roller compactors, and trench rollers. Essential for earthworks and road construction.',
    category: 'Equipment',
    relatedTerms: ['Roller', 'Earthmoving'],
  },
  {
    term: 'Generator',
    definition:
      'Portable power generation equipment that converts fuel (diesel, petrol, or gas) into electricity. Available in sizes from 2kVA for tools to 500kVA+ for site power. Used where mains power is unavailable.',
    category: 'Equipment',
    relatedTerms: ['Power Supply', 'Temporary Power'],
  },

  // Industry Terms
  {
    term: 'Utilisation Rate',
    definition:
      'A key performance metric measuring the percentage of time rental equipment is on hire versus available. Calculated as (days on hire / available days) x 100. Higher utilisation means better return on equipment investment.',
    category: 'Metrics',
    relatedTerms: ['Fleet Management', 'ROI'],
  },
  {
    term: 'Fleet Management',
    definition:
      'The administration of a company\'s rental equipment fleet including acquisition, maintenance, tracking, and disposal. Fleet management software helps optimise utilisation and reduce ownership costs.',
    category: 'Operations',
    relatedTerms: ['Asset Management', 'Equipment Lifecycle'],
  },
  {
    term: 'Depot',
    definition:
      'A hire company location where equipment is stored, maintained, and dispatched from. Multi-depot operations allow hire companies to serve wider geographic areas and provide faster delivery.',
    category: 'Operations',
    relatedTerms: ['Branch', 'Yard'],
  },
]

// Generate DefinedTermSet schema for glossary
function generateGlossarySchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    '@id': 'https://www.cloudrent.me/glossary/#glossary',
    name: 'Equipment Rental Industry Glossary',
    description:
      'Comprehensive glossary of equipment rental and hire industry terminology used in Australia.',
    publisher: {
      '@id': 'https://www.cloudrent.me/#organization',
    },
    hasDefinedTerm: glossaryTerms.map((item) => ({
      '@type': 'DefinedTerm',
      name: item.term,
      description: item.definition,
      inDefinedTermSet: 'https://www.cloudrent.me/glossary/#glossary',
    })),
  }
}

export default function GlossaryPage() {
  return (
    <>
      <JsonLd data={generateGlossarySchema()} />
      <GlossaryPageClient terms={glossaryTerms} />
    </>
  )
}
