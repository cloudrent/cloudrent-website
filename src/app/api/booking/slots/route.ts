import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getBusyTimes } from '@/lib/google-calendar'
import {
  calculateAvailableSlots,
  type BookingSettings,
  type ExistingBooking,
  type ScheduleDay,
} from '@/lib/booking/calculate-slots'

export const dynamic = 'force-dynamic'

// Helper to safely convert Payload schedule to ScheduleDay
function toScheduleDay(
  day: { enabled?: boolean | null; startTime?: string | null; endTime?: string | null } | null | undefined,
  defaultEnabled: boolean
): ScheduleDay {
  return {
    enabled: day?.enabled ?? defaultEnabled,
    startTime: day?.startTime || '09:00',
    endTime: day?.endTime || '17:00',
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const startDate = searchParams.get('startDate') // YYYY-MM-DD
    const endDate = searchParams.get('endDate') // YYYY-MM-DD
    const timezone = searchParams.get('timezone') || 'Australia/Sydney'

    if (!startDate || !endDate) {
      return NextResponse.json({ error: 'Missing startDate or endDate parameters' }, { status: 400 })
    }

    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    if (!dateRegex.test(startDate) || !dateRegex.test(endDate)) {
      return NextResponse.json({ error: 'Invalid date format. Use YYYY-MM-DD' }, { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })
    const settings = await payload.findGlobal({ slug: 'booking-settings' })

    // Get existing bookings for date range
    const existingBookings = await payload.find({
      collection: 'bookings',
      where: {
        and: [
          { date: { greater_than_equal: startDate } },
          { date: { less_than_equal: endDate } },
          {
            status: { in: ['pending', 'confirmed'] },
          },
        ],
      },
      limit: 1000,
    })

    // Get Google Calendar busy times
    let googleBusyTimes: { start: Date; end: Date }[] = []
    if (settings.googleCalendar?.connected) {
      const start = new Date(`${startDate}T00:00:00`)
      const end = new Date(`${endDate}T23:59:59`)
      googleBusyTimes = await getBusyTimes(
        start,
        end,
        settings.googleCalendar.calendarId || 'primary'
      )
    }

    // Transform settings to expected format
    const bookingSettings: BookingSettings = {
      availability: {
        timezone: settings.availability?.timezone || 'Australia/Sydney',
        slotDuration: settings.availability?.slotDuration || 30,
        bufferBefore: settings.availability?.bufferBefore || 0,
        bufferAfter: settings.availability?.bufferAfter || 15,
        maxBookingsPerDay: settings.availability?.maxBookingsPerDay || 8,
        advanceBookingDays: settings.availability?.advanceBookingDays || 60,
        minimumNotice: settings.availability?.minimumNotice || 24,
      },
      schedule: {
        monday: toScheduleDay(settings.schedule?.monday, true),
        tuesday: toScheduleDay(settings.schedule?.tuesday, true),
        wednesday: toScheduleDay(settings.schedule?.wednesday, true),
        thursday: toScheduleDay(settings.schedule?.thursday, true),
        friday: toScheduleDay(settings.schedule?.friday, true),
        saturday: toScheduleDay(settings.schedule?.saturday, false),
        sunday: toScheduleDay(settings.schedule?.sunday, false),
      },
    }

    // Transform existing bookings
    const bookings: ExistingBooking[] = existingBookings.docs.map((b) => ({
      date: typeof b.date === 'string' ? b.date.split('T')[0] : new Date(b.date).toISOString().split('T')[0],
      startTime: b.startTime,
      endTime: b.endTime,
      status: b.status,
    }))

    // Calculate available slots
    const result = calculateAvailableSlots({
      settings: bookingSettings,
      startDate,
      endDate,
      existingBookings: bookings,
      googleBusyTimes,
      userTimezone: timezone,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Failed to fetch slots:', error)
    return NextResponse.json({ error: 'Failed to load availability' }, { status: 500 })
  }
}
