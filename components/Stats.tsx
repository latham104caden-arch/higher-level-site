import { stats } from '@/content/site'

/** "By the numbers" band with the owner-provided figures. */
export function Stats() {
  return (
    <section className="stats" aria-label="Higher Level by the numbers">
      <div className="wrap">
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div key={s.label} className={`stat${i === 0 ? ' is-hl' : ''}`} data-reveal data-reveal-delay={i * 90}>
              <div className="stat-n">
                {s.n}
                {s.unit && <span>{s.unit}</span>}
              </div>
              <div className="stat-label">{s.label}</div>
              <p>{s.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
