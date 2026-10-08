import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'

import { site } from '@/lib/site'

export const alt = site.title
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpengraphImage() {
  let portrait = await readFile(join(process.cwd(), 'src/images/portrait.jpg'))
  let portraitSrc = `data:image/jpeg;base64,${portrait.toString('base64')}`

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '72px 88px',
        background:
          'radial-gradient(circle at 85% 50%, rgba(20,184,166,0.25), transparent 55%), #18181b',
        color: '#fafafa',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', width: 680 }}>
        <div
          style={{
            display: 'flex',
            fontSize: 26,
            color: '#2dd4bf',
            letterSpacing: 2,
            textTransform: 'uppercase',
          }}
        >
          Buenos Aires · Abierto a proyectos
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 24,
            fontSize: 80,
            fontWeight: 700,
            letterSpacing: -2,
            lineHeight: 1,
          }}
        >
          {site.name}
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 24,
            fontSize: 38,
            color: '#e4e4e7',
            lineHeight: 1.25,
          }}
        >
          Full Stack Developer, CTO & Cofounder de Spotter
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 28,
            fontSize: 26,
            color: '#a1a1aa',
            lineHeight: 1.4,
          }}
        >
          Productos web de punta a punta, datos y automatización con IA.
        </div>
      </div>
      <img
        src={portraitSrc}
        alt=""
        width={340}
        height={340}
        style={{
          borderRadius: 9999,
          border: '8px solid #2dd4bf',
          objectFit: 'cover',
        }}
      />
    </div>,
    size,
  )
}
