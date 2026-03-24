import { NextRequest, NextResponse } from 'next/server'
import { validatePhoneNumber } from '@/lib/phone-validation'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { phone } = body

    if (!phone) {
      return NextResponse.json({ valid: false, error: 'Phone number required' }, { status: 400 })
    }

    const result = await validatePhoneNumber(phone)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Phone validation error:', error)
    return NextResponse.json({ valid: false, error: 'Validation failed' }, { status: 500 })
  }
}
