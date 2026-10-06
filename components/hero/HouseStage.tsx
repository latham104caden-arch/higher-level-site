'use client'

import dynamic from 'next/dynamic'
import { useCallback, useState } from 'react'

const HouseScene = dynamic(() => import('./HouseScene'), { ssr: false })

// Illustrative notifications of the kind our clients get. Generic on purpose:
// no customer names, prices, or results.
const notes = [
  { icon: 'check', title: 'New job booked', body: 'Roof inspection · Thu 9:00 AM' },
  { icon: 'bolt', title: 'New lead', body: 'AC repair · Edmond, OK' },
  { icon: 'phone', title: 'Incoming call', body: 'From your Google ad' },
  { icon: 'cal', title: 'Estimate requested', body: 'Kitchen remodel · This week' },
]

function Icon({ name }: { name: string }) {
  const common = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2.2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  if (name === 'check') return <svg {...common}><path d="M20 6 9 17l-5-5" /></svg>
  if (name === 'bolt') return <svg {...common}><path d="M13 2 4 14h7l-1 8 9-12h-7z" /></svg>
  if (name === 'phone')
    return (
      <svg {...common}>
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
      </svg>
    )
  return (
    <svg {...common}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  )
}

/** Floating 3D house you can drag to spin 360°, with notifications popping off it. */
export function HouseStage() {
  const [ready, setReady] = useState(false)
  const onReady = useCallback(() => setReady(true), [])

  return (
    <div className={`house-stage${ready ? ' is-ready' : ''}`}>
      <div className="house-glow" aria-hidden="true" />
      <svg className="house-fallback" viewBox="0 0 200 150" aria-hidden="true">
        <ellipse cx="100" cy="138" rx="70" ry="7" fill="rgba(40,20,20,0.18)" />
        <rect x="45" y="62" width="70" height="52" fill="#f3f0ea" />
        <polygon points="36,64 80,30 124,64" fill="#2a2c2f" />
        <rect x="112" y="80" width="44" height="34" fill="#f3f0ea" />
        <polygon points="108,82 134,62 160,82" fill="#2a2c2f" />
        <rect x="72" y="86" width="14" height="28" fill="#7a1418" />
        <rect x="52" y="74" width="14" height="14" fill="#1e252c" />
        <rect x="94" y="74" width="14" height="14" fill="#1e252c" />
        <rect x="118" y="92" width="32" height="22" fill="#9a6a43" />
      </svg>
      <HouseScene onReady={onReady} />

      <div className="notes" aria-hidden="true">
        {notes.map((n, i) => (
          <div key={n.title} className={`note note-${i + 1}`}>
            <span className={`note-icon note-icon-${n.icon}`}>
              <Icon name={n.icon} />
            </span>
            <span className="note-text">
              <strong>{n.title}</strong>
              <span>{n.body}</span>
            </span>
          </div>
        ))}
      </div>

      <div className="house-hint" aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M21 12a9 9 0 1 1-3-6.7" />
          <path d="M21 3v6h-6" />
        </svg>
        Drag to rotate 360°
      </div>
    </div>
  )
}
