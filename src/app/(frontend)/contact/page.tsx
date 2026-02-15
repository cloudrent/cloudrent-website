'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, Phone, MapPin, Send, Clock, MessageSquare } from 'lucide-react'
import { cn } from '@/utilities/ui'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to send message')
      }

      setSubmitted(true)

      // Track form submission in GTM
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          event: 'contact_form_submit',
          form_subject: formData.subject,
          form_has_company: !!formData.company,
          form_has_phone: !!formData.phone,
        })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen text-white">
      {/* Background Effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-fuchsia-600/15 blur-[100px]" />
      </div>

      <div className="relative">
        {/* Hero */}
        <section className="px-4 pb-16 pt-12">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/20 px-4 py-2 text-sm text-purple-300">
              <MessageSquare className="h-4 w-4" />
              We&apos;d love to hear from you
            </div>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
              Get in{' '}
              <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-300">
              Have a question about CloudRent Pro? Want to see a demo? Our team is here to help you
              find the perfect solution for your hire business.
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="mx-auto max-w-6xl px-4 pb-20">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Contact Info */}
            <div className="space-y-8 lg:col-span-2">
              <div>
                <h2 className="mb-6 text-2xl font-bold">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-xl bg-purple-500/20 p-3">
                      <Mail className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Email</p>
                      <a
                        href="mailto:hello@cloudrent.me"
                        className="text-purple-300 transition-colors hover:text-purple-200"
                      >
                        sales@cloudrent.me
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="rounded-xl bg-purple-500/20 p-3">
                      <Phone className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Phone</p>
                      <a
                        href="tel:1300123456"
                        className="text-purple-300 transition-colors hover:text-purple-200"
                      >
                        +61 7 3171 2948
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="rounded-xl bg-purple-500/20 p-3">
                      <MapPin className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Location</p>
                      <p className="text-purple-300">Gold Coast, Australia</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="rounded-xl bg-purple-500/20 p-3">
                      <Clock className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Business Hours</p>
                      <p className="text-purple-300">Mon - Fri: 8am - 6pm AEST</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="rounded-2xl border border-purple-500/20 bg-purple-900/20 p-6">
                <h3 className="mb-4 font-semibold text-white">Quick Links</h3>
                <ul className="space-y-3 text-sm">
                  <li>
                    <a
                      href="https://help.cloudrent.me"
                      className="text-purple-300 hover:text-white"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Help Center & Documentation
                    </a>
                  </li>
                  <li>
                    <Link href="/pricing" className="text-purple-300 hover:text-white">
                      View Pricing Plans
                    </Link>
                  </li>
                  <li>
                    <Link href="/demo" className="text-purple-300 hover:text-white">
                      Book a Demo
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className="text-purple-300 hover:text-white">
                      Frequently Asked Questions
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-purple-500/20 bg-purple-900/20 p-8">
                {submitted ? (
                  <div className="py-12 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20">
                      <Send className="h-8 w-8 text-emerald-400" />
                    </div>
                    <h3 className="mb-2 text-2xl font-bold text-white">Message Sent!</h3>
                    <p className="text-gray-300">We&apos;ll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <label
                          htmlFor="name"
                          className="mb-2 block text-sm font-medium text-purple-200"
                        >
                          Your Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-purple-500/30 bg-white/90 px-4 py-3 text-gray-900 placeholder-gray-500 transition-colors focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20"
                          placeholder="John Smith"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="mb-2 block text-sm font-medium text-purple-200"
                        >
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-purple-500/30 bg-white/90 px-4 py-3 text-gray-900 placeholder-gray-500 transition-colors focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20"
                          placeholder="john@company.com.au"
                        />
                      </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <label
                          htmlFor="company"
                          className="mb-2 block text-sm font-medium text-purple-200"
                        >
                          Company Name
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-purple-500/30 bg-white/90 px-4 py-3 text-gray-900 placeholder-gray-500 transition-colors focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20"
                          placeholder="Acme Hire Co"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="mb-2 block text-sm font-medium text-purple-200"
                        >
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-purple-500/30 bg-white/90 px-4 py-3 text-gray-900 placeholder-gray-500 transition-colors focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20"
                          placeholder="0400 000 000"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="mb-2 block text-sm font-medium text-purple-200"
                      >
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-purple-500/30 bg-white/90 px-4 py-3 text-gray-900 transition-colors focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20"
                      >
                        <option value="">Select a topic...</option>
                        <option value="demo">Book a Demo</option>
                        <option value="sales">Sales Enquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="billing">Billing Question</option>
                        <option value="partnership">Partnership Opportunity</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="mb-2 block text-sm font-medium text-purple-200"
                      >
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full resize-none rounded-xl border border-purple-500/30 bg-white/90 px-4 py-3 text-gray-900 placeholder-gray-500 transition-colors focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20"
                        placeholder="Tell us about your hire business and how we can help..."
                      />
                    </div>

                    {error && (
                      <div className="rounded-xl border border-red-500/30 bg-red-500/20 p-4 text-red-200">
                        {error}
                      </div>
                    )}

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
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          Send Message
                        </>
                      )}
                    </button>
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
