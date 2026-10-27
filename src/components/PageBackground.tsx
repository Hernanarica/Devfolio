'use client'

import { useTheme } from 'next-themes'

// Safari 26 ignora theme-color y tiñe sus barras con esta capa fija, pero
// solo la vuelve a leer cuando el elemento aparece: el key la remonta al
// cambiar de tema para que las barras no queden con el color anterior
export function PageBackground() {
  let { resolvedTheme } = useTheme()

  return (
    <div
      key={resolvedTheme}
      className="fixed inset-0 flex justify-center sm:px-8"
    >
      <div className="flex w-full max-w-7xl lg:px-8">
        <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
      </div>
    </div>
  )
}
