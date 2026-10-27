// Versión estática de Reveal/Stagger de Motion.tsx para páginas sin
// hidratar: solo marcan el HTML y src/libs/reveal.ts los anima. Las islas
// (Services, StackShowcase) siguen usando las de Motion.tsx

export function Reveal({
  delay = 0,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & { delay?: number }) {
  return <div data-reveal={delay} {...props} />
}

export function Stagger({
  stagger = 0.08,
  delay = 0,
  as: Component = 'div',
  ...props
}: React.ComponentPropsWithoutRef<'div'> & {
  stagger?: number
  delay?: number
  as?: 'div' | 'ul'
}) {
  return (
    <Component
      data-stagger={stagger}
      data-delay={delay}
      {...(props as React.ComponentPropsWithoutRef<'ul'>)}
    />
  )
}

export function StaggerItem({
  as: Component = 'div',
  ...props
}: React.ComponentPropsWithoutRef<'div'> & { as?: 'div' | 'li' }) {
  return (
    <Component
      data-stagger-item=""
      {...(props as React.ComponentPropsWithoutRef<'li'>)}
    />
  )
}
