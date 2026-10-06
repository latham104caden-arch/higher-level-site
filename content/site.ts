// All site copy and settings in one place. Edit here, not in the components.

export const site = {
  name: 'Higher Level',
  tagline: 'Done-for-you Google & Meta ads for home service businesses',
  domain: 'higherleveladz.com',
  url: 'https://www.higherleveladz.com',
  // Home base and in-person shoot radius.
  homeBase: 'Edmond, Oklahoma',
  localArea: 'within 25 miles of Edmond, OK',
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || '',
  clientLoginUrl:
    process.env.NEXT_PUBLIC_CLIENT_LOGIN_URL || 'https://higher-level-dashboard.vercel.app',
}

export const ticker = [
  'Meta Ads',
  'Google Ads',
  'On-site shoots',
  'Static ads',
  'AI content',
  'One client per area',
  'Live results dashboard',
  'Built in Edmond, OK',
]

export const niches = [
  'Plumbing',
  'HVAC',
  'Roofing',
  'Electrical',
  'Landscaping',
  'Cleaning',
  'Remodeling',
  'Fencing',
]

// The product lineup. `price` is shown as-is; leave it empty to show
// "Priced on your call" until real pricing is set.
export type Package = {
  id: string
  code: string
  name: string
  sub: string
  badge?: string
  pitch: string
  includes: string[]
  price: string
}

export const packages: Package[] = [
  {
    id: 'meta',
    code: 'HL/01',
    name: 'Meta Ads',
    sub: 'Facebook + Instagram',
    pitch: 'Put your work in front of homeowners in your service area, scrolling right now.',
    includes: [
      'Campaign strategy and setup',
      'Ad creative made for you',
      'Targeting by your service area',
      'Lead forms and pixel tracking',
      'Weekly optimization',
      'Live results dashboard',
    ],
    price: '',
  },
  {
    id: 'full',
    code: 'HL/03',
    name: 'Full Coverage',
    sub: 'Meta + Google',
    badge: 'Most complete',
    pitch: 'Both platforms, one team, one dashboard. Catch them scrolling and searching.',
    includes: [
      'Everything in Meta Ads',
      'Everything in Google Ads',
      'One strategy across both',
      'Creative made for each platform',
      'Weekly optimization',
      'Live results dashboard',
    ],
    price: '',
  },
  {
    id: 'google',
    code: 'HL/02',
    name: 'Google Ads',
    sub: 'Search campaigns',
    pitch: 'Show up the moment someone nearby searches for what you do.',
    includes: [
      'Keyword research for your services',
      'Search campaign setup',
      'Call and form tracking',
      'Wasted-spend cleanup',
      'Weekly optimization',
      'Live results dashboard',
    ],
    price: '',
  },
]

// Creative options, picked like a paint color on a car configurator.
export const creativeOptions = [
  {
    id: 'shoot',
    name: 'On-site shoot',
    note: 'Within 25 mi of Edmond, OK',
    body: 'We come out and film your crew, your trucks, and your finished jobs.',
    swatch: 'var(--brand)',
  },
  {
    id: 'statics',
    name: 'Static ads',
    note: 'From what you have',
    body: 'We design scroll-stopping image ads from your photos.',
    swatch: 'var(--ink)',
  },
  {
    id: 'ai',
    name: 'AI content',
    note: 'No footage needed',
    body: 'Polished AI video and imagery built around your services.',
    swatch: '#8a8580',
  },
  {
    id: 'remote',
    name: 'Remote shooter',
    note: 'Outside our area',
    body: 'We line up a videographer in your state to capture real footage.',
    swatch: '#c9c4bc',
  },
]

// Facts only. No invented results here.
export const facts = [
  { n: '25', unit: 'mi', body: 'In-person shoot radius around Edmond, Oklahoma.' },
  { n: '2', unit: '', body: 'Platforms we run: Google, and Meta (Facebook + Instagram).' },
  { n: '1', unit: '', body: 'Client per niche, per area. Your market stays yours.', highlight: true },
]

export const steps = [
  { title: 'Free audit', body: 'We review your site, tracking, and any ads you run now.' },
  { title: 'Demo call', body: 'We walk through what we found and confirm your area is open.' },
  { title: 'Launch', body: 'We make the creative, build the campaigns, and go live.' },
  { title: 'Scale', body: 'Weekly optimization, with every lead in your live dashboard.' },
]

export const auditChecks = [
  { title: 'Tracking', body: 'Is your Meta pixel, Google tag, and call tracking actually firing?' },
  { title: 'Landing page', body: 'Can a visitor call or book in one tap, or are leads leaking?' },
  { title: 'Speed & mobile', body: 'Most of your leads are on a phone. We check how your site holds up.' },
  { title: 'Local trust', body: 'Reviews, service area, and the signals that make people pick you.' },
  { title: 'Current ads', body: 'If you’re already running ads, where the money is going and what it’s returning.' },
]

export const faqs = [
  {
    q: 'What does “done for you” actually mean?',
    a: 'We handle the whole thing: strategy, creative, campaign setup, tracking, and weekly optimization. You answer the phone and do the jobs.',
  },
  {
    q: 'Will you work with my competitor?',
    a: 'No. We take one client per niche, per area. While you’re with us, nobody else in your market is.',
  },
  {
    q: 'I’m not near Edmond, OK. Can you still make my ads?',
    a: 'Yes. We work with businesses anywhere. We can design static ads from your photos, create AI content, or line up a videographer in your state.',
  },
  {
    q: 'Do you do SEO, websites, or social posting?',
    a: 'No. We run Google and Meta ads and make the creative that goes in them. That focus is why we’re good at it.',
  },
  {
    q: 'Is the audit really free?',
    a: 'Yes. You get a real look at your tracking, landing page, and ads whether or not we end up working together.',
  },
]

// Real, client-approved results only. Example:
// { tag: 'HVAC · 60 days', number: '$87 → $19', metric: 'Cost per lead', note: '...' }
export const results: { tag: string; number: string; metric: string; note: string }[] = []

// Real testimonials only. Example:
// { quote: '...', name: 'Jane D.', business: 'Acme Roofing', niche: 'Roofing' }
export const testimonials: { quote: string; name: string; business: string; niche: string }[] = []
