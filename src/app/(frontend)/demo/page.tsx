'use client'

import { useState } from 'react'
import { Calendar, Play, Users, Clock, CheckCircle, ArrowRight } from 'lucide-react'
import { cn } from '@/utilities/ui'

export default function DemoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    employees: '',
    equipment: '',
    currentSystem: '',
    preferredTime: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // TODO: Integrate with Calendly or booking system
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setSubmitted(true)
    setIsSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const benefits = [
    'See CloudRent Pro in action with your own use cases',
    'Get answers to your specific questions',
    'Learn about implementation and migration',
    'Discuss pricing and custom requirements',
    'No obligation - just a friendly chat',
  ]

  return (
    <div className="min-h-screen text-white">
      {/* Background Effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-fuchsia-600/15 blur-[100px]" />
      </div>

      <div className="relative">
        {/* Hero */}
        <section className="px-4 pb-12 pt-12">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/20 px-4 py-2 text-sm text-purple-300">
              <Play className="h-4 w-4" />
              See CloudRent Pro in action
            </div>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
              Book a{' '}
              <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                Personalized Demo
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-300">
              Get a one-on-one walkthrough of CloudRent Pro tailored to your hire business. See how we can streamline your operations and help you grow.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="mx-auto max-w-6xl px-4 pb-20">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left - Benefits */}
            <div className="space-y-8">
              <div className="rounded-2xl border border-purple-500/20 bg-purple-900/20 p-8">
                <h2 className="mb-6 text-2xl font-bold">What to expect</h2>
                <ul className="space-y-4">
                  {benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                      <span className="text-gray-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-purple-500/20 bg-purple-900/20 p-6 text-center">
                  <Clock className="mx-auto mb-3 h-8 w-8 text-purple-400" />
                  <p className="font-semibold text-white">30 Minutes</p>
                  <p className="text-sm text-purple-300">Focused walkthrough</p>
                </div>
                <div className="rounded-xl border border-purple-500/20 bg-purple-900/20 p-6 text-center">
                  <Users className="mx-auto mb-3 h-8 w-8 text-purple-400" />
                  <p className="font-semibold text-white">1-on-1 Session</p>
                  <p className="text-sm text-purple-300">With a product expert</p>
                </div>
              </div>

              {/* Alternative CTA */}
              <div className="rounded-2xl border border-purple-500/20 bg-purple-950/50 p-6">
                <h3 className="mb-2 font-semibold text-white">Prefer to explore on your own?</h3>
                <p className="mb-4 text-sm text-gray-400">
                  Start your free 30-day trial and explore all features at your own pace.
                </p>
                <a
                  href="https://app.cloudrent.me/register"
                  className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300"
                >
                  Start Free Trial <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Right - Form */}
            <div>
              <div className="rounded-2xl border border-purple-500/20 bg-purple-900/20 p-8">
                {submitted ? (
                  <div className="py-12 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20">
                      <Calendar className="h-8 w-8 text-emerald-400" />
                    </div>
                    <h3 className="mb-2 text-2xl font-bold text-white">Demo Requested!</h3>
                    <p className="mb-4 text-gray-300">
                      We&apos;ll be in touch within 24 hours to confirm your demo time.
                    </p>
                    <p className="text-sm text-purple-300">Check your email for confirmation details.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <h2 className="mb-6 text-xl font-bold">Schedule your demo</h2>

                    <div className="grid gap-5 md:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="mb-2 block text-sm font-medium text-purple-200">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-purple-500/30 bg-purple-950/50 px-4 py-3 text-white placeholder-purple-300/50 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20"
                          placeholder="John Smith"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-purple-200">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-purple-500/30 bg-purple-950/50 px-4 py-3 text-white placeholder-purple-300/50 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20"
                          placeholder="john@company.com.au"
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <div>
                        <label htmlFor="company" className="mb-2 block text-sm font-medium text-purple-200">
                          Company Name *
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          required
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-purple-500/30 bg-purple-950/50 px-4 py-3 text-white placeholder-purple-300/50 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20"
                          placeholder="Acme Hire Co"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="mb-2 block text-sm font-medium text-purple-200">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-purple-500/30 bg-purple-950/50 px-4 py-3 text-white placeholder-purple-300/50 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20"
                          placeholder="0400 000 000"
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <div>
                        <label htmlFor="employees" className="mb-2 block text-sm font-medium text-purple-200">
                          Number of Staff
                        </label>
                        <select
                          id="employees"
                          name="employees"
                          value={formData.employees}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-purple-500/30 bg-purple-950/50 px-4 py-3 text-white focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20"
                        >
                          <option value="">Select...</option>
                          <option value="1-5">1-5 staff</option>
                          <option value="6-15">6-15 staff</option>
                          <option value="16-30">16-30 staff</option>
                          <option value="31-50">31-50 staff</option>
                          <option value="50+">50+ staff</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="equipment" className="mb-2 block text-sm font-medium text-purple-200">
                          Equipment Items
                        </label>
                        <select
                          id="equipment"
                          name="equipment"
                          value={formData.equipment}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-purple-500/30 bg-purple-950/50 px-4 py-3 text-white focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20"
                        >
                          <option value="">Select...</option>
                          <option value="1-50">1-50 items</option>
                          <option value="51-200">51-200 items</option>
                          <option value="201-500">201-500 items</option>
                          <option value="501-1000">501-1000 items</option>
                          <option value="1000+">1000+ items</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="currentSystem" className="mb-2 block text-sm font-medium text-purple-200">
                        Current System
                      </label>
                      <select
                        id="currentSystem"
                        name="currentSystem"
                        value={formData.currentSystem}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-purple-500/30 bg-purple-950/50 px-4 py-3 text-white focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20"
                      >
                        <option value="">What do you use now?</option>
                        <option value="spreadsheets">Spreadsheets / Manual</option>
                        <option value="other-software">Other Rental Software</option>
                        <option value="accounting">Accounting Software Only</option>
                        <option value="paper">Paper-based System</option>
                        <option value="starting">Just Starting Out</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="preferredTime" className="mb-2 block text-sm font-medium text-purple-200">
                        Preferred Demo Time
                      </label>
                      <select
                        id="preferredTime"
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-purple-500/30 bg-purple-950/50 px-4 py-3 text-white focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20"
                      >
                        <option value="">Select a time slot...</option>
                        <option value="morning">Morning (8am - 12pm AEST)</option>
                        <option value="afternoon">Afternoon (12pm - 5pm AEST)</option>
                        <option value="flexible">I&apos;m flexible</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={cn(
                        'flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-500 px-8 py-4 font-semibold text-white shadow-lg shadow-purple-500/30 transition-all hover:from-purple-400 hover:to-fuchsia-400',
                        isSubmitting && 'cursor-not-allowed opacity-70',
                      )}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Calendar className="h-5 w-5" />
                          Request Demo
                        </>
                      )}
                    </button>

                    <p className="text-center text-xs text-purple-300/60">
                      We&apos;ll contact you within 24 hours to confirm your demo.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
