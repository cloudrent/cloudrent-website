import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise })
    const settings = await payload.findGlobal({ slug: 'booking-settings' })

    // Return only public-safe fields
    return NextResponse.json({
      eventName: settings.eventName || 'Product Demo',
      eventDescription: settings.eventDescription || '',
      hostName: settings.hostName || 'CloudRent Team',
      slotDuration: settings.availability?.slotDuration || 30,
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
