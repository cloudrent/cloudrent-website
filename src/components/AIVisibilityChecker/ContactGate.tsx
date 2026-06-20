'use client'

import React from 'react'
import { ArrowLeft, Unlock, Mail, Phone, User, Building2 } from 'lucide-react'

interface ContactData {
  email: string
  phone: string
}

interface ContactGateProps {
  firstName: string
  businessName: string
  contactData: ContactData
  setContactData: React.Dispatch<React.SetStateAction<ContactData>>
  onSubmit: () => void
  onBack: () => void
  isSubmitting: boolean
  error: string | null
}

export default function ContactGate({
  firstName,
  businessName,
  contactData,
  setContactData,
  onSubmit,
  onBack,
  isSubmitting,
  error,
}: ContactGateProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <div className="mx-auto max-w-md">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="mb-8 inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to results
      </button>

      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-purple/20">
          <Unlock className="h-8 w-8 text-brand-purple" />
        </div>
        <h2 className="mb-2 text-2xl font-semibold text-white">
          Unlock Your Full Report
        </h2>
        <p className="text-white/60">
          Enter your details to see the complete AI visibility analysis and receive personalized
          recommendations.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First Name (pre-filled, readonly) */}
        <div>
          <label htmlFor="gate-firstName" className="mb-2 flex items-center gap-2 text-sm text-white/60">
            <User className="h-4 w-4" />
            First Name
          </label>
          <input
            id="gate-firstName"
            type="text"
            value={firstName}
            readOnly
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white/60"
          />
        </div>

        {/* Business Name (pre-filled, readonly) */}
        <div>
          <label htmlFor="gate-businessName" className="mb-2 flex items-center gap-2 text-sm text-white/60">
            <Building2 className="h-4 w-4" />
            Business Name
          </label>
          <input
            id="gate-businessName"
            type="text"
            value={businessName}
            readOnly
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white/60"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="gate-email" className="mb-2 flex items-center gap-2 text-sm text-white/60">
            <Mail className="h-4 w-4" />
            Email <span className="text-red-400">*</span>
          </label>
          <input
            id="gate-email"
            type="email"
            value={contactData.email}
            onChange={(e) => setContactData((prev) => ({ ...prev, email: e.target.value }))}
            placeholder="you@company.com"
            required
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-brand-purple focus:outline-none focus:ring-1 focus:ring-brand-purple"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="gate-phone" className="mb-2 flex items-center gap-2 text-sm text-white/60">
            <Phone className="h-4 w-4" />
            Phone <span className="text-red-400">*</span>
          </label>
          <input
            id="gate-phone"
            type="tel"
            value={contactData.phone}
            onChange={(e) => setContactData((prev) => ({ ...prev, phone: e.target.value }))}
            placeholder="04XX XXX XXX"
            required
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-brand-purple focus:outline-none focus:ring-1 focus:ring-brand-purple"
          />
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full bg-brand-purple px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-purple-600 hover:shadow-lg hover:shadow-purple-500/25 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? 'Unlocking...' : 'Unlock My Full Report'}
        </button>

        {/* Privacy Note */}
        <p className="text-center text-xs text-white/40">
          We&apos;ll email you the full report. No spam, ever.
        </p>
      </form>
    </div>
  )
}
