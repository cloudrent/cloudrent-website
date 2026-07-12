'use client'

import Image from 'next/image'

/**
 * Displays the MYOB/QuickBooks/Xero integrations logo row.
 * Reused on homepage and landing pages.
 */
export function IntegrationsRow() {
  return (
    <div className="border-t border-white/[0.05] px-5 pt-6">
      <p className="mb-4 text-center text-sm text-white/40">Integrates with</p>
      <div className="flex items-center justify-center">
        <Image
          src="/images/logos/xero-quickbooks-MYOB.png"
          alt="Xero, QuickBooks, MYOB integrations"
          width={740}
          height={179}
          loading="lazy"
          className="h-12 w-auto object-contain opacity-70 transition-opacity hover:opacity-100"
        />
      </div>
    </div>
  )
}

export default IntegrationsRow
