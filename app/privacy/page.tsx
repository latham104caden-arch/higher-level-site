import type { Metadata } from 'next'
import { Header, Footer } from '@/components/Chrome'
import { site } from '@/content/site'

export const metadata: Metadata = { title: 'Privacy Policy' }

// Draft. Replace with reviewed text before relying on it.
export default function Privacy() {
  return (
    <>
      <Header />
      <main className="wrap narrow prose">
        <h1 className="display">Privacy Policy</h1>
        <p>
          This explains what {site.name} collects on {site.domain} and how we use it.
        </p>
        <h2>What we collect</h2>
        <p>
          When you request a free audit, we collect what you enter in the form: your name, business name,
          website, email, phone number, business type, service area, and ad spend range.
        </p>
        <h2>How we use it</h2>
        <p>
          We use it to prepare your audit and to contact you about it, including setting up a call. We don’t
          sell your information.
        </p>
        <h2>Advertising and analytics</h2>
        <p>
          This site may use the Meta pixel to measure our own ads and show ads to people who visited the site.
          You can control ad personalization in your Meta and browser settings.
        </p>
        <h2>Contact</h2>
        <p>Questions or deletion requests: reply to any email from us, or reach us through {site.domain}.</p>
      </main>
      <Footer />
    </>
  )
}
