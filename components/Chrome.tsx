import Link from 'next/link'
import { site } from '@/content/site'

export function Header() {
  return (
    <header className="header">
      <div className="wrap header-inner">
        <Link href="/" className="logo" aria-label={`${site.name} home`}>
          <img src="/logo.png" alt={site.name} width={1143} height={372} />
        </Link>
        <nav className="nav" aria-label="Main">
          <Link href="/#how">How it works</Link>
          <Link href="/#creative">Creative</Link>
          <Link href="/#faq">FAQ</Link>
          <a href={site.clientLoginUrl}>Client login</a>
        </nav>
        <Link href="/audit" className="btn btn-primary">
          Free audit
        </Link>
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <div>
          © {new Date().getFullYear()} {site.name} · Based in {site.homeBase} · {site.domain}
        </div>
        <nav aria-label="Footer">
          <Link href="/audit">Free audit</Link>
          <a href={site.clientLoginUrl}>Client login</a>
          <Link href="/privacy">Privacy</Link>
        </nav>
      </div>
    </footer>
  )
}
