import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise })

    // Try to get existing settings
    let settings
    try {
      settings = await payload.findGlobal({ slug: 'booking-settings' })
    } catch {
      settings = null
    }

    // If no settings exist, create with defaults
    if (!settings) {
      settings = await payload.updateGlobal({
        slug: 'booking-settings',
        data: {
          eventName: 'Product Demo',
          hostName: 'CloudRent Team',
          hostEmail: 'hello@cloudrent.me',
          availability: {
            timezone: 'Australia/Sydney',
            slotDuration: 30,
            bufferBefore: 0,
            bufferAfter: 15,
            maxBookingsPerDay: 8,
            advanceBookingDays: 60,
            minimumNotice: 24,
          },
          schedule: {
            monday: { enabled: true, startTime: '09:00', endTime: '17:00' },
            tuesday: { enabled: true, startTime: '09:00', endTime: '17:00' },
            wednesday: { enabled: true, startTime: '09:00', endTime: '17:00' },
            thursday: { enabled: true, startTime: '09:00', endTime: '17:00' },
            friday: { enabled: true, startTime: '09:00', endTime: '17:00' },
            saturday: { enabled: false, startTime: '09:00', endTime: '17:00' },
            sunday: { enabled: false, startTime: '09:00', endTime: '17:00' },
          },
          googleCalendar: {
            connected: false,
            connectedEmail: '',
            calendarId: 'primary',
          },
          notifications: {
            sendHostNotification: true,
            sendGuestConfirmation: true,
          },
        },
      })

      return NextResponse.json({
        success: true,
        message: 'Booking settings initialized',
        settings
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Booking settings already exist',
      settings
    })
  } catch (error) {
    console.error('Failed to initialize booking settings:', error)
    return NextResponse.json({
      error: 'Failed to initialize',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
