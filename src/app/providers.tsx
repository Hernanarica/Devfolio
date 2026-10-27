'use client'

import { createContext, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { ThemeProvider, useTheme } from 'next-themes'
import { MotionConfig } from 'motion/react'

function usePrevious<T>(value: T) {
  let ref = useRef<T | undefined>(undefined)

  useEffect(() => {
    ref.current = value
  }, [value])

  // eslint-disable-next-line react-hooks/refs
  return ref.current
}

function ThemeWatcher() {
  let { resolvedTheme, setTheme } = useTheme()
  let pathname = usePathname()

  useEffect(() => {
    let media = window.matchMedia('(prefers-color-scheme: dark)')

    function onMediaChange() {
      let systemTheme = media.matches ? 'dark' : 'light'
      if (resolvedTheme === systemTheme) {
        setTheme('system')
      }
    }

    onMediaChange()
    media.addEventListener('change', onMediaChange)

    return () => {
      media.removeEventListener('change', onMediaChange)
    }
  }, [resolvedTheme, setTheme])

  // Los meta theme-color del layout siguen el tema del sistema, no el del
  // toggle: se copian de --edge (tailwind.css) al cambiar el tema o el ancho.
  // Se lee en el próximo frame porque next-themes cambia la clase del <html>
  // en un efecto del provider, que corre después de este. Depende del
  // pathname porque Next puede volver a montar los meta al navegar
  useEffect(() => {
    let wide = window.matchMedia('(min-width: 40rem)')

    function syncThemeColor() {
      let color = getComputedStyle(document.documentElement)
        .getPropertyValue('--edge')
        .trim()
      document
        .querySelectorAll('meta[name="theme-color"]')
        .forEach((meta) => meta.setAttribute('content', color))
    }

    let frame = requestAnimationFrame(syncThemeColor)
    wide.addEventListener('change', syncThemeColor)

    return () => {
      cancelAnimationFrame(frame)
      wide.removeEventListener('change', syncThemeColor)
    }
  }, [resolvedTheme, pathname])

  return null
}

export const AppContext = createContext<{ previousPathname?: string }>({})

export function Providers({ children }: { children: React.ReactNode }) {
  let pathname = usePathname()
  let previousPathname = usePrevious(pathname)

  return (
    <AppContext.Provider value={{ previousPathname }}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        <ThemeWatcher />
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </ThemeProvider>
    </AppContext.Provider>
  )
}
