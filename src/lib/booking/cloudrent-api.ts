/**
 * CloudRent booking API (api.cloudrent.me). Since the booking systems merged,
 * every demo and training booking lives in the CloudRent admin portal: one
 * list, one double-booking check, and the email and SMS reminders.
 *
 * Called server-side only, from the /api/booking routes.
 */

import type { EventTypeSlug } from './event-types'

const API_BASE = (process.env.CLOUDRENT_BOOKING_API_URL || 'https://api.cloudrent.me/api/booking/public').replace(
  /\/$/,
  '',
)

/** Admin portal event type ids. Override with env vars if they change. */
const EVENT_TYPE_IDS: Record<EventTypeSlug, string> = {
  demo: process.env.CLOUDRENT_DEMO_EVENT_TYPE_ID || '0d2dac06-a530-4c62-8486-8ed7a2876ded',
  training: process.env.CLOUDRENT_TRAINING_EVENT_TYPE_ID || '5cf2d168-c80b-49b5-bd2c-e83f1bf7308c',
}

export function eventTypeIdFor(slug: EventTypeSlug): string {
  return EVENT_TYPE_IDS[slug]
}

export class BookingApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message)
  }
}

async function call<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
    cache: 'no-store',
  })
  const body = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new BookingApiError(body?.error || `Booking API error ${res.status}`, res.status)
  }
  return body as T
}

export interface ApiSlot {
  date?: string
  startTime: string
  endTime: string
  available: boolean
}

export interface ApiDate {
  date: string
  hasAvailability: boolean
  slotsCount: number
}

export function getSlots(params: {
  type: EventTypeSlug
  startDate: string
  endDate: string
  timezone: string
}): Promise<{ dates: ApiDate[]; slots: ApiSlot[] }> {
  const q = new URLSearchParams({
    startDate: params.startDate,
    endDate: params.endDate,
    timezone: params.timezone,
  })
  return call(`/slots/${eventTypeIdFor(params.type)}?${q.toString()}`)
}

export interface CreatedAppointment {
  appointment: {
    id: string
    startTime: string
    endTime: string
    meetingUrl?: string | null
  }
  calendarLinks?: { google?: string; outlook?: string; ical?: string }
}

export function createAppointment(params: {
  type: EventTypeSlug
  startTime: string
  name: string
  email: string
  phone?: string
  company?: string
  message?: string
  timezone: string
  utmSource?: string
}): Promise<CreatedAppointment> {
  return call('/appointments', {
    method: 'POST',
    body: JSON.stringify({
      eventTypeId: eventTypeIdFor(params.type),
      startTime: params.startTime,
      inviteeName: params.name,
      inviteeEmail: params.email,
      inviteePhone: params.phone || undefined,
      inviteeCompany: params.company || undefined,
      inviteeTimezone: params.timezone,
      notes: params.message || undefined,
      utmSource: params.utmSource || 'website',
    }),
  })
}
