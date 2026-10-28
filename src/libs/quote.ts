import { site } from '@/lib/site'

interface Quote {
  name: string
  service: string
  budget: string
  details: string
}

// Mensaje del cotizador de /services: el mismo texto va por WhatsApp y por
// mail. Nombre y detalle son opcionales y no dejan líneas vacías si faltan
export function buildQuoteLinks({ name, service, budget, details }: Quote) {
  let message = [
    `¡Hola Hernán! ${name ? `Soy ${name}. ` : ''}Quiero pedir una cotización.`,
    '',
    `• Servicio: ${service}`,
    `• Presupuesto aproximado: ${budget}`,
    ...(details ? [`• Detalle: ${details}`] : []),
  ].join('\n')

  return {
    message,
    whatsappHref: `${site.links.whatsapp}?text=${encodeURIComponent(message)}`,
    mailHref: `mailto:${site.email}?subject=${encodeURIComponent(
      `Cotización: ${service}`,
    )}&body=${encodeURIComponent(message)}`,
  }
}
