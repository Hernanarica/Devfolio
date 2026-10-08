import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'

import { site, siteUrl } from '@/lib/site'

export const alt = site.title
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Replica el hero del home en modo oscuro. ImageResponse no soporta WOFF2,
// por eso Inter va en TTF dentro de assets/fonts
function asset(path: string) {
  return readFile(join(process.cwd(), path))
}

export default async function OpengraphImage() {
  let [avatar, interRegular, interBold] = await Promise.all([
    asset('src/images/avatar.jpg'),
    asset('assets/fonts/inter-400.ttf'),
    asset('assets/fonts/inter-700.ttf'),
  ])
  let avatarSrc = `data:image/jpeg;base64,${avatar.toString('base64')}`
  let domain = siteUrl.replace(/^https?:\/\/(www\.)?/, '')

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        background: '#000000',
        padding: '0 64px',
        fontFamily: 'Inter',
      }}
    >
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          background:
            'radial-gradient(circle at 100% 0%, rgba(20,184,166,0.22), transparent 50%), #18181b',
          borderLeft: '1px solid rgba(212,212,216,0.15)',
          borderRight: '1px solid rgba(212,212,216,0.15)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <img
            src={avatarSrc}
            alt=""
            width={88}
            height={88}
            style={{
              borderRadius: 9999,
              border: '3px solid rgba(255,255,255,0.12)',
              objectFit: 'cover',
            }}
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '10px 22px 10px 18px',
              borderRadius: 9999,
              border: '1px solid rgba(20,184,166,0.35)',
              background: 'rgba(20,184,166,0.08)',
              color: '#5eead4',
              fontSize: 24,
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 9999,
                background: '#14b8a6',
                boxShadow: '0 0 0 6px rgba(20,184,166,0.25)',
              }}
            />
            Disponible para proyectos freelance
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.12,
            letterSpacing: -2,
            color: '#f4f4f5',
          }}
        >
          <div style={{ display: 'flex' }}>Full Stack Developer,</div>
          <div style={{ display: 'flex' }}>
            CTO & Cofounder de
            <span
              style={{
                marginLeft: 18,
                backgroundImage: 'linear-gradient(90deg, #14b8a6, #34d399)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Spotter
            </span>
            .
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 26,
            color: '#a1a1aa',
          }}
        >
          <div style={{ display: 'flex' }}>
            <span style={{ color: '#f4f4f5', fontWeight: 700 }}>
              {site.name}
            </span>
            <span style={{ marginLeft: 12 }}>· Buenos Aires</span>
          </div>
          <div style={{ display: 'flex' }}>{domain}</div>
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: 'Inter', data: interRegular, style: 'normal', weight: 400 },
        { name: 'Inter', data: interBold, style: 'normal', weight: 700 },
      ],
    },
  )
}
