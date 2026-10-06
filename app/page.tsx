import Link from 'next/link'
import { Header, Footer } from '@/components/Chrome'
import {
  site,
  platforms,
  niches,
  steps,
  creative,
  auditChecks,
  fitTraits,
  faqs,
  results,
  ecommerceComingSoon,
} from '@/content/site'

export default function Home() {
  const localWord = site.localArea ? `in ${site.localArea}` : 'near us'

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="hero">
          <div className="wrap hero-inner">
            <div className="eyebrow">{site.tagline}</div>
            <h1>
              More booked jobs. <span>Not more clicks.</span>
            </h1>
            <p className="lede">
              We run paid ads for plumbers, HVAC, roofers, dentists, med spas, and other local pros, and we
              make the creative that goes in them. One client per niche, per area.
            </p>
            <div className="hero-ctas">
              <Link href="/audit" className="btn btn-primary">
                Get my free audit
              </Link>
              <Link href="/#how" className="btn btn-ghost">
                How it works
              </Link>
            </div>
            <p className="hero-note">Free. Takes 60 seconds to request.</p>
            <div className="platforms" aria-label="Platforms">
              {platforms.map((p) => (
                <span key={p} className="pill">
                  {p} Ads
                </span>
              ))}
            </div>
          </div>
        </section>

        <div className="niches">
          <div className="wrap niche-row">
            {niches.map((n) => (
              <span key={n}>{n}</span>
            ))}
          </div>
        </div>

        {/* What we do */}
        <section className="section">
          <div className="wrap">
            <div className="section-head">
              <div className="eyebrow">Who we are</div>
              <h2 className="display">A paid ads agency. That’s it.</h2>
              <p className="lede">
                No SEO, no websites, no social posting. We run ads on Meta, Google, and TikTok for businesses
                that serve their community, and because that’s all we do, we’re very good at it.
              </p>
            </div>
            <div className="grid grid-3">
              <div className="card">
                <h3>Leads, not likes</h3>
                <p>Every campaign is built around calls, form fills, and booked jobs, and tracked to them.</p>
              </div>
              <div className="card">
                <h3>Creative included</h3>
                <p>We shoot or produce the ads ourselves, so you’re never stuck waiting on content.</p>
              </div>
              <div className="card">
                <h3>A live dashboard</h3>
                <p>Log in any time to see spend, leads, and cost per lead. No waiting on a monthly PDF.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Creative */}
        <section className="section" id="creative">
          <div className="wrap">
            <div className="section-head">
              <div className="eyebrow">Creative</div>
              <h2 className="display">We handle the content too.</h2>
              <p className="lede">Great ads need great footage. Wherever you are, we’ve got a way to get it.</p>
            </div>
            <div className="creative">
              <div className="card card-feature">
                <div className="eyebrow">If you’re {localWord}</div>
                <h3>{creative.local.title}</h3>
                <p>{creative.local.body}</p>
              </div>
              <div className="card card-plain">
                <h3 className="big">{creative.remote.title}</h3>
                <div className="option-list">
                  {creative.remote.options.map((o) => (
                    <div key={o.title} className="option">
                      <strong>{o.title}</strong>
                      <span>{o.body}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="section" id="how">
          <div className="wrap">
            <div className="section-head">
              <div className="eyebrow">How it works</div>
              <h2 className="display">It starts with a free audit.</h2>
            </div>
            <div className="grid grid-4">
              {steps.map((s, i) => (
                <div key={s.title} className="card">
                  <div className="step-num">{i + 1}</div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Market lock */}
        <section className="section">
          <div className="wrap lock">
            <div className="lock-big">
              Your market.
              <br />
              <span>Locked.</span>
            </div>
            <div className="section-head" style={{ marginBottom: 0 }}>
              <div className="eyebrow">One client per niche, per area</div>
              <p className="lede">
                When we take you on, we close your niche in your area. We won’t take on a competitor in your
                market for as long as you’re a client. Period.
              </p>
            </div>
          </div>
        </section>

        {/* Results: only shows once real results are added in content/site.ts */}
        {results.length > 0 && (
          <section className="section" id="results">
            <div className="wrap">
              <div className="section-head">
                <div className="eyebrow">Real campaigns · Real numbers</div>
                <h2 className="display">What good looks like.</h2>
              </div>
              <div className="grid grid-3">
                {results.map((r) => (
                  <div key={r.tag + r.metric} className="card">
                    <div className="result-tag">{r.tag}</div>
                    <div className="result-num">{r.number}</div>
                    <h3>{r.metric}</h3>
                    <p>{r.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Audit */}
        <section className="section">
          <div className="wrap">
            <div className="section-head">
              <div className="eyebrow">The free audit</div>
              <h2 className="display">Find out where your leads are leaking.</h2>
            </div>
            <div className="grid grid-5">
              {auditChecks.map((c) => (
                <div key={c.title} className="card">
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 28 }}>
              <Link href="/audit" className="btn btn-primary">
                Get my free audit
              </Link>
            </div>
          </div>
        </section>

        {/* Fit */}
        <section className="section">
          <div className="wrap">
            <div className="section-head">
              <div className="eyebrow">Who we’re looking for</div>
              <h2 className="display">We’re selective on purpose.</h2>
              <p className="lede">
                We work with a small number of clients and go deep with each one. The right fit gets
                exceptional results.
              </p>
            </div>
            <div className="grid grid-3">
              {fitTraits.map((t) => (
                <div key={t.title} className="card">
                  <h3>{t.title}</h3>
                  <p>{t.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section" id="faq">
          <div className="wrap narrow">
            <div className="section-head">
              <div className="eyebrow">FAQ</div>
              <h2 className="display">Questions we get a lot.</h2>
            </div>
            <div className="faq">
              {faqs.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="section">
          <div className="wrap" style={{ display: 'grid', gap: 20 }}>
            <div className="cta-band">
              <div className="eyebrow">Free · No obligation</div>
              <h2>See what your ads could be doing.</h2>
              <p className="lede">
                Request your audit. If it looks like a fit, we’ll set up a demo call and walk you through it.
              </p>
              <Link href="/audit" className="btn btn-primary">
                Get my free audit
              </Link>
            </div>
            {ecommerceComingSoon && (
              <div className="soon">
                <span>Run an online store? Ecommerce ads are coming to Higher Level soon.</span>
                <Link href="/audit?type=ecommerce" className="btn btn-ghost">
                  Get on the list
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
