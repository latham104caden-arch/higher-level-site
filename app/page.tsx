import Link from 'next/link'
import { Header, Footer, Ticker } from '@/components/Chrome'
import { HouseStage } from '@/components/hero/HouseStage'
import { Stats } from '@/components/Stats'
import { Reviews } from '@/components/Reviews'
import { site, packages, creativeOptions, steps, faqs, startingPrice } from '@/content/site'

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
              <p className="hero-pill">
                <span className="hero-pill-dot" />
                4× avg ROAS · 33 clients · 8 states
              </p>
              <h1 className="display hero-title">
                More booked
                <span>jobs.</span>
              </h1>
              <p className="lede">
                Done-for-you Google and Meta ads for home service businesses. We make the ads, run them, and send
                the leads straight to your phone.
              </p>
              <div className="hero-ctas">
                <Link href="/#lineup" className="btn btn-brand">
                  See packages <span className="arrow">→</span>
                </Link>
                <Link href="/audit" className="btn btn-line">
                  Free audit
                </Link>
              </div>
              <div className="hero-meta">
                <span>From {startingPrice}/mo</span>
                <span>One client per area</span>
                <span>Live dashboard</span>
              </div>
            </div>
            <HouseStage />
          </div>
        </section>

        <Ticker />

        {/* Proof */}
        <Stats />

        {/* Packages */}
        <section className="section tone-paper" id="lineup">
          <div className="wrap">
            <div className="section-head-row" data-reveal>
              <div className="section-head" style={{ marginBottom: 0 }}>
                <div className="kicker kicker-brand">Packages</div>
                <h2 className="display h2">Pick your package.</h2>
              </div>
              <div className="price-tag">
                <span>Starting at</span>
                <strong>
                  {startingPrice}
                  <small>/mo</small>
                </strong>
              </div>
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
                    </div>
                    <div>
                      <h3 className="display">{p.name}</h3>
                      <div className="product-sub">{p.sub}</div>
                    </div>
                    <p className="product-pitch">{p.pitch}</p>
                    <details className="spec-toggle">
                      <summary>
                        What’s included <span className="spec-count">{p.includes.length}</span>
                      </summary>
                      <ul className="spec">
                        {p.includes.map((x) => (
                          <li key={x}>{x}</li>
                        ))}
                      </ul>
                    </details>
                    <div className="product-foot">
                      {p.price && (
                        <div className="price-row">
                          <span>Price</span>
                          <strong>{p.price}</strong>
                        </div>
                      )}
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
            <p className="swipe-hint" aria-hidden="true">
              Swipe to see all 3 packages <span className="arrow">→</span>
            </p>
          </div>
        </section>

        {/* Reviews */}
        <section className="section" id="reviews">
          <div className="wrap">
            <div className="section-head" data-reveal>
              <div className="kicker kicker-brand">Client reviews</div>
              <h2 className="display h2">Owners like you.</h2>
            </div>
            <Reviews featured />
          </div>
        </section>

        {/* How it works */}
        <section className="section tone-ink" id="how">
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

        {/* Creative */}
        <section className="section tone-paper creative">
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
              <div className="cta-inner">
                <div className="kicker">Your area might still be open</div>
                <h2 className="display">
                  Claim your
                  <br />
                  <span>market.</span>
                </h2>
                <p>
                  We take one client per niche, per area. Start with a free audit of your site and ads, then pick
                  your package. From {startingPrice}/mo.
                </p>
                <div className="hero-ctas">
                  <Link href="/audit" className="btn btn-brand">
                    Get my free audit <span className="arrow">→</span>
                  </Link>
                  <Link href="/#lineup" className="btn btn-line">
                    See packages
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
