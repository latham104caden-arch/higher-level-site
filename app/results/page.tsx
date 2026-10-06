import type { Metadata } from 'next'
import Link from 'next/link'
import { Header, Footer } from '@/components/Chrome'
import { Stats } from '@/components/Stats'
import { Reviews } from '@/components/Reviews'
import { results, testimonials } from '@/content/site'

export const metadata: Metadata = {
  title: 'Results & Reviews',
  description: 'Real numbers and real reviews from home service owners who run their Google and Meta ads with Higher Level.',
}

export default function ResultsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="page-hero">
          <div className="wrap">
            <div className="kicker kicker-brand">Real clients · Real numbers</div>
            <h1 className="display">Results.</h1>
            <p className="lede">What home service owners say about running their ads with Higher Level.</p>
          </div>
        </section>

        <Stats />

        <section className="section tone-paper" id="reviews">
          <div className="wrap">
            <div className="section-head" data-reveal>
              <div className="kicker kicker-brand">{testimonials.length} client reviews</div>
              <h2 className="display h2">In their words.</h2>
            </div>
            <Reviews />
          </div>
        </section>

        <section className="section">
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
                  Want to see campaigns from your industry now? We’ll walk you through them on your call.
                </p>
                <Link href="/audit" className="btn btn-brand">
                  Get my free audit <span className="arrow">→</span>
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
