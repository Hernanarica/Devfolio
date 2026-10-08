import { type Metadata } from 'next'

import { SimpleLayout } from '@/components/SimpleLayout'
import { StackShowcase } from '@/components/StackShowcase'
import { pageMetadata } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Stack',
  description:
    'Las tecnologías con las que construyo productos, datos y automatizaciones con IA, y cómo elijo cada una.',
  path: '/stack',
})

export default function Stack() {
  return (
    <SimpleLayout
      title="Mi caja de herramientas."
      intro="Del frontend a la base de datos, de los datos a la automatización. Este es el stack con el que construyo todos los días y, más importante, el criterio con el que elijo cada pieza."
    >
      <StackShowcase />
    </SimpleLayout>
  )
}
