import { Resend } from 'resend'
import { NextResponse } from 'next/server'

// Spam detection utilities
const BLOCKED_EMAIL_DOMAINS = [
  'tempmail.com', 'throwaway.email', 'guerrillamail.com', 'mailinator.com',
  'yopmail.com', 'fakeinbox.com', '10minutemail.com', 'trashmail.com',
  'red.ujaen.es', // Known spam source
]

function isGibberish(text: string): boolean {
  if (!text || text.length < 3) return false

  // Check for excessive random characters (high consonant ratio, random case mixing)
  const cleaned = text.replace(/[^a-zA-Z]/g, '')
  if (cleaned.length < 5) return false

  // Count consonant sequences (gibberish often has long consonant runs)
  const consonantRuns = cleaned.match(/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]{5,}/g)
  if (consonantRuns && consonantRuns.length > 0) return true

  // Check for random case mixing in a single word (LiKe ThIs)
  const words = text.split(/\s+/)
  for (const word of words) {
    if (word.length > 4) {
      const caseChanges = (word.match(/[a-z][A-Z]|[A-Z][a-z]/g) || []).length
      if (caseChanges >= 3) return true
    }
  }

  // Check ratio of uppercase letters (gibberish often has random caps)
  const upperCount = (cleaned.match(/[A-Z]/g) || []).length
  const ratio = upperCount / cleaned.length
  if (ratio > 0.4 && ratio < 0.6 && cleaned.length > 10) return true

  return false
}

function isSpamSubmission(data: { name: string; email: string; company?: string; message: string; website?: string }): { isSpam: boolean; reason?: string } {
  // Honeypot check - if website field is filled, it's a bot
  if (data.website) {
    return { isSpam: true, reason: 'honeypot' }
  }

  // Check blocked email domains
  const emailDomain = data.email.split('@')[1]?.toLowerCase()
  if (emailDomain && BLOCKED_EMAIL_DOMAINS.includes(emailDomain)) {
    return { isSpam: true, reason: 'blocked_domain' }
  }

  // Check for gibberish in name, company, or message
  if (isGibberish(data.name)) {
    return { isSpam: true, reason: 'gibberish_name' }
  }
  if (data.company && isGibberish(data.company)) {
    return { isSpam: true, reason: 'gibberish_company' }
  }
  if (isGibberish(data.message)) {
    return { isSpam: true, reason: 'gibberish_message' }
  }

  return { isSpam: false }
}

export async function POST(request: Request) {
  // Check for API key
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not configured')
    return NextResponse.json(
      { error: 'Email service not configured' },
      { status: 500 }
    )
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const body = await request.json()
    const { name, email, company, phone, subject, message, website } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Spam detection
    const spamCheck = isSpamSubmission({ name, email, company, message, website })
    if (spamCheck.isSpam) {
      console.log(`Blocked spam submission: ${spamCheck.reason} - ${email}`)
      // Return success to not tip off the bot
      return NextResponse.json({ success: true, id: 'blocked' })
    }

    // Map subject to readable text
    const subjectMap: Record<string, string> = {
      demo: 'Demo Request',
      sales: 'Sales Enquiry',
      support: 'Technical Support',
      billing: 'Billing Question',
      partnership: 'Partnership Opportunity',
      other: 'General Enquiry',
    }

    const subjectText = subjectMap[subject] || subject

    // Send email to CloudRent team
    // Use verified domain or Resend's default onboarding domain
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'CloudRent <onboarding@resend.dev>'

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [process.env.CONTACT_EMAIL || 'sales@cloudrent.me'],
      replyTo: email,
      subject: `[Contact Form] ${subjectText} from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Subject:</strong> ${subjectText}</p>
        <hr />
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br />')}</p>
      `,
    })

    if (error) {
      console.error('Resend error:', JSON.stringify(error, null, 2))
      return NextResponse.json(
        { error: 'Failed to send email', details: error.message },
        { status: 500 }
      )
    }

    // Send confirmation email to user
    await resend.emails.send({
      from: fromEmail,
      to: [email],
      subject: 'Thanks for contacting CloudRent',
      html: `
        <h2>Thanks for reaching out, ${name}!</h2>
        <p>We've received your message and will get back to you within 24 hours.</p>
        <hr />
        <p><strong>Your message:</strong></p>
        <p>${message.replace(/\n/g, '<br />')}</p>
        <hr />
        <p>In the meantime, feel free to:</p>
        <ul>
          <li><a href="https://www.cloudrent.me/demo">Book a demo</a></li>
          <li><a href="https://help.cloudrent.me">Visit our Help Center</a></li>
          <li><a href="https://www.cloudrent.me/pricing">View our pricing</a></li>
        </ul>
        <p>Best regards,<br />The CloudRent Team</p>
      `,
    })

    return NextResponse.json({ success: true, id: data?.id })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
