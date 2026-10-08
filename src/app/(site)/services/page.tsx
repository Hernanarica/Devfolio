import { type Metadata } from 'next'

import { Services } from '@/components/Services'
import { SimpleLayout } from '@/components/SimpleLayout'
import { pageMetadata } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Servicios',
  description:
    'Desarrollo freelance de plataformas a medida, sitios web, migraciones, datos y automatización con IA. Pedí tu cotización sin costo.',
  path: '/services',
})

export default function ServicesPage() {
  return (
    <SimpleLayout
      title="Construyamos tu próximo producto."
      intro="Trabajo como freelance con startups, empresas y emprendedores que necesitan un desarrollador que entienda el negocio: desde la idea hasta producción, con criterio técnico y costos bajo control."
    >
      <Services />
    </SimpleLayout>
  )
}
