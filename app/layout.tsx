import type { Metadata, Viewport } from 'next'
import { Archivo, Inter } from 'next/font/google'
import { site } from '@/content/site'
import { MetaPixel } from '@/components/MetaPixel'
import { Reveal } from '@/components/Reveal'
import { Motion } from '@/components/Motion'
import './globals.css'

const display = Archivo({ subsets: ['latin'], axes: ['wdth'], variable: '--font-display', display: 'swap' })
const body = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Done-for-you Google & Meta Ads for Home Services`,
    template: `%s | ${site.name}`,
  },
  description:
    'Done-for-you Google and Meta ads for plumbers, HVAC, roofers, and other home service businesses. On-site shoots within 25 miles of Edmond, OK. One client per niche, per area.',
  openGraph: {
    title: `${site.name} | Done-for-you Google & Meta Ads`,
    description: 'More booked jobs. Pick your package and start with a free audit.',
    url: site.url,
    siteName: site.name,
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#ecebe7',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        {children}
        <Reveal />
        <Motion />
        <MetaPixel />
      </body>
    </html>
  )
}
