'use client'

import dynamic from 'next/dynamic'
import { useCallback, useState } from 'react'

const HouseScene = dynamic(() => import('./HouseScene'), { ssr: false })

/** Floating 3D house you can drag to spin 360°, with a static fallback. */
export function HouseStage() {
  const [ready, setReady] = useState(false)
  const onReady = useCallback(() => setReady(true), [])

  return (
    <div className={`house-stage${ready ? ' is-ready' : ''}`}>
      <div className="house-band" aria-hidden="true" />
      <svg className="house-fallback" viewBox="0 0 200 150" aria-hidden="true">
        <ellipse cx="100" cy="138" rx="70" ry="7" fill="rgba(40,20,20,0.18)" />
        <rect x="45" y="62" width="70" height="52" fill="#f3f0ea" />
        <polygon points="36,64 80,30 124,64" fill="#6b1317" />
        <rect x="112" y="80" width="44" height="34" fill="#f3f0ea" />
        <polygon points="108,82 134,62 160,82" fill="#6b1317" />
        <rect x="72" y="86" width="14" height="28" fill="#7a1418" />
        <rect x="52" y="74" width="14" height="14" fill="#26303b" />
        <rect x="94" y="74" width="14" height="14" fill="#26303b" />
        <rect x="118" y="92" width="32" height="22" fill="#dcd7cf" />
      </svg>
      <HouseScene onReady={onReady} />
      <div className="house-hint" aria-hidden="true">
        <span>Drag</span>
        <span>to spin</span>
        <strong>360°</strong>
      </div>
      <span className="chip chip-a">Meta Ads</span>
      <span className="chip chip-b">Google Ads</span>
      <span className="chip chip-c">Shot on site</span>
    </div>
  )
}
