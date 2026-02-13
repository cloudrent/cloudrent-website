import { NextRequest, NextResponse } from 'next/server'

const CAL_API_KEY = process.env.CAL_API_KEY
const CAL_API_URL = 'https://api.cal.com/v1'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params
  const pathStr = path.join('/')

  if (!CAL_API_KEY) {
    return NextResponse.json({ error: 'Calendar API not configured' }, { status: 503 })
  }

  try {
    // Route: public/host/{username}/event/{eventSlug}
    if (pathStr.startsWith('public/host/')) {
      const matches = pathStr.match(/public\/host\/([^/]+)\/event\/([^/]+)/)
      if (matches) {
        const [, username, eventSlug] = matches

        // Get event types for this user (v1 API uses apiKey query param)
        const res = await fetch(`${CAL_API_URL}/event-types?apiKey=${CAL_API_KEY}`)

        if (!res.ok) {
          const error = await res.text()
          console.error('Cal.com API error:', error)
          return NextResponse.json({ error: 'Failed to load event types' }, { status: res.status })
        }

        const data = await res.json()
        const eventTypes = data.event_types || []
        const eventType = eventTypes.find((e: any) => e.slug === eventSlug)

        if (!eventType) {
          return NextResponse.json({ error: 'Event type not found' }, { status: 404 })
        }

        return NextResponse.json({
          host: {
            name: eventType.owner?.username?.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()) || username
          },
          eventType: {
            id: eventType.id,
            name: eventType.title,
            durationMinutes: eventType.length,
            slug: eventType.slug,
          }
        })
      }
    }

    // Route: public/slots/{eventTypeId}
    if (pathStr.startsWith('public/slots/')) {
      const eventTypeId = pathStr.replace('public/slots/', '')
      const searchParams = request.nextUrl.searchParams
      const startDate = searchParams.get('startDate')
      const endDate = searchParams.get('endDate')
      const timezone = searchParams.get('timezone') || 'Australia/Sydney'

      const res = await fetch(
        `${CAL_API_URL}/slots?apiKey=${CAL_API_KEY}&startTime=${startDate}T00:00:00Z&endTime=${endDate}T23:59:59Z&eventTypeId=${eventTypeId}&timeZone=${encodeURIComponent(timezone)}`
      )

      if (!res.ok) {
        const error = await res.text()
        console.error('Cal.com slots error:', error)
        return NextResponse.json({ error: 'Failed to load availability' }, { status: res.status })
      }

      const data = await res.json()
      const slotsData = data.slots || {}

      // Transform Cal.com format to our format
      const dates: { date: string; hasAvailability: boolean; slotsCount: number }[] = []
      const slots: { startTime: string; endTime: string; available: boolean }[] = []

      Object.entries(slotsData).forEach(([date, daySlots]: [string, any]) => {
        const slotArray = Array.isArray(daySlots) ? daySlots : []
        dates.push({
          date,
          hasAvailability: slotArray.length > 0,
          slotsCount: slotArray.length,
        })

        slotArray.forEach((slot: any) => {
          slots.push({
            startTime: slot.time,
            endTime: slot.time, // Cal.com doesn't always provide end time
            available: true,
          })
        })
      })

      return NextResponse.json({ dates, slots })
    }

    return NextResponse.json({ error: 'Unknown endpoint' }, { status: 404 })
  } catch (error) {
    console.error('Booking API error:', error)
    return NextResponse.json({ error: 'Failed to connect to calendar service' }, { status: 503 })
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params
  const pathStr = path.join('/')

  if (!CAL_API_KEY) {
    return NextResponse.json({ error: 'Calendar API not configured' }, { status: 503 })
  }

  try {
    // Route: public/appointments
    if (pathStr === 'public/appointments') {
      const body = await request.json()

      // v1 API booking format
      const res = await fetch(`${CAL_API_URL}/bookings?apiKey=${CAL_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventTypeId: Number(body.eventTypeId),
          start: body.startTime,
          end: body.endTime,
          responses: {
            name: body.inviteeName,
            email: body.inviteeEmail,
            phone: body.inviteePhone || '',
            company: body.inviteeCompany || '',
            notes: body.intakeResponses?.message || '',
          },
          timeZone: body.inviteeTimezone || 'Australia/Sydney',
          language: 'en',
          metadata: {
            phone: body.inviteePhone,
            company: body.inviteeCompany,
          },
        }),
      })

      if (!res.ok) {
        const error = await res.json()
        console.error('Cal.com booking error:', error)
        return NextResponse.json(
          { error: error.message || 'Failed to create booking' },
          { status: res.status }
        )
      }

      const booking = await res.json()

      return NextResponse.json({
        appointment: {
          id: booking.id,
          meetingUrl: booking.meetingUrl,
        },
        calendarLinks: {
          google: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(booking.title || 'Demo')}&dates=${body.startTime.replace(/[-:]/g, '').split('.')[0]}Z/${body.startTime.replace(/[-:]/g, '').split('.')[0]}Z`,
        },
      })
    }

    return NextResponse.json({ error: 'Unknown endpoint' }, { status: 404 })
  } catch (error) {
    console.error('Booking API error:', error)
    return NextResponse.json({ error: 'Failed to connect to calendar service' }, { status: 503 })
  }
}
