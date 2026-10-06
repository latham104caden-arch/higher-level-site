import type { Metadata } from 'next'
import { Header, Footer } from '@/components/Chrome'
import { AuditForm } from '@/components/AuditForm'
import { auditChecks } from '@/content/site'

export const metadata: Metadata = {
  title: 'Free Ads Audit',
  description:
    'Get a free audit of your tracking, landing page, local trust signals, and current ads. Built for local service businesses.',
}

export default async function AuditPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>
}) {
  const { type } = await searchParams
  const ecommerce = type === 'ecommerce'

  return (
    <>
      <Header />
      <main className="audit-page">
        <div className="wrap audit-layout">
          <div>
            <div className="eyebrow">Free audit</div>
            <h1>Find out where your leads are leaking.</h1>
            <p className="lede">
              Tell us about your business. We’ll review your site and ads, then set up a quick demo call to
              walk you through what we found and what we’d do about it.
            </p>
            <ul className="check-list">
              {auditChecks.map((c) => (
                <li key={c.title}>
                  <span>
                    <strong>{c.title}.</strong> {c.body}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="form-card">
            <AuditForm defaultType={ecommerce ? 'ecommerce' : ''} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
