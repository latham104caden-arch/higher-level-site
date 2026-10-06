// All site copy and settings in one place. Edit here, not in the components.

export const site = {
  name: 'Higher Level',
  tagline: 'A small team in Edmond, OK running Google & Meta ads for home service businesses',
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
    pitch: 'Facebook and Instagram ads that put your work in front of homeowners near you while they’re scrolling.',
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
    pitch: 'Both platforms, run by the same people. You catch them scrolling and you catch them searching.',
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
    pitch: 'When someone nearby searches for what you do, you’re the one they call.',
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
    body: 'We come out and film your crew, your trucks, and your finished work.',
    swatch: 'var(--brand)',
  },
  {
    id: 'statics',
    name: 'Static ads',
    note: 'From what you have',
    body: 'Send us what’s on your phone. We turn it into ads that get noticed.',
    swatch: 'var(--ink)',
  },
  {
    id: 'ai',
    name: 'AI content',
    note: 'No footage needed',
    body: 'No footage? No problem. We build clean AI video and images around your services.',
    swatch: '#8a8580',
  },
  {
    id: 'remote',
    name: 'Remote shooter',
    note: 'Outside our area',
    body: 'We line up a videographer in your state so your ads still show the real you.',
    swatch: '#c9c4bc',
  },
]

// "Burned before?" section: how we work.
export const promises = [
  { title: 'You see everything', body: 'Every dollar and every lead, live on your own dashboard. No mystery reports.' },
  { title: 'You talk to the people doing the work', body: 'Caden and Hunter, not an account manager reading off a script.' },
  { title: 'We tell you straight', body: 'If something’s not working, you hear it from us first, with the fix.' },
  { title: 'Your market stays yours', body: 'One client per niche, per area. We never work for your competition.' },
]

export const steps = [
  { title: 'Free audit', body: 'Send us your site. We’ll dig through it and your current ads and tell you where you’re losing leads.' },
  { title: 'Quick call', body: 'We walk you through what we found. No pitch deck, no pressure. Just real numbers.' },
  { title: 'Launch', body: 'We make the ads, build the campaigns, and get you live. You keep running your business.' },
  { title: 'Grow', body: 'We tune things every week, and you watch the leads come in on your dashboard.' },
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
    q: 'I’ve been burned by an agency before. Why are you different?',
    a: 'Most of our clients have been, so we get it. We’re a small team, so you talk to the people actually running your ads. You see every dollar and every lead on your dashboard, and if something isn’t working, you’ll hear it from us first, along with the fix.',
  },
  {
    q: 'What does “done for you” actually mean?',
    a: 'It means we handle it. Strategy, the ads themselves, setup, tracking, and weekly tweaks. You answer the phone and do the jobs.',
  },
  {
    q: 'Will you work with my competitor?',
    a: 'No. We take one client per niche, per area. Helping your competitor beat you would make no sense, so we don’t.',
  },
  {
    q: 'I’m not near Edmond, OK. Can you still make my ads?',
    a: 'Yes. We work with businesses anywhere. We can design static ads from your photos, create AI content, or line up a videographer in your state.',
  },
  {
    q: 'Do you do SEO, websites, or social posting?',
    a: 'No. We do Google and Meta ads and the creative for them, and that’s it. Doing one thing really well beats doing ten things okay.',
  },
  {
    q: 'How much does it cost?',
    a: 'Packages start at $745 a month. After your free audit, we’ll give you a straight quote on the call. No surprise fees later.',
  },
  {
    q: 'Is the audit really free?',
    a: 'Yes, really. You get an honest look at your site and ads whether or not you ever work with us.',
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
