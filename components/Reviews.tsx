import Link from 'next/link'
import { testimonials, type Testimonial } from '@/content/site'

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function Review({ t, i }: { t: Testimonial; i: number }) {
  return (
    <figure className={`review${t.quote.length > 220 ? ' is-long' : ''}`} data-reveal data-reveal-delay={(i % 3) * 90}>
      <blockquote>{t.quote}</blockquote>
      <figcaption>
        <span className="review-avatar" aria-hidden="true">
          {initials(t.name)}
        </span>
        <span className="review-who">
          <strong>{t.name}</strong>
          <span>{t.niche}</span>
        </span>
        {t.platform && <span className="review-tag">{t.platform}</span>}
      </figcaption>
    </figure>
  )
}

/** Client reviews. `featured` shows the homepage selection with a link to all of them. */
export function Reviews({ featured = false }: { featured?: boolean }) {
  const list = featured ? testimonials.filter((t) => t.featured) : testimonials
  return (
    <>
      <div className={`reviews${featured ? ' reviews-featured' : ''}`}>
        {list.map((t, i) => (
          <Review key={t.name + t.niche} t={t} i={i} />
        ))}
      </div>
      {featured && (
        <div className="reviews-more">
          <Link href="/results" className="btn btn-line">
            Read all {testimonials.length} reviews <span className="arrow">→</span>
          </Link>
        </div>
      )}
    </>
  )
}
