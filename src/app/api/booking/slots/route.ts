import { NextRequest, NextResponse } from 'next/server'
import { getEventType, isValidEventType } from '@/lib/booking/event-types'
import { BookingApiError, getSlots } from '@/lib/booking/cloudrent-api'

export const dynamic = 'force-dynamic'

/**
 * Available slots for /demo and /training, from the CloudRent booking API.
 * Slots are calculated there in the host's timezone, against every booking
 * (website and admin portal) and the host's live Google Calendar.
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const startDate = searchParams.get('startDate') // YYYY-MM-DD
    const endDate = searchParams.get('endDate') // YYYY-MM-DD
    const timezone = searchParams.get('timezone') || 'Australia/Brisbane'
    const type = searchParams.get('type') || 'demo'

    if (!isValidEventType(type)) {
      return NextResponse.json({ error: `Invalid event type: ${type}` }, { status: 400 })
    }

    if (!startDate || !endDate) {
      return NextResponse.json({ error: 'Missing startDate or endDate parameters' }, { status: 400 })
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    if (!dateRegex.test(startDate) || !dateRegex.test(endDate)) {
      return NextResponse.json({ error: 'Invalid date format. Use YYYY-MM-DD' }, { status: 400 })
    }

    const result = await getSlots({ type: getEventType(type)!.slug, startDate, endDate, timezone })
    return NextResponse.json(result)
  } catch (error) {
    console.error('Failed to fetch slots:', error)
    const status = error instanceof BookingApiError && error.status < 500 ? error.status : 502
    return NextResponse.json({ error: 'Failed to load availability' }, { status })
  }
}
