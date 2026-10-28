import { describe, expect, test } from 'vite-plus/test'

import { buildQuoteLinks } from '@/libs/quote'

const base = {
  name: '',
  service: 'Sitio web',
  budget: 'USD 1.000 - 3.000',
  details: '',
}

describe('buildQuoteLinks', () => {
  test('sin nombre ni detalle no deja líneas de más', () => {
    let { message } = buildQuoteLinks(base)

    expect(message).toBe(
      [
        '¡Hola Hernán! Quiero pedir una cotización.',
        '',
        '• Servicio: Sitio web',
        '• Presupuesto aproximado: USD 1.000 - 3.000',
      ].join('\n'),
    )
  })

  test('incluye nombre y detalle cuando están', () => {
    let { message } = buildQuoteLinks({
      ...base,
      name: 'Ana',
      details: 'Landing con blog',
    })

    expect(message).toContain('¡Hola Hernán! Soy Ana. Quiero')
    expect(message.split('\n').at(-1)).toBe('• Detalle: Landing con blog')
  })

  test('los links llevan el mensaje codificado y vuelve igual al decodificarlo', () => {
    let { message, whatsappHref, mailHref } = buildQuoteLinks({
      ...base,
      details: 'Precio & plazo? 50% / 50%',
    })

    let whatsapp = new URL(whatsappHref)
    expect(whatsapp.origin).toBe('https://wa.me')
    expect(whatsapp.searchParams.get('text')).toBe(message)

    expect(mailHref.startsWith('mailto:hernan.arica96@gmail.com?')).toBe(true)
    let mail = new URLSearchParams(mailHref.split('?')[1])
    expect(mail.get('subject')).toBe('Cotización: Sitio web')
    expect(mail.get('body')).toBe(message)
  })
})
