import { Resend } from 'resend'

let resendInstance: Resend | null = null

function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  if (!apiKey) {
    return null
  }
  if (!resendInstance) {
    resendInstance = new Resend(apiKey)
  }
  return resendInstance
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

export interface ContactEmailPayload {
  ticketId: string
  name: string
  email: string
  company?: string
  subject: string
  message: string
  timestamp: string
  ip: string
}

export async function sendContactEmails(payload: ContactEmailPayload): Promise<{
  sent: boolean
  confirmationSent: boolean
  error?: string
}> {
  const resend = getResendClient()
  if (!resend) {
    return {
      sent: false,
      confirmationSent: false,
      error: 'RESEND_API_KEY is not configured',
    }
  }

  const fromEmail =
    process.env.CONTACT_FROM_EMAIL?.trim() || 'SentinelDev <contact@sentineldev.me>'
  const toEmail =
    process.env.CONTACT_TO_EMAIL?.trim() || 'aisolutionsapex@gmail.com'

  const safeName = escapeHtml(payload.name)
  const safeEmail = escapeHtml(payload.email)
  const safeCompany = payload.company ? escapeHtml(payload.company) : 'Not specified'
  const safeSubject = escapeHtml(payload.subject)
  const safeMessage = escapeHtml(payload.message).replace(/\n/g, '<br />')

  // 1. Primary notification to owner
  const notificationResult = await resend.emails.send({
    from: fromEmail,
    to: [toEmail],
    replyTo: payload.email,
    subject: `[sentineldev.me · ${payload.ticketId}] ${payload.subject}`,
    html: `
      <div style="font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; background:#0B1119; color:#EFF2F2; padding:24px; border-radius:8px; max-width:640px;">
        <p style="font-family: ui-monospace, monospace; font-size:12px; color:#8FD3FF; margin:0 0 8px 0;">
          SENTINELDEV.ME · DIRECT CHANNEL
        </p>
        <h2 style="margin:0 0 16px 0; font-size:20px; color:#EFF2F2;">New Contact Inquiry (${escapeHtml(payload.ticketId)})</h2>
        <table style="width:100%; border-collapse:collapse; margin-bottom:16px; font-size:13px;">
          <tr><td style="padding:6px 0; color:#94A3B8; width:120px;">Name:</td><td style="padding:6px 0; color:#EFF2F2;">${safeName}</td></tr>
          <tr><td style="padding:6px 0; color:#94A3B8;">Email:</td><td style="padding:6px 0; color:#8FD3FF;">${safeEmail}</td></tr>
          <tr><td style="padding:6px 0; color:#94A3B8;">Organization:</td><td style="padding:6px 0; color:#EFF2F2;">${safeCompany}</td></tr>
          <tr><td style="padding:6px 0; color:#94A3B8;">Subject:</td><td style="padding:6px 0; color:#EFF2F2;">${safeSubject}</td></tr>
          <tr><td style="padding:6px 0; color:#94A3B8;">Timestamp:</td><td style="padding:6px 0; color:#94A3B8; font-family:monospace;">${escapeHtml(payload.timestamp)}</td></tr>
          <tr><td style="padding:6px 0; color:#94A3B8;">Client IP:</td><td style="padding:6px 0; color:#94A3B8; font-family:monospace;">${escapeHtml(payload.ip)}</td></tr>
        </table>
        <div style="background:#111B27; border:1px solid #1E2B3A; padding:16px; border-radius:6px; font-size:14px; line-height:1.6; color:#EFF2F2;">
          ${safeMessage}
        </div>
      </div>
    `,
    text: [
      `New Contact Inquiry (${payload.ticketId})`,
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Organization: ${payload.company || 'Not specified'}`,
      `Subject: ${payload.subject}`,
      `Timestamp: ${payload.timestamp}`,
      `IP: ${payload.ip}`,
      '',
      payload.message,
    ].join('\n'),
  })

  if (notificationResult.error) {
    return {
      sent: false,
      confirmationSent: false,
      error: notificationResult.error.message,
    }
  }

  // 2. Auto-confirmation to sender (best-effort)
  let confirmationSent = false
  try {
    const confirmResult = await resend.emails.send({
      from: fromEmail,
      to: [payload.email],
      replyTo: toEmail,
      subject: `Message received [${payload.ticketId}] — sentineldev.me`,
      html: `
        <div style="font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; background:#0B1119; color:#EFF2F2; padding:24px; border-radius:8px; max-width:600px;">
          <p style="font-family: ui-monospace, monospace; font-size:12px; color:#8FD3FF; margin:0 0 8px 0;">
            SENTINELDEV.ME · CONFIRMATION
          </p>
          <h2 style="margin:0 0 12px 0; font-size:20px; color:#EFF2F2;">Thanks for reaching out, ${safeName}.</h2>
          <p style="font-size:14px; line-height:1.6; color:#CBD5E1; margin:0 0 16px 0;">
            Your inquiry regarding <strong>${safeSubject}</strong> has been logged under reference
            <code style="background:#111B27; padding:2px 6px; border-radius:4px; color:#8FD3FF;">${escapeHtml(payload.ticketId)}</code>.
          </p>
          <p style="font-size:13px; line-height:1.6; color:#94A3B8; margin:0;">
            I will review your message and follow up directly within 24 hours.
          </p>
        </div>
      `,
      text: `Hi ${payload.name},\n\nYour inquiry regarding "${payload.subject}" has been received under reference ${payload.ticketId}. I will follow up within 24 hours.\n\n— Sebastián García (sentineldev.me)`,
    })
    confirmationSent = !confirmResult.error
  } catch {
    confirmationSent = false
  }

  return { sent: true, confirmationSent }
}

export async function sendLeadMagnetEmail(params: {
  to: string
  subject: string
  content: string
  leadMagnet: string
  leadScore: number
  company?: string
  role?: string
}): Promise<{ sent: boolean; error?: string }> {
  const resend = getResendClient()
  if (!resend) {
    return { sent: false, error: 'RESEND_API_KEY is not configured' }
  }

  const fromEmail =
    process.env.CONTACT_FROM_EMAIL?.trim() || 'SentinelDev <contact@sentineldev.me>'
  const ownerEmail =
    process.env.CONTACT_TO_EMAIL?.trim() || 'aisolutionsapex@gmail.com'

  const leadResult = await resend.emails.send({
    from: fromEmail,
    to: [params.to],
    replyTo: ownerEmail,
    subject: params.subject,
    text: params.content,
    html: `<pre style="font-family: ui-sans-serif, system-ui, sans-serif; white-space: pre-wrap; line-height: 1.6; color: #1E293B;">${escapeHtml(params.content)}</pre>`,
  })

  if (leadResult.error) {
    return { sent: false, error: leadResult.error.message }
  }

  // Notify owner (best-effort)
  try {
    await resend.emails.send({
      from: fromEmail,
      to: [ownerEmail],
      subject: `[sentineldev.me · Lead] ${params.leadMagnet} (Score: ${params.leadScore})`,
      text: `New lead captured:\nEmail: ${params.to}\nMagnet: ${params.leadMagnet}\nScore: ${params.leadScore}\nRole: ${params.role || 'N/A'}\nCompany: ${params.company || 'N/A'}`,
    })
  } catch {
    // Non-fatal
  }

  return { sent: true }
}

