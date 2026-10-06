'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Small motion layer:
 * - [data-parallax="0.15"]: drifts against the scroll by that factor.
 * - [data-tilt]: tilts toward the pointer in 3D (fine pointers only).
 * Both switch off for prefers-reduced-motion.
 */
export function Motion() {
  const pathname = usePathname()
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const layers = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'))
    let raf = 0
    const update = () => {
      raf = 0
      const vh = window.innerHeight
      for (const el of layers) {
        const r = el.parentElement?.getBoundingClientRect()
        if (!r || r.bottom < -200 || r.top > vh + 200) continue
        const f = Number(el.dataset.parallax || 0)
        const center = r.top + r.height / 2 - vh / 2
        el.style.transform = `translate3d(0, ${(-center * f).toFixed(1)}px, 0)`
      }
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    const fine = window.matchMedia('(pointer: fine)').matches
    const tilts = fine ? Array.from(document.querySelectorAll<HTMLElement>('[data-tilt]')) : []
    const onMove = (e: PointerEvent) => {
      const el = e.currentTarget as HTMLElement
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width - 0.5
      const y = (e.clientY - r.top) / r.height - 0.5
      el.style.setProperty('--rx', `${(-y * 6).toFixed(2)}deg`)
      el.style.setProperty('--ry', `${(x * 8).toFixed(2)}deg`)
      el.style.setProperty('--mx', `${((x + 0.5) * 100).toFixed(1)}%`)
      el.style.setProperty('--my', `${((y + 0.5) * 100).toFixed(1)}%`)
    }
    const onLeave = (e: PointerEvent) => {
      const el = e.currentTarget as HTMLElement
      el.style.setProperty('--rx', '0deg')
      el.style.setProperty('--ry', '0deg')
    }
    for (const el of tilts) {
      el.addEventListener('pointermove', onMove)
      el.addEventListener('pointerleave', onLeave)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      for (const el of tilts) {
        el.removeEventListener('pointermove', onMove)
        el.removeEventListener('pointerleave', onLeave)
      }
    }
  }, [pathname])
  return null
}
