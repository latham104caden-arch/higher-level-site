'use client'

import { useState } from 'react'
import Link from 'next/link'
import { businessTypes, adSpendRanges } from '@/lib/lead'
import { site, creativeOptions } from '@/content/site'

type Status = 'idle' | 'sending' | 'done' | 'error'

export function AuditForm({ pkg, creative }: { pkg: string; creative: string }) {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    setError('')
    const data = Object.fromEntries(new FormData(e.currentTarget).entries())
    try {
      const res = await fetch('/api/audit-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(body.error || 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }
      setStatus('done')
      const w = window as unknown as { fbq?: (...args: unknown[]) => void }
      w.fbq?.('track', 'Lead')
    } catch {
      setError('Could not send. Check your connection and try again.')
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <div className="success" role="status">
        <div className="kicker kicker-brand">Request received</div>
        <h2 className="display">You’re in.</h2>
        {site.bookingUrl ? (
          <>
            <p>New to Higher Level? Grab a time for your demo call and we’ll walk you through your audit live.</p>
            <a href={site.bookingUrl} className="btn btn-brand" target="_blank" rel="noopener noreferrer">
              Book my demo call <span className="arrow">→</span>
            </a>
          </>
        ) : (
          <p>We’ll reach out within one business day to set up your demo call and walk you through your audit.</p>
        )}
        <Link href="/" className="form-fine">
          ← Back to home
        </Link>
      </div>
    )
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <input type="hidden" name="package" value={pkg} />

      <div className="form-row">
        <div className="field">
          <label htmlFor="name">Your name</label>
          <input id="name" name="name" autoComplete="name" required maxLength={120} />
        </div>
        <div className="field">
          <label htmlFor="business">Business name</label>
          <input id="business" name="business" autoComplete="organization" required maxLength={160} />
        </div>
      </div>
      <div className="field">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          inputMode="url"
          autoComplete="url"
          placeholder="yourbusiness.com"
          required
          maxLength={300}
        />
      </div>
      <div className="form-row">
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" required maxLength={200} />
        </div>
        <div className="field">
          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" required maxLength={40} />
        </div>
      </div>
      <div className="field">
        <label htmlFor="type">What kind of business?</label>
        <select id="type" name="type" required defaultValue="">
          <option value="" disabled>
            Choose one
          </option>
          {businessTypes.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="creative">How should we make your ads?</label>
        <select id="creative" name="creative" defaultValue={creative}>
          <option value="">Not sure yet</option>
          {creativeOptions.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} ({c.note})
            </option>
          ))}
        </select>
      </div>
      <div className="form-row">
        <div className="field">
          <label htmlFor="area">Service area</label>
          <input id="area" name="area" placeholder="City, state" maxLength={200} />
        </div>
        <div className="field">
          <label htmlFor="spend">Current ad spend</label>
          <select id="spend" name="spend" defaultValue="">
            <option value="">Prefer not to say</option>
            {adSpendRanges.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Honeypot: real people never see or fill this. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="company_site">Leave this empty</label>
        <input id="company_site" name="company_site" tabIndex={-1} autoComplete="off" />
      </div>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <button type="submit" className="btn btn-brand btn-block" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : pkg ? 'Claim my package' : 'Get my free audit'}
      </button>
      <p className="form-fine">
        Starts with a free audit. We’ll only use this to send it and set up your call. See our{' '}
        <Link href="/privacy">privacy policy</Link>.
      </p>
    </form>
  )
}
