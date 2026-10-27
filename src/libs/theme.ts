import { useSyncExternalStore } from 'react'

export type Theme = 'light' | 'dark'

// El script inline de BaseLayout aplica el tema y la clase `dark` del <html>
// es la fuente de verdad: cada isla la observa en vez de compartir un store
function subscribe(onChange: () => void) {
  let observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })
  return () => observer.disconnect()
}

// En el server y durante la hidratación devuelve undefined, para que el HTML
// coincida antes de conocer el tema real
export function useResolvedTheme() {
  return useSyncExternalStore<Theme | undefined>(
    subscribe,
    () =>
      document.documentElement.classList.contains('dark') ? 'dark' : 'light',
    () => undefined,
  )
}

export function setTheme(theme: Theme) {
  let system = matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'

  try {
    if (theme === system) {
      localStorage.removeItem('theme')
    } else {
      localStorage.setItem('theme', theme)
    }
  } catch {}

  // Sin transiciones durante el cambio, para que no se anime todo a la vez
  let style = document.createElement('style')
  style.textContent = '*,*::before,*::after{transition:none!important}'
  document.head.append(style)

  document.documentElement.classList.toggle('dark', theme === 'dark')
  document.documentElement.style.colorScheme = theme

  getComputedStyle(document.body)
  setTimeout(() => style.remove(), 1)
}
