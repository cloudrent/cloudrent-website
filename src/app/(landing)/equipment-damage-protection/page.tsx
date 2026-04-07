import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import EquipmentDamageProtectionClient from './page.client'

export const metadata: Metadata = {
  title: 'AI Equipment Damage Detection | CloudRent Pro',
  description:
    'Stop eating the cost of disputed damage. CloudRent Pro captures photos at dispatch and return, then AI automatically compares them and flags the damage. Proof in seconds.',
  alternates: {
    canonical: 'https://www.cloudrent.me/equipment-damage-protection/',
  },
  openGraph: mergeOpenGraph({
    title: 'AI Equipment Damage Detection | CloudRent Pro',
    description:
      'Stop eating the cost of disputed damage. CloudRent Pro captures photos at dispatch and return, then AI automatically compares them and flags the damage.',
    url: '/equipment-damage-protection/',
  }),
}

export default function EquipmentDamageProtectionPage() {
  return <EquipmentDamageProtectionClient />
}
