import Link from 'next/link'
import { Header, Footer, Ticker } from '@/components/Chrome'
import { HouseStage } from '@/components/hero/HouseStage'
import { Configurator } from '@/components/Configurator'
import { site, niches, packages, creativeOptions, facts, steps, auditChecks, faqs } from '@/content/site'

const marks: Record<string, React.ReactNode> = {
  meta: <>Meta</>,
  google: <>Google</>,
  full: (
    <>
      Meta<em>+</em>Google
    </>
  ),
}

export default function Home() {
  const remote = creativeOptions.filter((c) => c.id !== 'shoot')

  return (
    <>
      <Header />
      <main>
        {/* Hero: copy on the side, floating 360° house */}
        <section className="hero">
          <div className="hero-ghost" aria-hidden="true">
            <span data-parallax="0.12">Home</span>
            <span data-parallax="-0.06">Service</span>
          </div>
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <p className="hero-sub">{site.tagline}. Based in Edmond, Oklahoma.</p>
              <h1 className="display hero-title">
                More booked
                <span>jobs.</span>
              </h1>
              <p className="lede">
                Pick a package. We make the ads, run them on Google and Meta, and send the leads straight to
                your phone. You just do the work.
              </p>
              <div className="hero-ctas">
                <Link href="/#lineup" className="btn btn-brand">
                  Shop packages <span className="arrow">→</span>
                </Link>
                <Link href="/audit" className="btn btn-line">
                  Free audit
                </Link>
              </div>
              <div className="hero-meta">
                <span>Done for you</span>
                <span>One client per area</span>
                <span>Live dashboard</span>
              </div>
            </div>
            <HouseStage />
          </div>
        </section>

        <Ticker />

        {/* Product lineup */}
        <section className="section" id="lineup">
          <div className="sec-num" aria-hidden="true" data-parallax="0.1">01</div>
          <div className="wrap">
            <div className="section-head-row" data-reveal>
              <div className="section-head" style={{ marginBottom: 0 }}>
                <div className="kicker kicker-brand">The lineup</div>
                <h2 className="display h2">Pick your package.</h2>
              </div>
              <p className="lede">
                Every package is fully done for you: strategy, creative, setup, tracking, and weekly
                optimization.
              </p>
            </div>
            <div className="lineup">
              {packages.map((p, i) => (
                <div key={p.id} className="product-wrap" data-reveal data-reveal-delay={i * 120}>
                <article className={`product${p.badge ? ' product-featured' : ''}`} data-tilt>
                  <div className="product-top">
                    <span className="product-code">{p.code}</span>
                    {p.badge && <span className="badge">{p.badge}</span>}
                  </div>
                  <div className="product-visual" aria-hidden="true">
                    <span className="pv-ghost">{p.code.replace('HL/', '')}</span>
                    <span className={`platform-mark${p.id === 'full' ? ' is-long' : ''}`}>{marks[p.id]}</span>
                    <span className="pv-orb" />
                  </div>
                  <div>
                    <h3 className="display">{p.name}</h3>
                    <div className="product-sub">{p.sub}</div>
                  </div>
                  <p className="product-pitch">{p.pitch}</p>
                  <ul className="spec">
                    {p.includes.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                  <div className="product-foot">
                    <div className="price-row">
                      <span>Price</span>
                      <strong>{p.price || 'Quoted on your call'}</strong>
                    </div>
                    <Link
                      href={`/audit?package=${p.id}`}
                      className={`btn btn-block ${p.badge ? 'btn-brand' : 'btn-line'}`}
                    >
                      Get {p.name} <span className="arrow">→</span>
                    </Link>
                  </div>
                </article>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Facts */}
        <section className="section">
          <div className="wrap facts">
            <h2 className="display facts-title" data-reveal>
              Built
              <br />
              different.
            </h2>
            <div className="fact-table" data-reveal data-reveal-delay={120}>
              {facts.map((f) => (
                <div key={f.n + f.body} className={`fact-row${f.highlight ? ' is-hl' : ''}`}>
                  <div className="fact-n">
                    {f.n}
                    {f.unit && <small>{f.unit}</small>}
                  </div>
                  <p>{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Configurator */}
        <section className="section" id="build">
          <div className="sec-num" aria-hidden="true" data-parallax="0.1">02</div>
          <div className="wrap">
            <div className="section-head" data-reveal>
              <div className="kicker kicker-brand">Configure</div>
              <h2 className="display h2">Build your package.</h2>
              <p className="lede">Choose your platform, then how we make your ads.</p>
            </div>
            <div data-reveal>
              <Configurator />
            </div>
          </div>
        </section>

        {/* Creative */}
        <section className="section creative">
          <div className="sec-num" aria-hidden="true" data-parallax="0.1">03</div>
          <div className="creative-ghost" aria-hidden="true" data-parallax="-0.08">
            Shoot
          </div>
          <div className="wrap creative-inner">
            <div className="section-head" data-reveal>
              <div className="kicker kicker-brand">Creative included</div>
              <h2 className="display h2">We make the ads too.</h2>
            </div>
            <div className="creative-grid">
              <div className="creative-card is-local" data-reveal>
                <div className="kicker">If you’re {site.localArea}</div>
                <h3 className="display">We come shoot it all.</h3>
                <p>
                  Your crew, your trucks, your finished jobs. We show up, film everything, and turn it into ads.
                  You don’t lift a finger.
                </p>
                <div className="radius" aria-hidden="true">
                  <span>
                    25 mi
                    <small>Edmond, OK</small>
                  </span>
                </div>
              </div>
              <div className="creative-card" data-reveal data-reveal-delay={120}>
                <div className="kicker">Anywhere else</div>
                <h3 className="display">Still covered.</h3>
                <ul className="opt-list">
                  {remote.map((o, i) => (
                    <li key={o.id}>
                      <span className="num-ghost">0{i + 1}</span>
                      <strong>{o.name}</strong>
                      <span>{o.body}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <Ticker tone="ink" items={niches} />

        {/* How it works */}
        <section className="section" id="how">
          <div className="sec-num" aria-hidden="true" data-parallax="0.1">04</div>
          <div className="wrap">
            <div className="section-head" data-reveal>
              <div className="kicker kicker-brand">How it works</div>
              <h2 className="display h2">Four steps. Zero busywork.</h2>
            </div>
            <div className="steps grid-lines">
              {steps.map((s, i) => (
                <div key={s.title} className="step" data-reveal data-reveal-delay={i * 100}>
                  <span className="num-ghost">0{i + 1}</span>
                  <h3 className="display">{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Audit */}
        <section className="section">
          <div className="wrap audit-band">
            <div className="section-head" data-reveal>
              <div className="kicker kicker-brand">Step one is free</div>
              <h2 className="display h2">Find your leaks.</h2>
              <p className="lede">
                Every package starts with a free audit of your site and ads. You’ll see exactly what’s costing
                you jobs, whether or not we work together.
              </p>
              <div>
                <Link href="/audit" className="btn btn-brand">
                  Get my free audit <span className="arrow">→</span>
                </Link>
              </div>
            </div>
            <ul className="audit-checks" data-reveal data-reveal-delay={120}>
              {auditChecks.map((c) => (
                <li key={c.title}>
                  <strong>{c.title}</strong>
                  <span>{c.body}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="section" id="faq">
          <div className="wrap faq-grid">
            <div className="section-head" data-reveal>
              <div className="kicker kicker-brand">FAQ</div>
              <h2 className="display h2">Good questions.</h2>
            </div>
            <div className="faq" data-reveal>
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
        <section className="cta">
          <div className="wrap">
          <div className="cta-card" data-reveal>
          <span className="cta-orb" aria-hidden="true" />
          <span className="cta-orb sm" aria-hidden="true" />
          <div className="cta-inner">
            <div className="kicker">Your area might still be open</div>
            <h2 className="display">
              Claim your
              <br />
              <span>market.</span>
            </h2>
            <p>We take one client per niche, per area. Grab your package before a competitor does.</p>
            <div className="hero-ctas">
              <Link href="/#lineup" className="btn btn-brand">
                Shop packages <span className="arrow">→</span>
              </Link>
              <Link href="/audit" className="btn btn-line">
                Free audit
              </Link>
            </div>
          </div>
          </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
