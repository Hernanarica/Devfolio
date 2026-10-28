import { useSyncExternalStore } from 'react'

import { getResolvedTheme, subscribeTheme, type Theme } from '@/libs/theme'

// En el server y durante la hidratación devuelve undefined, para que el HTML
// coincida antes de conocer el tema real
export function useResolvedTheme() {
  return useSyncExternalStore<Theme | undefined>(
    subscribeTheme,
    getResolvedTheme,
    () => undefined,
  )
}
