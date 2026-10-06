// All site copy and settings in one place. Edit here, not in the components.

export const site = {
  name: 'Higher Level',
  tagline: 'Paid ads for local service businesses',
  domain: 'higherleveladz.com',
  url: 'https://www.higherleveladz.com',
  // Where "local" is for in-person shoots. Leave empty until confirmed;
  // the copy falls back to "near us".
  localArea: '',
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || '',
  clientLoginUrl:
    process.env.NEXT_PUBLIC_CLIENT_LOGIN_URL || 'https://higher-level-dashboard.vercel.app',
}

export const platforms = ['Meta', 'Google', 'TikTok']

export const niches = [
  'Plumbers',
  'HVAC',
  'Roofers',
  'Electricians',
  'Dentists',
  'Med Spas',
  'Law Firms',
  'Landscapers',
  'Cleaning',
]

export const steps = [
  {
    title: 'Free audit',
    body: 'Send us your website. We check your tracking, your landing page, how you show up locally, and any ads you are running now.',
  },
  {
    title: 'Demo call',
    body: 'We walk you through what we found, talk numbers, and confirm your niche and area are still open.',
  },
  {
    title: 'Launch',
    body: 'We build the creative, set up targeting and tracking, and get campaigns live on the platforms that fit your market.',
  },
  {
    title: 'Scale',
    body: 'Weekly optimization, and a live client dashboard so you always see spend, leads, and cost per lead.',
  },
]

export const creative = {
  local: {
    title: 'Local to us? We shoot it all.',
    body: 'We come to you and film everything: your crew, your trucks, your work, your happy customers. You don’t lift a finger.',
  },
  remote: {
    title: 'Not local? You’re still covered.',
    options: [
      { title: 'Use what you have', body: 'Send us your photos and clips. We cut them into ads that perform.' },
      { title: 'AI content', body: 'Polished AI video and imagery built around your services and your market.' },
      { title: 'Static ads', body: 'Scroll-stopping image ads designed and tested for you.' },
      { title: 'A shooter in your state', body: 'We send a videographer near you to capture real footage.' },
    ],
  },
}

export const auditChecks = [
  { title: 'Tracking', body: 'Is your Meta pixel, Google tag, and call tracking actually firing?' },
  { title: 'Landing page', body: 'Can a visitor call or book in one tap, or are leads leaking?' },
  { title: 'Speed & mobile', body: 'Most of your leads are on a phone. We check how your site holds up.' },
  { title: 'Local trust', body: 'Reviews, service area, and the signals that make people pick you.' },
  { title: 'Current ads', body: 'If you’re already running ads, where the money is going and what it’s returning.' },
]

export const fitTraits = [
  { title: 'Growth-minded', body: 'Actively trying to grow, not just hold position.' },
  { title: 'Communicative', body: 'A real partner. Responds, gives feedback, shows up.' },
  { title: 'Ready', body: 'Has the budget, capacity, and crew to take on more work.' },
]

export const faqs = [
  {
    q: 'Do you do SEO, websites, or social media management?',
    a: 'No. We run paid ads on Meta, Google, and TikTok, and the creative that goes in them. That focus is why we’re good at it.',
  },
  {
    q: 'Will you work with my competitor?',
    a: 'No. We take one client per niche, per area. While you’re with us, nobody else in your market is.',
  },
  {
    q: 'I’m not local to you. Can you still make my ads?',
    a: 'Yes. We can use footage you already have, create AI content or static ads, or send a videographer in your state.',
  },
  {
    q: 'Is the audit really free?',
    a: 'Yes. You get a real look at your tracking, landing page, and ads whether or not we end up working together.',
  },
  {
    q: 'What should I have ready for the demo call?',
    a: 'Roughly: your monthly revenue, current ad spend, your top one or two services, and your service area.',
  },
]

// Real, client-approved results only. The Results section stays hidden while
// this list is empty. Example shape:
// { tag: 'HVAC · 60 days', number: '$87 → $19', metric: 'Cost per lead', note: '...' }
export const results: { tag: string; number: string; metric: string; note: string }[] = []

export const ecommerceComingSoon = true
