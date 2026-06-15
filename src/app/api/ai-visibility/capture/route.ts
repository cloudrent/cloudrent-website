import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

interface EngineResult {
  engine: string
  engineLabel: string
  keyword: string
  status: 'found' | 'not_found' | 'timeout' | 'error'
  snippets: string[]
  rank?: number
  competitorMentions: string[]
}

interface CaptureRequest {
  firstName: string
  businessName: string
  email: string
  phone: string
  keywords: string[]
  results: EngineResult[]
  score: number
  totalEngines: number
  apifyRunId?: string
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

function generateReportEmail(data: CaptureRequest): string {
  const { firstName, businessName, score, totalEngines, results, keywords } = data

  // Group results by engine for summary
  const engineSummary = new Map<string, { label: string; found: boolean }>()
  for (const result of results) {
    if (!engineSummary.has(result.engine)) {
      engineSummary.set(result.engine, {
        label: result.engineLabel,
        found: result.status === 'found',
      })
    } else if (result.status === 'found') {
      engineSummary.get(result.engine)!.found = true
    }
  }

  // Generate engine status grid
  const engineGridHtml = Array.from(engineSummary.entries())
    .map(([, { label, found }]) => {
      const icon = found
        ? '<span style="color: #22c55e; font-size: 18px;">&#10003;</span>'
        : '<span style="color: #ef4444; font-size: 18px;">&#10007;</span>'
      return `
        <td style="padding: 12px 16px; text-align: center; border: 1px solid rgba(255,255,255,0.1);">
          ${icon}<br>
          <span style="color: #a3a3a3; font-size: 12px;">${label}</span>
        </td>
      `
    })
    .join('')

  // Group results by keyword
  const resultsByKeyword = keywords.map((keyword) => ({
    keyword,
    engines: results.filter((r) => r.keyword === keyword),
  }))

  // Generate keyword breakdown
  const keywordBreakdownHtml = resultsByKeyword
    .map(
      ({ keyword, engines }) => `
      <tr>
        <td style="padding: 16px; border-bottom: 1px solid rgba(255,255,255,0.1);">
          <p style="color: #a855f7; font-size: 14px; margin: 0 0 12px 0; font-weight: 500;">"${keyword}"</p>
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
              ${engines
                .map((e) => {
                  const icon = e.status === 'found'
                    ? '<span style="color: #22c55e;">&#10003;</span>'
                    : e.status === 'not_found'
                    ? '<span style="color: #ef4444;">&#10007;</span>'
                    : '<span style="color: #f59e0b;">?</span>'
                  return `
                    <td style="padding: 4px 8px; text-align: center;">
                      ${icon}<br>
                      <span style="color: #737373; font-size: 10px;">${e.engineLabel}</span>
                    </td>
                  `
                })
                .join('')}
            </tr>
          </table>
          ${engines.some((e) => e.snippets.length > 0)
            ? `<p style="color: #e5e5e5; font-size: 13px; margin: 12px 0 0 0; padding: 12px; background: rgba(255,255,255,0.05); border-radius: 8px;">${engines
                .filter((e) => e.snippets.length > 0)
                .map((e) => e.snippets[0])
                .join(' ... ')
                .substring(0, 300)}...</p>`
            : ''}
        </td>
      </tr>
    `
    )
    .join('')

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your AI Visibility Report - ${businessName}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0e0b14; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #0e0b14;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: 0 auto; max-width: 600px;">

          <!-- Header -->
          <tr>
            <td style="text-align: center; padding-bottom: 32px;">
              <img src="https://www.cloudrent.me/cloudrent-logo-white.svg" alt="CloudRent" width="150" style="display: inline-block;">
            </td>
          </tr>

          <!-- Intro -->
          <tr>
            <td style="padding-bottom: 24px;">
              <p style="color: #a3a3a3; font-size: 14px; margin: 0;">Hi${firstName ? ` ${firstName}` : ''},</p>
              <p style="color: #e5e5e5; font-size: 16px; margin: 16px 0 0 0;">Here's your AI Visibility Report for <strong>${businessName}</strong>. We checked how your business appears across major AI search engines.</p>
            </td>
          </tr>

          <!-- Score Card -->
          <tr>
            <td style="background: linear-gradient(135deg, rgba(136,27,169,0.2) 0%, rgba(136,27,169,0.05) 100%); border: 1px solid rgba(136,27,169,0.3); border-radius: 16px; padding: 32px; text-align: center;">
              <p style="color: #a3a3a3; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 8px 0;">AI Visibility Score</p>
              <p style="color: #ffffff; font-size: 72px; font-weight: 600; margin: 0; line-height: 1;">
                ${score}<span style="font-size: 24px; color: #a3a3a3;"> / ${totalEngines}</span>
              </p>
              <p style="color: #a855f7; font-size: 18px; margin: 16px 0 0 0;">
                ${score === 0
                  ? 'Not Found in AI Search'
                  : score < totalEngines / 2
                  ? 'Partially Visible'
                  : score < totalEngines
                  ? 'Good Visibility'
                  : 'Excellent Visibility'}
              </p>
            </td>
          </tr>

          <!-- Engine Summary -->
          <tr>
            <td style="padding-top: 24px;">
              <p style="color: #ffffff; font-size: 16px; font-weight: 500; margin: 0 0 16px 0;">Engine-by-Engine Results</p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: rgba(255,255,255,0.05); border-radius: 12px; overflow: hidden;">
                <tr>
                  ${engineGridHtml}
                </tr>
              </table>
            </td>
          </tr>

          <!-- Keyword Breakdown -->
          <tr>
            <td style="padding-top: 32px;">
              <p style="color: #ffffff; font-size: 16px; font-weight: 500; margin: 0 0 16px 0;">Results by Keyword</p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: rgba(255,255,255,0.05); border-radius: 12px; overflow: hidden;">
                ${keywordBreakdownHtml}
              </table>
            </td>
          </tr>

          <!-- Recommendations -->
          <tr>
            <td style="padding-top: 32px;">
              <p style="color: #ffffff; font-size: 16px; font-weight: 500; margin: 0 0 16px 0;">How to Improve Your AI Visibility</p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: rgba(255,255,255,0.05); border-radius: 12px; overflow: hidden;">
                <tr>
                  <td style="padding: 16px; border-bottom: 1px solid rgba(255,255,255,0.1);">
                    <span style="display: inline-block; width: 24px; height: 24px; background: #881ba9; border-radius: 50%; text-align: center; line-height: 24px; margin-right: 12px; font-weight: bold; color: white;">1</span>
                    <span style="color: #e5e5e5;">Build a strong online presence with quality content about your services</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px; border-bottom: 1px solid rgba(255,255,255,0.1);">
                    <span style="display: inline-block; width: 24px; height: 24px; background: #881ba9; border-radius: 50%; text-align: center; line-height: 24px; margin-right: 12px; font-weight: bold; color: white;">2</span>
                    <span style="color: #e5e5e5;">Get listed on industry directories and review platforms</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px;">
                    <span style="display: inline-block; width: 24px; height: 24px; background: #881ba9; border-radius: 50%; text-align: center; line-height: 24px; margin-right: 12px; font-weight: bold; color: white;">3</span>
                    <span style="color: #e5e5e5;">Use CloudRent Pro to boost your visibility with structured data and SEO-optimized pages</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding-top: 40px; text-align: center;">
              <p style="color: #e5e5e5; font-size: 16px; margin: 0 0 24px 0;">CloudRent Pro helps your business get found across every AI search engine</p>
              <a href="https://www.cloudrent.me/try?utm_source=ai_visibility&utm_medium=email&utm_campaign=report" style="display: inline-block; background: #881ba9; color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 100px; font-weight: 600; font-size: 16px;">Start Your Free Trial</a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top: 48px; border-top: 1px solid rgba(255,255,255,0.1); margin-top: 48px;">
              <p style="color: #737373; font-size: 12px; margin: 24px 0 0 0; text-align: center;">
                CloudRent Pro - Rental software for hire businesses<br>
                <a href="https://www.cloudrent.me" style="color: #737373;">www.cloudrent.me</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
}

function generateLeadNotificationEmail(data: CaptureRequest): string {
  const { firstName, businessName, email, phone, score, totalEngines, keywords, results } = data

  const engineList = [...new Set(results.map((r) => r.engineLabel))]
    .map((label) => {
      const found = results.some((r) => r.engineLabel === label && r.status === 'found')
      return `<li>${label}: ${found ? '&#10003; Found' : '&#10007; Not found'}</li>`
    })
    .join('')

  return `
    <h2>New AI Visibility Lead</h2>
    <p><strong>Business:</strong> ${businessName}</p>
    <p><strong>Contact:</strong> ${firstName || 'N/A'}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
    <hr>
    <p><strong>AI Visibility Score:</strong> ${score}/${totalEngines} engines</p>
    <p><strong>Keywords Checked:</strong></p>
    <ul>
      ${keywords.map((k) => `<li>${k}</li>`).join('')}
    </ul>
    <p><strong>Engine Results:</strong></p>
    <ul>
      ${engineList}
    </ul>
    <hr>
    <p><a href="https://www.cloudrent.me/admin/collections/ai-visibility-leads">View in Admin</a></p>
  `
}

export async function POST(request: Request) {
  // Check for API key
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not configured')
    return NextResponse.json({ error: 'Email service not configured' }, { status: 500 })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const body: CaptureRequest = await request.json()
    const {
      firstName,
      businessName,
      email,
      phone,
      keywords,
      results,
      score,
      totalEngines,
      apifyRunId,
      turnstileToken,
    } = body

    // Validate required fields
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    }

    if (!businessName) {
      return NextResponse.json({ error: 'Business name is required' }, { status: 400 })
    }

    if (!phone) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 })
    }

    // Verify Turnstile token (if configured)
    if (process.env.TURNSTILE_SECRET_KEY && turnstileToken) {
      const isValidToken = await verifyTurnstileToken(turnstileToken)
      if (!isValidToken) {
        console.log(`Blocked submission: invalid turnstile token - ${email}`)
        return NextResponse.json({ error: 'Security verification failed' }, { status: 400 })
      }
    }

    // Save lead to database
    const payload = await getPayload({ config })

    const lead = await payload.create({
      collection: 'ai-visibility-leads',
      data: {
        firstName: firstName || undefined,
        businessName,
        email,
        phone: phone || undefined,
        keywords: keywords.map((keyword) => ({ keyword })),
        score: score || 0,
        totalEngines: totalEngines || 6,
        engineResults: results,
        apifyRunId: apifyRunId || undefined,
        status: 'new',
        emailSent: false,
      },
    })

    console.log('AI Visibility lead saved:', lead.id)

    // Generate and send email to user
    const emailHtml = generateReportEmail(body)
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'CloudRent <onboarding@resend.dev>'

    console.log('Sending AI Visibility report to:', email)

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [email],
      subject: `Your AI Visibility Report - ${businessName}`,
      html: emailHtml,
    })

    if (error) {
      console.error('Report email error:', JSON.stringify(error, null, 2))
      return NextResponse.json({ error: 'Failed to send email', details: error.message }, { status: 500 })
    }

    console.log('Report email sent successfully:', data?.id)

    // Update lead to mark email as sent
    await payload.update({
      collection: 'ai-visibility-leads',
      id: lead.id,
      data: { emailSent: true },
    })

    // Send lead notification to sales team
    console.log('Sending lead notification to:', process.env.CONTACT_EMAIL || 'sales@cloudrent.me')

    const { error: leadError } = await resend.emails.send({
      from: fromEmail,
      to: [process.env.CONTACT_EMAIL || 'sales@cloudrent.me'],
      subject: `[AI Visibility Lead] ${businessName} - Score ${score}/${totalEngines}`,
      html: generateLeadNotificationEmail(body),
    })

    if (leadError) {
      console.error('Lead notification error:', JSON.stringify(leadError, null, 2))
    }

    return NextResponse.json({ success: true, leadId: lead.id })
  } catch (error) {
    console.error('AI visibility capture error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
