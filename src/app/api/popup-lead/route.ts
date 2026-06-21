import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

// Rate limit: 1 submission per email per 24 hours
const RATE_LIMIT_HOURS = 24
const rateLimitMap = new Map<string, number>()

// Clean up old entries every hour
setInterval(() => {
  const now = Date.now()
  const cutoff = now - RATE_LIMIT_HOURS * 60 * 60 * 1000
  for (const [key, timestamp] of rateLimitMap.entries()) {
    if (timestamp < cutoff) {
      rateLimitMap.delete(key)
    }
  }
}, 60 * 60 * 1000)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, source } = body

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const emailLower = email.toLowerCase().trim()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(emailLower)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    // Check rate limit
    const lastSubmission = rateLimitMap.get(emailLower)
    if (lastSubmission) {
      const hoursSince = (Date.now() - lastSubmission) / (60 * 60 * 1000)
      if (hoursSince < RATE_LIMIT_HOURS) {
        return NextResponse.json(
          { error: 'You have already submitted recently. Please try again later.' },
          { status: 429 }
        )
      }
    }

    // Get Payload instance
    const payload = await getPayload({ config: configPromise })

    // Check if this email already exists
    const existingLeads = await payload.find({
      collection: 'ai-visibility-leads',
      where: {
        email: { equals: emailLower },
      },
      limit: 1,
    })

    if (existingLeads.docs.length > 0) {
      // Email already exists - don't create duplicate, just succeed silently
      rateLimitMap.set(emailLower, Date.now())
      return NextResponse.json({ success: true, existing: true })
    }

    // Create partial lead
    await payload.create({
      collection: 'ai-visibility-leads',
      data: {
        email: emailLower,
        status: 'partial',
        // Leave other fields empty - will be filled when they complete the form
      },
    })

    // Update rate limit
    rateLimitMap.set(emailLower, Date.now())

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error creating popup lead:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
