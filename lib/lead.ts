export const businessTypes = [
  { value: 'home-services', label: 'Home services (plumbing, HVAC, roofing, etc.)' },
  { value: 'health', label: 'Dental, med spa, or clinic' },
  { value: 'legal', label: 'Law firm' },
  { value: 'other-service', label: 'Other local service' },
  { value: 'ecommerce', label: 'Online store (ecommerce)' },
] as const

export const adSpendRanges = [
  'Not running ads yet',
  'Under $1,000 / mo',
  '$1,000 – $3,000 / mo',
  '$3,000 – $10,000 / mo',
  '$10,000+ / mo',
] as const

export type Lead = {
  name: string
  business: string
  website: string
  email: string
  phone: string
  type: string
  area: string
  spend: string
}

const limits: Record<keyof Lead, number> = {
  name: 120,
  business: 160,
  website: 300,
  email: 200,
  phone: 40,
  type: 40,
  area: 200,
  spend: 60,
}

export function parseLead(input: unknown): { lead?: Lead; error?: string } {
  if (!input || typeof input !== 'object') return { error: 'Invalid request.' }
  const raw = input as Record<string, unknown>
  const lead = {} as Lead
  for (const key of Object.keys(limits) as (keyof Lead)[]) {
    const v = raw[key]
    lead[key] = typeof v === 'string' ? v.trim().slice(0, limits[key]) : ''
  }
  if (!lead.name) return { error: 'Please add your name.' }
  if (!lead.business) return { error: 'Please add your business name.' }
  if (!lead.website) return { error: 'Please add your website.' }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) return { error: 'Please add a valid email.' }
  if (lead.phone.replace(/\D/g, '').length < 10) return { error: 'Please add a valid phone number.' }
  if (!businessTypes.some((t) => t.value === lead.type)) return { error: 'Please pick your business type.' }
  if (lead.spend && !(adSpendRanges as readonly string[]).includes(lead.spend)) lead.spend = ''
  return { lead }
}

export function normalizeUrl(u: string): string {
  return /^https?:\/\//i.test(u) ? u : `https://${u}`
}
