'use client'

import { useState } from 'react'
import Link from 'next/link'
import { packages, creativeOptions } from '@/content/site'

/** "Build your package": pick a platform package and a creative option, like a car configurator. */
export function Configurator() {
  const [pkg, setPkg] = useState('full')
  const [creative, setCreative] = useState('shoot')
  const p = packages.find((x) => x.id === pkg)!
  const c = creativeOptions.find((x) => x.id === creative)!

  return (
    <div className="config">
      <div className="config-col">
        <div className="config-label">01 · Platform</div>
        <div className="config-pkgs" role="radiogroup" aria-label="Platform">
          {packages.map((x) => (
            <button
              key={x.id}
              type="button"
              role="radio"
              aria-checked={pkg === x.id}
              className={`config-pkg${pkg === x.id ? ' is-on' : ''}`}
              onClick={() => setPkg(x.id)}
            >
              <span className="config-code">{x.code}</span>
              <strong>{x.name}</strong>
              <span>{x.sub}</span>
            </button>
          ))}
        </div>

        <div className="config-label">02 · Creative</div>
        <div className="config-swatches" role="radiogroup" aria-label="Creative">
          {creativeOptions.map((x) => (
            <button
              key={x.id}
              type="button"
              role="radio"
              aria-checked={creative === x.id}
              aria-label={x.name}
              className={`swatch${creative === x.id ? ' is-on' : ''}`}
              style={{ background: x.swatch }}
              onClick={() => setCreative(x.id)}
            />
          ))}
        </div>
        <div className="config-creative">
          <strong>{c.name}</strong>
          <span className="config-note">{c.note}</span>
          <p>{c.body}</p>
        </div>
      </div>

      <div className="config-summary">
        <div className="config-label">Your build</div>
        <div className="config-build">
          <span className="config-code">{p.code}</span>
          <h3>{p.name}</h3>
          <span className="config-plus">+ {c.name}</span>
        </div>
        <ul className="config-list">
          {p.includes.map((i) => (
            <li key={i}>{i}</li>
          ))}
          <li>
            {c.name} ({c.note})
          </li>
        </ul>
        <div className="config-price">
          <span>Price</span>
          <strong>{p.price || 'Quoted on your call'}</strong>
        </div>
        <Link href={`/audit?package=${p.id}&creative=${c.id}`} className="btn btn-brand btn-block">
          Get this package
        </Link>
        <p className="config-fine">Starts with a free audit. No commitment until you’ve seen it.</p>
      </div>
    </div>
  )
}
