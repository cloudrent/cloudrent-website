import { NextRequest, NextResponse } from 'next/server'

const BOOKING_API_URL = process.env.BOOKING_API_URL || 'http://localhost:3001'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params
  const pathname = path.join('/')
  const searchParams = request.nextUrl.searchParams.toString()
  const url = `${BOOKING_API_URL}/api/booking/${pathname}${searchParams ? `?${searchParams}` : ''}`

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error('Booking API proxy error:', error)
    return NextResponse.json(
      { error: 'Failed to connect to booking service' },
      { status: 503 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params
  const pathname = path.join('/')
  const url = `${BOOKING_API_URL}/api/booking/${pathname}`

  try {
    const body = await request.json()
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error('Booking API proxy error:', error)
    return NextResponse.json(
      { error: 'Failed to connect to booking service' },
      { status: 503 }
    )
  }
}
