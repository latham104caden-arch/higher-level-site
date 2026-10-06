import Link from 'next/link'
import { site, ticker } from '@/content/site'

export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`wordmark ${className}`} role="img" aria-label={site.name}>
      {site.name}
    </span>
  )
}

export function Header() {
  return (
    <header className="header">
      <div className="wrap header-inner">
        <Link href="/" aria-label={`${site.name} home`}>
          <Wordmark />
        </Link>
        <nav className="nav" aria-label="Main">
          <Link href="/#lineup">Packages</Link>
          <Link href="/#build">Build yours</Link>
          <Link href="/results">Results</Link>
          <Link href="/#faq">FAQ</Link>
          <a href={site.clientLoginUrl}>Client login</a>
        </nav>
        <Link href="/audit" className="btn btn-brand btn-sm">
          Free audit
        </Link>
      </div>
    </header>
  )
}

export function Ticker({ items = ticker, tone = 'brand' }: { items?: string[]; tone?: 'brand' | 'ink' }) {
  const row = [...items, ...items]
  return (
    <div className={`ticker ticker-${tone}`} aria-hidden="true">
      <div className="ticker-track">
        {row.map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-big" aria-hidden="true">
          Higher Level
        </div>
        <div className="footer-grid">
          <div>
            <Wordmark />
            <p>
              Done-for-you Google & Meta ads.
              <br />
              Based in {site.homeBase}.
            </p>
          </div>
          <nav aria-label="Footer">
            <Link href="/#lineup">Packages</Link>
            <Link href="/results">Results</Link>
            <Link href="/audit">Free audit</Link>
            <a href={site.clientLoginUrl}>Client login</a>
            <Link href="/privacy">Privacy</Link>
          </nav>
          <div className="footer-fine">
            © {new Date().getFullYear()} {site.name}
            <br />
            {site.domain}
          </div>
        </div>
      </div>
    </footer>
  )
}
