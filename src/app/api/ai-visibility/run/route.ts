import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

interface RunRequest {
  firstName: string
  businessName: string
  keywords: string[]
  turnstileToken?: string
}

// Turnstile verification
async function verifyTurnstileToken(token: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY
  if (!secretKey) {
    console.warn('TURNSTILE_SECRET_KEY not configured, skipping verification')
    return true
  }

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    })

    const data = await response.json()
    return data.success === true
  } catch (error) {
    console.error('Turnstile verification error:', error)
    return false
  }
}

export async function POST(request: Request) {
  try {
    const body: RunRequest = await request.json()
    const { firstName, businessName, keywords, turnstileToken } = body

    // Validate inputs
    if (!businessName || !keywords?.length) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (keywords.length > 3) {
      return NextResponse.json({ error: 'Maximum 3 keywords allowed' }, { status: 400 })
    }

    // Verify Turnstile (if configured)
    if (process.env.TURNSTILE_SECRET_KEY && turnstileToken) {
      const isValid = await verifyTurnstileToken(turnstileToken)
      if (!isValid) {
        return NextResponse.json({ error: 'Security verification failed' }, { status: 400 })
      }
    }

    // Rate limiting: Check if business was checked in last 24 hours
    const payload = await getPayload({ config })
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()

    const existing = await payload.find({
      collection: 'ai-visibility-leads',
      where: {
        businessName: { equals: businessName },
        createdAt: { greater_than: twentyFourHoursAgo },
      },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      // Return cached results
      return NextResponse.json({
        cached: true,
        leadId: existing.docs[0].id,
        results: existing.docs[0].engineResults,
        score: existing.docs[0].score,
        totalEngines: existing.docs[0].totalEngines,
      })
    }

    // Check for Apify API key
    if (!process.env.APIFY_API_KEY) {
      console.error('APIFY_API_KEY is not configured')
      return NextResponse.json({ error: 'AI visibility service not configured' }, { status: 500 })
    }

    // Build search queries - combine each keyword with business name
    const queries = keywords.map((keyword) => `${keyword} "${businessName}"`)

    // Start Apify run with all AI add-ons enabled
    const apifyResponse = await fetch(
      `https://api.apify.com/v2/acts/apify~google-search-scraper/runs?token=${process.env.APIFY_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          queries: queries.join('\n'),
          maxPagesPerQuery: 1,
          resultsPerPage: 10,
          languageCode: 'en',
          countryCode: 'au',
          // AI Search Visibility Add-ons
          includeAiOverview: true,
          addOnGoogleAiMode: true,
          addOnPerplexityAiSearch: true,
          addOnChatGptSearch: true,
          addOnCopilotSearch: true,
          addOnGeminiSearch: true,
        }),
      }
    )

    if (!apifyResponse.ok) {
      const errorText = await apifyResponse.text()
      console.error('Apify API error:', errorText)
      return NextResponse.json({ error: 'Failed to start AI visibility check' }, { status: 500 })
    }

    const apifyData = await apifyResponse.json()
    const runId = apifyData.data?.id

    if (!runId) {
      console.error('No runId returned from Apify:', apifyData)
      return NextResponse.json({ error: 'Failed to start AI visibility check' }, { status: 500 })
    }

    console.log('Apify run started:', runId, 'for business:', businessName)

    return NextResponse.json({
      runId,
      businessName,
      firstName,
      keywords,
    })
  } catch (error) {
    console.error('AI visibility run error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
