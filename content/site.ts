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
  '4× average ROAS',
  '33 clients',
  '9 niches',
  '8 states',
  'Google & Meta ads',
  'One client per area',
  'On-site shoots',
  'Built in Edmond, OK',
]

// Owner-provided figures (2026-10). Update here when they change.
export const stats = [
  { n: '4', unit: '×', label: 'Average ROAS', note: 'Across our client campaigns' },
  { n: '33', unit: '', label: 'Clients', note: 'Home service businesses' },
  { n: '9', unit: '', label: 'Niches', note: 'One client per niche, per area' },
  { n: '8', unit: '', label: 'States', note: 'Based in Edmond, Oklahoma' },
]

export const startingPrice = '$745'

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
    q: 'How much does it cost?',
    a: 'Packages start at $745 a month. After your free audit, we’ll quote your exact package on the demo call.',
  },
  {
    q: 'Is the audit really free?',
    a: 'Yes. You get a real look at your tracking, landing page, and ads whether or not we end up working together.',
  },
]

// Real, client-approved results only. Example:
// { tag: 'HVAC · 60 days', number: '$87 → $19', metric: 'Cost per lead', note: '...' }
export const results: { tag: string; number: string; metric: string; note: string }[] = []

// Client reviews, provided by the owner (2026-10). Quotes are verbatim.
// `featured` ones also show on the homepage.
export type Testimonial = {
  quote: string
  name: string
  niche: string
  platform?: 'Meta Ads' | 'Google Ads'
  featured?: boolean
}

export const testimonials: Testimonial[] = [
  {
    name: 'Logan Layer',
    niche: 'Roofing',
    platform: 'Meta Ads',
    featured: true,
    quote:
      'Their Meta ads campaign got my roofing business in front of actual customers ready to book. The targeting is incredible, leads convert fast, and Caden was super responsive when we needed to adjust targeting mid-season. Honestly the best ROI I’ve seen from any marketing spend.',
  },
  {
    name: 'Mike Torres',
    niche: 'Window Cleaning',
    platform: 'Meta Ads',
    featured: true,
    quote:
      'Higher Level set up my Meta Ads and I went from 5 calls a week to 20+. They know exactly how to target homeowners in my area. Best marketing decision.',
  },
  {
    name: 'Randle Bros',
    niche: 'Window Cleaning',
    featured: true,
    quote:
      'I stopped using my other guy to get with higher level and ive been loving it. im at a 4x ROAS i know my money is going to see a return and im able to grow my team.',
  },
  {
    name: 'Son Nguyen',
    niche: 'Landscaping',
    platform: 'Meta Ads',
    featured: true,
    quote:
      'Higher Level manages my Meta ads for my landscaping company and it’s been a game changer. My cost per lead dropped significantly and my booking rate went way up. im able to stay out of things a lot more not and free up time to actually grow.',
  },
  {
    name: 'Griffin Berry',
    niche: 'Christmas Lights',
    platform: 'Google Ads',
    featured: true,
    quote:
      'Higher Level handles my Google Ads for holiday lighting and the seasonal campaigns are perfectly timed. It’s challenging to market Christmas light installation year-round but they’ve figured out how to run campaigns during off-season that actually generate leads for next year’s bookings. Getting jobs booked months in advance now.',
  },
  {
    name: 'Larry Conant',
    niche: 'Landscaping',
    platform: 'Meta Ads',
    featured: true,
    quote:
      'I’ve been with Higher Level for 6 months. Their Meta ads keep my landscaping schedule full year-round. Great guys they understand the market and really care about what goes into it. Worth every penny.',
  },
  {
    name: 'Tom Redding',
    niche: 'Roofing',
    quote:
      'I’ve been with too many marketers to count and they all sucked until one of my buddies mentioned working with the guys over at higher level and its been up hill since. ive had jobs booked out for months and never was mad about ad spend.',
  },
  {
    name: 'Robert Patterson',
    niche: 'Pressure Washing',
    quote:
      'My pressure washing business was struggling with visibility before I found Higher Level. The previous agency was just burning through budget without results. Hunter and Caden are a game changer and i love working with them.',
  },
  {
    name: 'Ethan Griffith',
    niche: 'Landscaping',
    platform: 'Meta Ads',
    quote:
      'The Meta ads from Higher Level are my main driver now. Im now able to get in front of the homeowners i want to.',
  },
  {
    name: 'Duke Thornton',
    niche: 'Detailing',
    platform: 'Meta Ads',
    quote: 'Started with Higher Level’s Meta ads. Consistent bookings. Quality leads. Affordable.',
  },
  { name: 'Jose', niche: 'Window Cleaning', platform: 'Google Ads', quote: 'Google Ad are great with the team here!' },
  { name: 'James Henderson', niche: 'Pressure Washing', platform: 'Meta Ads', quote: 'Real shit. Meta Ads through Higher Level.' },
]
