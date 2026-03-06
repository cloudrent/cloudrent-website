'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/utilities/ui'

interface TimeSlot {
  startTime: string
  endTime: string
  available: boolean
}

interface DateSummary {
  date: string
  hasAvailability: boolean
  slotsCount: number
}

interface BookingWidgetProps {
  className?: string
}

export function BookingWidget({ className }: BookingWidgetProps) {
  const [step, setStep] = useState<'date' | 'time' | 'details' | 'confirm'>('date')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Settings from API
  const [settings, setSettings] = useState<{
    eventName: string
    hostName: string
    slotDuration: number
    timezone: string
  } | null>(null)

  // Availability data
  const [dates, setDates] = useState<DateSummary[]>([])
  const [slots, setSlots] = useState<TimeSlot[]>([])

  // Selections
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null)

  // Form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  })

  const [submitting, setSubmitting] = useState(false)
  const [appointment, setAppointment] = useState<{
    booking: { id: string; meetingUrl?: string }
    calendarLinks?: { google: string }
  } | null>(null)

  // Current view month
  const [viewMonth, setViewMonth] = useState(() => {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), 1)
  })

  // Load booking settings
  useEffect(() => {
    async function loadSettings() {
      try {
        setLoading(true)
        const res = await fetch('/api/booking/settings')
        if (!res.ok) throw new Error('Failed to load booking settings')
        const data = await res.json()
        setSettings({
          eventName: data.eventName || 'Product Demo',
          hostName: data.hostName || 'CloudRent Team',
          slotDuration: data.slotDuration || 30,
          timezone: data.timezone || 'Australia/Sydney',
        })
      } catch (err) {
        setError('Unable to load booking calendar. Please try again later.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    loadSettings()
  }, [])

  // Load availability when month changes
  useEffect(() => {
    if (!settings) return

    async function loadAvailability() {
      const startDate = viewMonth.toISOString().split('T')[0]
      const endDate = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0)
        .toISOString()
        .split('T')[0]

      try {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
        const res = await fetch(
          `/api/booking/slots?startDate=${startDate}&endDate=${endDate}&timezone=${encodeURIComponent(timezone)}`
        )
        if (!res.ok) throw new Error('Failed to load availability')
        const data = await res.json()
        setDates(data.dates || [])
        setSlots(data.slots || [])
      } catch (err) {
        console.error('Failed to load availability:', err)
      }
    }
    loadAvailability()
  }, [settings, viewMonth])

  // Get available slots for selected date
  const slotsForDate = selectedDate
    ? slots.filter((s) => s.startTime.startsWith(selectedDate) && s.available)
    : []

  // Calendar rendering
  const renderCalendar = () => {
    const year = viewMonth.getFullYear()
    const month = viewMonth.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const today = new Date().toISOString().split('T')[0]

    const days = []
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10" />)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      const dateInfo = dates.find((d) => d.date === dateStr)
      const hasAvailability = dateInfo?.hasAvailability
      const isPast = dateStr < today
      const isSelected = dateStr === selectedDate

      days.push(
        <button
          key={day}
          onClick={() => {
            if (hasAvailability && !isPast) {
              setSelectedDate(dateStr)
              setStep('time')
            }
          }}
          disabled={!hasAvailability || isPast}
          className={cn(
            'h-10 w-10 rounded-full text-sm font-medium transition-all',
            isPast && 'text-gray-600 cursor-not-allowed',
            !isPast && !hasAvailability && 'text-gray-500 cursor-not-allowed',
            !isPast && hasAvailability && 'text-white hover:bg-brand-purple/20 cursor-pointer',
            isSelected && 'bg-brand-purple text-white hover:bg-brand-purple'
          )}
        >
          {day}
        </button>
      )
    }

    return days
  }

  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString('en-AU', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-AU', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedSlot || !selectedDate) return

    setSubmitting(true)
    setError(null)

    try {
      // Extract time from ISO string (e.g., "2024-03-15T09:00:00.000Z" -> "09:00")
      const startTime = selectedSlot.startTime.includes('T')
        ? selectedSlot.startTime.split('T')[1].slice(0, 5)
        : selectedSlot.startTime

      const res = await fetch('/api/booking/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: selectedDate,
          startTime,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          message: formData.message,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create booking')
      }

      setAppointment(data)
      setStep('confirm')
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to book appointment'
      setError(errorMessage)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className={cn('rounded-2xl bg-[#0a0a1a] border border-brand-purple/20 p-8', className)}>
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-purple border-t-transparent" />
        </div>
      </div>
    )
  }

  if (error && !settings) {
    return (
      <div className={cn('rounded-2xl bg-[#0a0a1a] border border-brand-purple/20 p-8', className)}>
        <p className="text-center text-red-400">{error}</p>
      </div>
    )
  }

  return (
    <div className={cn('rounded-2xl bg-[#0a0a1a] border border-brand-purple/20 overflow-hidden', className)}>
      {/* Header */}
      <div className="border-b border-brand-purple/20 bg-brand-purple/10 px-6 py-4">
        <div className="flex items-center gap-4">
          <div>
            <h3 className="font-semibold text-white">{settings?.eventName || 'Book a Demo'}</h3>
            <p className="text-sm text-gray-400">
              {settings?.slotDuration || 30} min
              {settings?.hostName && ` with ${settings.hostName}`}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {step === 'date' && (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <button
                onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1))}
                className="rounded-lg p-2 text-gray-400 hover:bg-white/10 hover:text-white"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h4 className="font-medium text-white">
                {viewMonth.toLocaleDateString('en-AU', { month: 'long', year: 'numeric' })}
              </h4>
              <button
                onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1))}
                className="rounded-lg p-2 text-gray-400 hover:bg-white/10 hover:text-white"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="mb-2 grid grid-cols-7 gap-1 text-center text-xs text-gray-500">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>

            <div className="grid grid-cols-7 gap-1 justify-items-center">
              {renderCalendar()}
            </div>
          </div>
        )}

        {step === 'time' && selectedDate && (
          <div>
            <button
              onClick={() => {
                setSelectedDate(null)
                setStep('date')
              }}
              className="mb-4 flex items-center gap-2 text-sm text-brand-purple hover:text-[#a855c9]"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to calendar
            </button>

            <h4 className="mb-4 font-medium text-white">{formatDate(selectedDate)}</h4>

            <div className="grid gap-2 max-h-64 overflow-y-auto">
              {slotsForDate.length === 0 ? (
                <p className="text-center text-gray-400 py-4">No available times</p>
              ) : (
                slotsForDate.map((slot) => (
                  <button
                    key={slot.startTime}
                    onClick={() => {
                      setSelectedSlot(slot)
                      setStep('details')
                    }}
                    className="rounded-lg border border-brand-purple/30 px-4 py-3 text-center text-white transition-all hover:border-brand-purple hover:bg-brand-purple/20"
                  >
                    {formatTime(slot.startTime)}
                  </button>
                ))
              )}
            </div>
          </div>
        )}

        {step === 'details' && selectedSlot && (
          <div>
            <button
              onClick={() => setStep('time')}
              className="mb-4 flex items-center gap-2 text-sm text-brand-purple hover:text-[#a855c9]"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to times
            </button>

            <div className="mb-6 rounded-lg bg-brand-purple/10 p-4">
              <p className="font-medium text-white">{formatDate(selectedDate!)}</p>
              <p className="text-sm text-gray-400">
                {formatTime(selectedSlot.startTime)} - {formatTime(selectedSlot.endTime)}
              </p>
            </div>

            {error && (
              <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm text-gray-400">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg border border-brand-purple/30 bg-white/90 px-4 py-2 text-gray-900 placeholder:text-gray-500 focus:border-brand-purple focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-gray-400">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-lg border border-brand-purple/30 bg-white/90 px-4 py-2 text-gray-900 placeholder:text-gray-500 focus:border-brand-purple focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-gray-400">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full rounded-lg border border-brand-purple/30 bg-white/90 px-4 py-2 text-gray-900 placeholder:text-gray-500 focus:border-brand-purple focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-gray-400">Company</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full rounded-lg border border-brand-purple/30 bg-white/90 px-4 py-2 text-gray-900 placeholder:text-gray-500 focus:border-brand-purple focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-gray-400">
                  What would you like to discuss?
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={3}
                  className="w-full rounded-lg border border-brand-purple/30 bg-white/90 px-4 py-2 text-gray-900 placeholder:text-gray-500 focus:border-brand-purple focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-lg bg-brand-purple px-4 py-3 font-semibold text-white transition-all hover:bg-[#a855c9] disabled:opacity-50"
              >
                {submitting ? 'Booking...' : 'Confirm Booking'}
              </button>
            </form>
          </div>
        )}

        {step === 'confirm' && appointment && (
          <div className="text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
              <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h3 className="mb-2 text-xl font-semibold text-white">Booking Confirmed!</h3>
            <p className="mb-6 text-gray-400">
              You&apos;ll receive a confirmation email with meeting details shortly.
            </p>

            <div className="rounded-lg bg-brand-purple/10 p-4 text-left">
              <p className="font-medium text-white">{settings?.eventName}</p>
              <p className="text-sm text-gray-400">
                {formatDate(selectedDate!)}
              </p>
              <p className="text-sm text-gray-400">
                {formatTime(selectedSlot!.startTime)} - {formatTime(selectedSlot!.endTime)}
              </p>
              {appointment.booking?.meetingUrl && (
                <a
                  href={appointment.booking.meetingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm text-brand-purple hover:text-[#a855c9]"
                >
                  Join Google Meet
                </a>
              )}
            </div>

            {appointment.calendarLinks && (
              <div className="mt-4 flex justify-center gap-2">
                <a
                  href={appointment.calendarLinks.google}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-brand-purple/30 px-4 py-2 text-sm text-white hover:bg-brand-purple/20"
                >
                  Add to Google Calendar
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
