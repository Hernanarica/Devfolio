'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { ReactLenis, useLenis } from 'lenis/react'
import { useReducedMotion } from 'motion/react'

import 'lenis/dist/lenis.css'

// Al cambiar de página Lenis conserva su posición interna: se vuelve
// arriba sin animación, salvo que la URL apunte a un ancla
function ScrollToTopOnNavigate() {
  let pathname = usePathname()
  let lenis = useLenis()

  useEffect(() => {
    if (!window.location.hash) {
      lenis?.scrollTo(0, { immediate: true })
    }
  }, [pathname, lenis])

  return null
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  let reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return children
  }

  return (
    <ReactLenis root options={{ lerp: 0.1, anchors: true }}>
      <ScrollToTopOnNavigate />
      {children}
    </ReactLenis>
  )
}
