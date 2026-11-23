import { NextRequest, NextResponse } from 'next/server'
import { validatePhoneNumber } from '@/lib/phone-validation'
import { getEventType, isValidEventType } from '@/lib/booking/event-types'
import { BookingApiError, createAppointment } from '@/lib/booking/cloudrent-api'

export const dynamic = 'force-dynamic'

// Blocked email domains (spam prevention)
const BLOCKED_DOMAINS = [
  'tempmail.com',
  'throwaway.email',
  'mailinator.com',
  'guerrillamail.com',
  'sharklasers.com',
  '10minutemail.com',
  'temp-mail.org',
]

/**
 * Book a demo or training session. The booking is created in the CloudRent
 * admin portal, which re-checks the slot against every booking and the live
 * Google Calendar, adds it to the host's calendar, and sends the confirmation
 * email, the 24h and 1h reminder emails and the 45 minute Y/N SMS.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { startAt, name, email, phone, company, message, timezone, type } = body

    const eventTypeSlug = type || 'demo'
    if (!isValidEventType(eventTypeSlug)) {
      return NextResponse.json({ error: `Invalid event type: ${eventTypeSlug}` }, { status: 400 })
    }
    const eventType = getEventType(eventTypeSlug)!

    if (typeof startAt !== 'string' || Number.isNaN(Date.parse(startAt)) || !name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Mobile number is required: the SMS reminder asks the guest to reply Y or N
    if (!phone || typeof phone !== 'string') {
      return NextResponse.json({ error: 'Please enter a mobile number for your reminder.' }, { status: 400 })
    }

    const emailRegex = /^\S[^\s@]*@\S+\.\S+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    // Spam: silent success so detection is not revealed
    const emailDomain = email.split('@')[1]?.toLowerCase()
    if (BLOCKED_DOMAINS.some((d) => emailDomain?.includes(d))) {
      return NextResponse.json({ success: true, booking: { id: 'blocked' } })
    }
    if (isGibberish(name) || (company && isGibberish(company))) {
      return NextResponse.json({ success: true, booking: { id: 'blocked' } })
    }

    const phoneValidation = await validatePhoneNumber(phone)
    if (!phoneValidation.valid) {
      return NextResponse.json(
        { error: phoneValidation.error || 'Invalid phone number. Please enter a valid phone number.' },
        { status: 400 },
      )
    }

    const created = await createAppointment({
      type: eventType.slug,
      startTime: new Date(startAt).toISOString(),
      name,
      email,
      phone,
      company,
      message,
      timezone: timezone || 'Australia/Brisbane',
    })

    const { appointment, calendarLinks } = created
    return NextResponse.json({
      success: true,
      booking: {
        id: appointment.id,
        startTime: appointment.startTime,
        endTime: appointment.endTime,
        meetingUrl: appointment.meetingUrl || null,
        eventType: eventType.slug,
      },
      calendarLinks: calendarLinks?.google ? { google: calendarLinks.google } : undefined,
    })
  } catch (error) {
    if (error instanceof BookingApiError && error.status === 409) {
      return NextResponse.json(
        { error: 'This time slot is no longer available. Please select another time.' },
        { status: 409 },
      )
    }
    console.error('Failed to create booking:', error)
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
  }
}

// Spam detection helper
function isGibberish(text: string): boolean {
  if (!text || text.length < 2) return false

  // Check for excessive consonant runs (5+ consonants in a row)
  const consonantRun = /[bcdfghjklmnpqrstvwxyz]{5,}/i
  if (consonantRun.test(text)) return true

  // Check for random case changes (aAbBcC pattern)
  const mixedCase = text.split('').filter((c, i, arr) => {
    if (i === 0) return false
    const prevIsUpper = arr[i - 1] === arr[i - 1].toUpperCase()
    const currIsUpper = c === c.toUpperCase()
    return /[a-zA-Z]/.test(c) && /[a-zA-Z]/.test(arr[i - 1]) && prevIsUpper !== currIsUpper
  }).length
  if (mixedCase > text.length * 0.5 && text.length > 4) return true

  return false
}
