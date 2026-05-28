import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getEventType, isValidEventType } from '@/lib/booking/event-types'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const type = searchParams.get('type') || 'demo'

    // Validate event type
    if (!isValidEventType(type)) {
      return NextResponse.json({ error: `Invalid event type: ${type}` }, { status: 400 })
    }

    const eventType = getEventType(type)!

    const payload = await getPayload({ config: configPromise })
    const settings = await payload.findGlobal({ slug: 'booking-settings' })

    // Return only public-safe fields, with event-type-specific overrides
    return NextResponse.json({
      eventType: eventType.slug,
      eventName: eventType.name,
      eventDescription: eventType.description,
      hostName: settings.hostName || 'CloudRent Team',
      slotDuration: eventType.duration, // Use event-type-specific duration
      timezone: settings.availability?.timezone || 'Australia/Sydney',
      schedule: settings.schedule || {
        monday: { enabled: true, startTime: '09:00', endTime: '17:00' },
        tuesday: { enabled: true, startTime: '09:00', endTime: '17:00' },
        wednesday: { enabled: true, startTime: '09:00', endTime: '17:00' },
        thursday: { enabled: true, startTime: '09:00', endTime: '17:00' },
        friday: { enabled: true, startTime: '09:00', endTime: '17:00' },
        saturday: { enabled: false, startTime: '10:00', endTime: '14:00' },
        sunday: { enabled: false, startTime: '10:00', endTime: '14:00' },
      },
      advanceBookingDays: settings.availability?.advanceBookingDays || 60,
      minimumNotice: settings.availability?.minimumNotice || 24,
      googleCalendarConnected: settings.googleCalendar?.connected || false,
    })
  } catch (error) {
    console.error('Failed to fetch booking settings:', error)
    return NextResponse.json({ error: 'Failed to load booking settings' }, { status: 500 })
  }
}
