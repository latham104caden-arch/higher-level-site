'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Adds `.is-in` to every [data-reveal] element as it scrolls into view.
 * Content is fully visible without JS; the `js` class on <html> (set inline
 * in the root layout) is what opts into the fade.
 */
export function Reveal() {
  const pathname = usePathname()
  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      document.documentElement.classList.remove('js')
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          const el = e.target as HTMLElement
          const d = Number(el.dataset.revealDelay || 0)
          if (d) el.style.transitionDelay = `${d}ms`
          el.classList.add('is-in')
          io.unobserve(el)
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.06 },
    )
    document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [pathname])
  return null
}
