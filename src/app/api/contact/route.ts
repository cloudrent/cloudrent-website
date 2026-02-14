import { Resend } from 'resend'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const body = await request.json()
    const { name, email, company, phone, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
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
    const { data, error } = await resend.emails.send({
      from: 'CloudRent Contact Form <noreply@cloudrent.me>',
      to: ['sales@cloudrent.me'],
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
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    // Send confirmation email to user
    await resend.emails.send({
      from: 'CloudRent <noreply@cloudrent.me>',
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
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
