import type { Metadata } from 'next'
import { Header, Footer } from '@/components/Chrome'
import { AuditForm } from '@/components/AuditForm'
import { auditChecks, packages, creativeOptions } from '@/content/site'
import { packageLabel } from '@/lib/lead'

export const metadata: Metadata = {
  title: 'Free Audit',
  description:
    'Claim your package and get a free audit of your tracking, landing page, local trust signals, and current ads.',
}

export default async function AuditPage({
  searchParams,
}: {
  searchParams: Promise<{ package?: string; creative?: string }>
}) {
  const sp = await searchParams
  const pkg = packages.some((p) => p.id === sp.package) ? sp.package! : ''
  const creative = creativeOptions.some((c) => c.id === sp.creative) ? sp.creative! : ''
  const label = packageLabel(pkg, creative)

  return (
    <>
      <Header />
      <main className="audit-page">
        <div className="wrap audit-layout">
          <div>
            <div className="kicker kicker-brand">{label ? 'Claim your package' : 'Free audit'}</div>
            <h1 className="display">{label ? 'Let’s build it.' : 'Find your leaks.'}</h1>
            <p className="lede">
              Tell us about your business. We’ll audit your site and ads for free, then set up a quick demo call
              to walk you through it{label ? ' and get your package live' : ''}.
            </p>
            {label && (
              <div className="build-chip">
                <span>Your build</span>
                <strong>{label}</strong>
              </div>
            )}
            <ul className="audit-checks" style={{ marginTop: 28 }}>
              {auditChecks.map((c) => (
                <li key={c.title}>
                  <strong>{c.title}</strong>
                  <span>{c.body}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="form-card">
            <AuditForm pkg={pkg} creative={creative} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
