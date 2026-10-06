import type { Metadata } from 'next'
import Link from 'next/link'
import { Header, Footer } from '@/components/Chrome'
import { Stats } from '@/components/Stats'
import { results, testimonials } from '@/content/site'

export const metadata: Metadata = {
  title: 'Results & Testimonials',
  description: 'Real campaigns, real numbers, and what home service owners say about working with Higher Level.',
}

export default function ResultsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="page-hero">
          <div className="wrap">
            <div className="kicker kicker-brand">Real campaigns · Real numbers</div>
            <h1 className="display">Results.</h1>
            <p className="lede">Numbers from real Higher Level campaigns, and what our clients say about them.</p>
          </div>
        </section>

        <Stats />

        <section className="section tone-paper">
          <div className="wrap">
            <div className="section-head" data-reveal>
              <div className="kicker kicker-brand">Case studies</div>
              <h2 className="display h2">The numbers.</h2>
            </div>
            {results.length > 0 ? (
              <div className="cards-3 grid-lines">
                {results.map((r, i) => (
                  <div key={r.tag + r.metric} className="result-card" data-reveal data-reveal-delay={i * 100}>
                    <div className="result-tag">{r.tag}</div>
                    <div className="result-num">{r.number}</div>
                    <h3>{r.metric}</h3>
                    <p>{r.note}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty" data-reveal>
                <h3 className="display">Case studies dropping soon.</h3>
                <p className="lede">
                  We’re putting the numbers together. Want to see campaigns from your industry now? We’ll walk
                  you through them on your call.
                </p>
                <Link href="/audit" className="btn btn-brand">
                  Get my free audit <span className="arrow">→</span>
                </Link>
              </div>
            )}
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="section-head" data-reveal>
              <div className="kicker kicker-brand">Testimonials</div>
              <h2 className="display h2">In their words.</h2>
            </div>
            {testimonials.length > 0 ? (
              <div className="cards-3 grid-lines">
                {testimonials.map((t, i) => (
                  <figure key={t.name + t.business} className="quote" data-reveal data-reveal-delay={i * 100}>
                    <blockquote>{t.quote}</blockquote>
                    <footer>
                      <strong>{t.name}</strong>
                      {t.business} · {t.niche}
                    </footer>
                  </figure>
                ))}
              </div>
            ) : (
              <div className="empty" data-reveal>
                <h3 className="display">Reviews on the way.</h3>
                <p className="lede">We only post real reviews from real clients. They’re coming.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
