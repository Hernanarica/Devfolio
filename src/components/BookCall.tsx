'use client'

import { useEffect, useState } from 'react'
import Cal, { getCalApi } from '@calcom/embed-react'
import { useTheme } from 'next-themes'
import { CalendarDays } from 'lucide-react'

import { site } from '@/lib/site'

const namespace = 'llamada-inicial'

export function BookCall() {
  let { resolvedTheme } = useTheme()
  let [mounted, setMounted] = useState(false)
  let theme: 'dark' | 'light' = resolvedTheme === 'dark' ? 'dark' : 'light'

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) {
      return
    }

    getCalApi({ namespace }).then((cal) => {
      cal('ui', {
        theme,
        hideEventTypeDetails: false,
        layout: 'month_view',
        cssVarsPerTheme: {
          light: { 'cal-brand': '#14b8a6' },
          dark: { 'cal-brand': '#2dd4bf' },
        },
      })
    })
  }, [mounted, theme])

  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-100 bg-white dark:border-zinc-700/40 dark:bg-zinc-900">
      {mounted ? (
        <Cal
          key={theme}
          namespace={namespace}
          calLink={site.links.calLink}
          style={{ width: '100%', height: '100%', overflow: 'scroll' }}
          config={{ layout: 'month_view', theme }}
        />
      ) : (
        <div className="flex h-[480px] items-center justify-center text-sm text-zinc-400">
          <CalendarDays className="mr-2 h-5 w-5 animate-pulse" />
          Cargando calendario…
        </div>
      )}
    </div>
  )
}
