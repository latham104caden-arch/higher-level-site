import type { Metadata, Viewport } from 'next'
import { site } from '@/content/site'
import { MetaPixel } from '@/components/MetaPixel'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Paid Ads for Local Service Businesses`,
    template: `%s | ${site.name}`,
  },
  description:
    'Meta, Google, and TikTok ads for plumbers, HVAC, roofers, dentists, med spas, and other local pros. One client per niche, per area. Get a free audit.',
  openGraph: {
    title: `${site.name} | Paid Ads for Local Service Businesses`,
    description: 'More booked jobs, not more clicks. One client per niche, per area. Get a free audit.',
    url: site.url,
    siteName: site.name,
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <MetaPixel />
      </body>
    </html>
  )
}
