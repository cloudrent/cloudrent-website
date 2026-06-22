'use client'

import React from 'react'
import Image from 'next/image'
import { Search, Sparkles } from 'lucide-react'

interface FormData {
  firstName: string
  businessName: string
  keywords: string[]
}

interface InputFormProps {
  formData: FormData
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
  onSubmit: () => void
  error: string | null
}

export default function InputForm({ formData, setFormData, onSubmit, error }: InputFormProps) {
  const handleKeywordChange = (index: number, value: string) => {
    setFormData((prev) => {
      const newKeywords = [...prev.keywords]
      newKeywords[index] = value
      return { ...prev, keywords: newKeywords }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <div className="text-center">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-purple/30 bg-brand-purple/10 px-4 py-2">
          <Sparkles className="h-4 w-4 text-brand-purple" />
          <span className="text-sm text-white/80">Free AI Visibility Report</span>
        </div>
        <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
          Is AI Recommending{' '}
          <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
            Your Competitors?
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-white/60">
          See whether ChatGPT, Gemini, Perplexity and Google AI recommend your business.
        </p>

        {/* AI Visibility Graphic */}
        <div className="mx-auto mt-8 max-w-3xl">
          <Image
            src="/images/Cloudrent-AI-Visibilty-Check-trans.webp"
            alt="AI Visibility Score showing Google, ChatGPT, Gemini, Perplexity and Copilot"
            width={1546}
            height={908}
            className="w-full"
            priority
          />
        </div>
      </div>

      {/* Engine Logos */}
      <div className="mb-12 flex flex-wrap items-center justify-center gap-6 text-white/40">
        <span className="text-sm">We check:</span>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {['Google', 'Google AI', 'ChatGPT', 'Perplexity', 'Copilot', 'Gemini'].map((engine) => (
            <span
              key={engine}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/60"
            >
              {engine}
            </span>
          ))}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mx-auto max-w-xl space-y-6">
        {/* Name Fields */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="text-left">
            <label htmlFor="firstName" className="mb-2 block text-sm text-white/60">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
              placeholder="Your first name"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-brand-purple focus:outline-none focus:ring-1 focus:ring-brand-purple"
            />
          </div>
          <div className="text-left">
            <label htmlFor="businessName" className="mb-2 block text-sm text-white/60">
              Business Name <span className="text-red-400">*</span>
            </label>
            <input
              id="businessName"
              type="text"
              value={formData.businessName}
              onChange={(e) => setFormData((prev) => ({ ...prev, businessName: e.target.value }))}
              placeholder="Your company name"
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-brand-purple focus:outline-none focus:ring-1 focus:ring-brand-purple"
            />
          </div>
        </div>

        {/* Keywords */}
        <div className="text-left">
          <label className="mb-2 block text-sm text-white/60">
            Keywords to Check{' '}
            <span className="text-white/40">(edit to match your services)</span>
          </label>
          <div className="space-y-3">
            {formData.keywords.map((keyword, index) => (
              <input
                key={index}
                type="text"
                value={keyword}
                onChange={(e) => handleKeywordChange(index, e.target.value)}
                placeholder={`Keyword ${index + 1}`}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-brand-purple focus:outline-none focus:ring-1 focus:ring-brand-purple"
              />
            ))}
          </div>
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
          className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-brand-purple px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-purple-600 hover:shadow-lg hover:shadow-purple-500/25"
        >
          <Search className="h-5 w-5" />
          Check My AI Visibility
        </button>

        <p className="text-xs text-white/40">
          Free • No credit card required • Results in 30 seconds
        </p>
      </form>
    </div>
  )
}
