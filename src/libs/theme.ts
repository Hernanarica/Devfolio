export type Theme = 'light' | 'dark'

// El script inline de BaseLayout aplica el tema y la clase `dark` del <html>
// es la fuente de verdad: quien lo necesite la observa en vez de compartir un
// store. Sin React acá, para que el script del Header no lo cargue
export function getResolvedTheme(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

export function subscribeTheme(onChange: () => void) {
  let observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })
  return () => observer.disconnect()
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
