import { NextResponse } from 'next/server'
import { parseLead, normalizeUrl, businessTypes, packageLabel, type Lead } from '@/lib/lead'

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

function emailHtml(lead: Lead) {
  const type = businessTypes.find((t) => t.value === lead.type)?.label ?? lead.type
  const rows: [string, string][] = [
    ['Package', packageLabel(lead.package, lead.creative) || 'Not picked (audit only)'],
    ['Name', lead.name],
    ['Business', lead.business],
    ['Website', lead.website],
    ['Email', lead.email],
    ['Phone', lead.phone],
    ['Type', type],
    ['Area', lead.area || '-'],
    ['Ad spend', lead.spend || '-'],
  ]
  return `<h2 style="font-family:sans-serif">New free audit request</h2>
<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
${rows.map(([k, v]) => `<tr><td style="padding:6px 16px 6px 0;color:#666">${k}</td><td style="padding:6px 0"><strong>${esc(v)}</strong></td></tr>`).join('\n')}
</table>
<p style="font-family:sans-serif"><a href="${esc(normalizeUrl(lead.website))}">Open their website →</a></p>`
}

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  // Honeypot filled in: pretend success so bots move on.
  if (body && typeof body === 'object' && (body as Record<string, unknown>).company_site) {
    return NextResponse.json({ ok: true })
  }

  const { lead, error } = parseLead(body)
  if (!lead) return NextResponse.json({ error }, { status: 400 })

  // Always log, so a lead is never lost even if email is misconfigured.
  console.log('[audit-request]', JSON.stringify({ ...lead, at: new Date().toISOString() }))

  const key = process.env.RESEND_API_KEY
  const to = process.env.LEAD_INBOX
  if (!key || !to) {
    console.warn('[audit-request] RESEND_API_KEY or LEAD_INBOX not set; lead only logged.')
    return NextResponse.json({ ok: true })
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.LEAD_FROM || 'Higher Level <onboarding@higherleveladz.com>',
      to: to.split(',').map((s) => s.trim()),
      reply_to: lead.email,
      subject: `${lead.package ? 'Package request' : 'Free audit request'}: ${lead.business}`,
      html: emailHtml(lead),
    }),
  })

  if (!res.ok) {
    console.error('[audit-request] Resend failed', res.status, await res.text().catch(() => ''))
    return NextResponse.json(
      { error: 'We couldn’t send that just now. Please try again in a minute.' },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true })
}
