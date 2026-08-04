import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

// Types
interface PillarScores {
  [key: string]: number
}

interface ScorecardData {
  email: string
  businessName: string
  score: number
  level: {
    num: number
    name: string
    blurb: string
  }
  leakMonthly: number
  leakAnnual: number
  pillarScores: PillarScores
  weakest: string | null
  strongest: string | null
  industry: string
  objection?: string
  turnstileToken?: string
}

// Turnstile verification
async function verifyTurnstileToken(token: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY
  if (!secretKey) {
    console.warn('TURNSTILE_SECRET_KEY not configured, skipping verification')
    return true // Allow submission if Turnstile not configured
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

// Pillar insights for the email
const PILLAR_INSIGHTS: Record<string, string> = {
  'Bookings & Quotes':
    'Most leaks here come from double-bookings, lost enquiries, and quotes that never get followed up.',
  'Invoicing & Cash':
    "Late invoices and chased payments quietly add 10–20 days to your debtor days. That's working capital that should be yours.",
  'Dispatch & Logistics':
    'When drivers freelance the day, you lose trips, fuel, and the ability to slot in late jobs profitably.',
  'Equipment & Damage':
    "Uncharged damage and 'lost' assets compound. Operators with poor visibility typically write off 2–4% of fleet value yearly.",
  'Team & Compliance':
    'Manual rostering and paper timesheets create payroll leakage and SWMS gaps that bite when an audit lands.',
}

// Pillar-specific fix recommendations
const PILLAR_FIXES: Record<string, string[]> = {
  'Bookings & Quotes': [
    'Set up an online booking portal that feeds directly into your system — eliminates double-entry and phone tag',
    'Implement automated quote follow-ups at 24h and 72h — most lost deals happen from forgotten quotes',
    'Use real-time availability calendars so customers can self-serve and you avoid double-bookings',
  ],
  'Invoicing & Cash': [
    'Auto-generate invoices on off-hire — every day you delay costs you cash flow',
    'Add pay-now links (Stripe/similar) to every invoice — reduces debtor days by 30-50%',
    'Set up card-on-file with auto-charge for repeat customers — eliminates chasing entirely',
  ],
  'Dispatch & Logistics': [
    'Give drivers a mobile app with their daily jobs and route — no more morning briefings or SMS chaos',
    'Enable real-time job status updates — know exactly where every delivery is',
    'Add route optimisation — most operators save 15-20% on fuel and fit in more jobs per day',
  ],
  'Equipment & Damage': [
    'Capture photos + condition checklist on every pickup and return — tied to the rental record',
    'Implement barcode/QR scanning for asset tracking — know exactly where every item is',
    'Set up automated damage billing — charge for damage while the evidence is fresh',
  ],
  'Team & Compliance': [
    'Move to a clock-in/clock-out app — eliminates timesheet fraud and manual entry',
    'Digitise SWMS and inductions — always audit-ready with timestamped records',
    'Use roster software with shift notifications — reduce no-shows and last-minute scrambles',
  ],
}

function formatMoney(n: number): string {
  if (!n || isNaN(n)) return '$0'
  return '$' + Math.round(n).toLocaleString('en-AU')
}

function industryLabel(key: string): string {
  const map: Record<string, string> = {
    construction: 'construction & plant',
    event: 'event & party',
    tool: 'tool hire & rental',
    scaffold: 'scaffold & fencing',
    av: 'AV & film',
    other: 'hire & rental',
  }
  return map[key] || 'hire & rental'
}

function generateEmailHtml(data: ScorecardData): string {
  const { score, level, leakMonthly, leakAnnual, pillarScores, weakest, strongest, industry, businessName } = data

  // Generate pillar bars
  const pillarBarsHtml = Object.entries(pillarScores)
    .map(([pillar, pillarScore]) => {
      const pct = pillarScore * 10
      const isWeakest = pillar === weakest
      const isStrongest = pillar === strongest
      const barColor = isWeakest ? '#f97316' : isStrongest ? '#22c55e' : '#a855f7'
      const tag = isWeakest ? ' <span style="color: #f97316; font-size: 10px;">(WEAKEST)</span>' : isStrongest ? ' <span style="color: #22c55e; font-size: 10px;">(STRONGEST)</span>' : ''

      return `
        <div style="margin-bottom: 16px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span style="color: #e5e5e5;">${pillar}${tag}</span>
            <span style="color: #a3a3a3;">${pillarScore.toFixed(1)} / 10</span>
          </div>
          <div style="background: rgba(255,255,255,0.1); border-radius: 4px; height: 8px; overflow: hidden;">
            <div style="background: ${barColor}; height: 100%; width: ${pct}%;"></div>
          </div>
        </div>
      `
    })
    .join('')

  // Get fixes for weakest pillar
  const fixes = weakest ? PILLAR_FIXES[weakest] || [] : []
  const fixesHtml = fixes
    .map(
      (fix, i) => `
      <tr>
        <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.1);">
          <span style="display: inline-block; width: 24px; height: 24px; background: #881ba9; border-radius: 50%; text-align: center; line-height: 24px; margin-right: 12px; font-weight: bold;">${i + 1}</span>
          <span style="color: #e5e5e5;">${fix}</span>
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
  <title>Your CloudRent Scorecard Results</title>
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
              <p style="color: #a3a3a3; font-size: 14px; margin: 0;">Hi${businessName ? ` ${businessName}` : ''} team,</p>
              <p style="color: #e5e5e5; font-size: 16px; margin: 16px 0 0 0;">Here's your detailed Revenue Leak Scorecard report. Below you'll find your score, where you're strong, where you're leaking, and specific fixes for your weakest area.</p>
            </td>
          </tr>

          <!-- Score Card -->
          <tr>
            <td style="background: linear-gradient(135deg, rgba(136,27,169,0.2) 0%, rgba(136,27,169,0.05) 100%); border: 1px solid rgba(136,27,169,0.3); border-radius: 16px; padding: 32px; text-align: center;">
              <p style="color: #a3a3a3; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 8px 0;">Your Score</p>
              <p style="color: #ffffff; font-size: 72px; font-weight: 600; margin: 0; line-height: 1;">
                ${score}<span style="font-size: 24px; color: #a3a3a3;"> / 100</span>
              </p>
              <p style="color: #a855f7; font-size: 24px; font-weight: 500; margin: 16px 0 8px 0;">Level ${level.num}: ${level.name}</p>
              <p style="color: #a3a3a3; font-size: 14px; margin: 0; max-width: 400px; margin-left: auto; margin-right: auto;">${level.blurb}</p>
            </td>
          </tr>

          <!-- Revenue Leak -->
          <tr>
            <td style="padding-top: 24px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, rgba(249,115,22,0.15) 0%, rgba(249,115,22,0.05) 100%); border: 1px solid rgba(249,115,22,0.3); border-radius: 16px;">
                <tr>
                  <td style="padding: 24px;">
                    <p style="color: #f97316; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 16px 0;">📉 Estimated Revenue Leak</p>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td width="50%">
                          <p style="color: #f97316; font-size: 36px; font-weight: 600; margin: 0;">${formatMoney(leakMonthly)}</p>
                          <p style="color: #a3a3a3; font-size: 14px; margin: 4px 0 0 0;">per month</p>
                        </td>
                        <td width="50%">
                          <p style="color: #e5e5e5; font-size: 28px; font-weight: 600; margin: 0;">${formatMoney(leakAnnual)}</p>
                          <p style="color: #a3a3a3; font-size: 14px; margin: 4px 0 0 0;">per year</p>
                        </td>
                      </tr>
                    </table>
                    <p style="color: #737373; font-size: 12px; margin: 16px 0 0 0;">Based on industry studies across ${industryLabel(industry)} operators.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Pillar Breakdown -->
          <tr>
            <td style="padding-top: 32px;">
              <p style="color: #ffffff; font-size: 20px; font-weight: 500; margin: 0 0 20px 0;">Where you're strong, where you're leaking</p>
              ${pillarBarsHtml}
              ${weakest ? `<p style="color: #a3a3a3; font-size: 14px; margin: 16px 0 0 0;"><strong style="color: #e5e5e5;">Your weakest pillar is ${weakest}.</strong> ${PILLAR_INSIGHTS[weakest] || ''}</p>` : ''}
            </td>
          </tr>

          <!-- Top 3 Fixes -->
          ${weakest ? `
          <tr>
            <td style="padding-top: 32px;">
              <p style="color: #ffffff; font-size: 20px; font-weight: 500; margin: 0 0 20px 0;">Top 3 fixes for ${weakest}</p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: rgba(255,255,255,0.05); border-radius: 12px; overflow: hidden;">
                ${fixesHtml}
              </table>
            </td>
          </tr>
          ` : ''}

          <!-- CTA -->
          <tr>
            <td style="padding-top: 40px; text-align: center;">
              <p style="color: #e5e5e5; font-size: 16px; margin: 0 0 24px 0;">Ready to plug the leaks?</p>
              <a href="https://www.cloudrent.me/demo?utm_source=scorecard&utm_medium=email&utm_campaign=report" style="display: inline-block; background: #881ba9; color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 100px; font-weight: 600; font-size: 16px;">Book a 30-min walkthrough with Ron</a>
              <p style="margin: 16px 0 0 0;">
                <a href="https://app.cloudrent.me/register?utm_source=scorecard&utm_medium=email&utm_campaign=report" style="color: #a3a3a3; font-size: 14px; text-decoration: underline;">Or start a $1 first month of CloudRent Pro</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top: 48px; border-top: 1px solid rgba(255,255,255,0.1); margin-top: 48px;">
              <p style="color: #737373; font-size: 12px; margin: 24px 0 0 0; text-align: center;">
                CloudRent • Rental software for hire businesses<br>
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

export async function POST(request: Request) {
  // Check for API key
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not configured')
    return NextResponse.json({ error: 'Email service not configured' }, { status: 500 })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const body: ScorecardData = await request.json()
    const { email, businessName, score, level, leakMonthly, leakAnnual, pillarScores, weakest, strongest, industry, turnstileToken } = body

    // Validate required fields
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    }

    if (score === undefined || !level || !pillarScores) {
      return NextResponse.json({ error: 'Missing scorecard data' }, { status: 400 })
    }

    // Verify Turnstile token (if configured)
    if (process.env.TURNSTILE_SECRET_KEY) {
      if (!turnstileToken) {
        return NextResponse.json({ error: 'Security verification required' }, { status: 400 })
      }

      const isValidToken = await verifyTurnstileToken(turnstileToken)
      if (!isValidToken) {
        console.log(`Blocked submission: invalid turnstile token - ${email}`)
        return NextResponse.json({ error: 'Security verification failed. Please try again.' }, { status: 400 })
      }
    }

    // Save lead to database
    const payload = await getPayload({ config })

    const lead = await payload.create({
      collection: 'scorecard-leads',
      data: {
        email,
        businessName: businessName || undefined,
        industry: (industry as 'construction' | 'event' | 'tool' | 'scaffold' | 'av' | 'other') || 'other',
        score,
        level: level.num,
        levelName: level.name,
        leakMonthly,
        leakAnnual,
        pillarScores: {
          bookingsQuotes: pillarScores['Bookings & Quotes'] || 0,
          invoicingCash: pillarScores['Invoicing & Cash'] || 0,
          dispatchLogistics: pillarScores['Dispatch & Logistics'] || 0,
          equipmentDamage: pillarScores['Equipment & Damage'] || 0,
          teamCompliance: pillarScores['Team & Compliance'] || 0,
        },
        weakestPillar: weakest || undefined,
        strongestPillar: strongest || undefined,
        status: 'new',
        emailSent: false,
      },
    })

    console.log('Lead saved to database:', lead.id)

    // Generate email HTML
    const emailHtml = generateEmailHtml(body)

    // Send email to user
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'CloudRent <onboarding@resend.dev>'

    console.log('Sending customer email to:', email)
    console.log('From:', fromEmail)

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [email],
      subject: `Your CloudRent Scorecard: Level ${level.num} - ${level.name}`,
      html: emailHtml,
    })

    if (error) {
      console.error('Customer email error:', JSON.stringify(error, null, 2))
      return NextResponse.json({ error: 'Failed to send email', details: error.message }, { status: 500 })
    }

    console.log('Customer email sent successfully:', data?.id)

    // Update lead to mark email as sent
    await payload.update({
      collection: 'scorecard-leads',
      id: lead.id,
      data: {
        emailSent: true,
      },
    })

    // Also send a copy to CloudRent team for lead tracking
    console.log('Sending lead notification to:', process.env.CONTACT_EMAIL || 'sales@cloudrent.me')

    const { data: leadData, error: leadError } = await resend.emails.send({
      from: fromEmail,
      to: [process.env.CONTACT_EMAIL || 'sales@cloudrent.me'],
      subject: `[Scorecard Lead] ${businessName || 'Unknown'} - Score ${score}/100`,
      html: `
        <h2>New Scorecard Lead</h2>
        <p><strong>Business:</strong> ${businessName || 'Not provided'}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Industry:</strong> ${industry}</p>
        <hr>
        <p><strong>Score:</strong> ${score}/100 (Level ${level.num}: ${level.name})</p>
        <p><strong>Monthly Leak:</strong> ${formatMoney(leakMonthly)}</p>
        <p><strong>Annual Leak:</strong> ${formatMoney(leakAnnual)}</p>
        <p><strong>Weakest Pillar:</strong> ${weakest || 'N/A'}</p>
        <p><strong>Strongest Pillar:</strong> ${strongest || 'N/A'}</p>
        <hr>
        <h3>Pillar Scores:</h3>
        <ul>
          ${Object.entries(pillarScores)
            .map(([pillar, pScore]) => `<li>${pillar}: ${pScore}/10</li>`)
            .join('')}
        </ul>
      `,
    })

    if (leadError) {
      console.error('Lead notification error:', JSON.stringify(leadError, null, 2))
    } else {
      console.log('Lead notification sent successfully:', leadData?.id)
    }

    return NextResponse.json({ success: true, id: data?.id })
  } catch (error) {
    console.error('Scorecard report error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
