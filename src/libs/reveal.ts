import { animate, inView, stagger } from 'motion'

// Mismo efecto que los variants de src/components/Motion.tsx
const keyframes = { opacity: [0, 1], y: [24, 0] }
const options = { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as const }
const viewport = { margin: '0px 0px -80px 0px' } as const

export function revealOnScroll() {
  inView(
    '[data-reveal]',
    (element) => {
      animate(element, keyframes, {
        ...options,
        delay: Number((element as HTMLElement).dataset.reveal),
      })
    },
    viewport,
  )

  inView(
    '[data-stagger]',
    (element) => {
      let { stagger: interval, delay } = (element as HTMLElement).dataset
      // Los items de un Stagger anidado los anima su propio Stagger
      let items = [...element.querySelectorAll('[data-stagger-item]')].filter(
        (item) => item.closest('[data-stagger]') === element,
      )

      animate(items, keyframes, {
        ...options,
        delay: stagger(Number(interval), { startDelay: Number(delay) }),
      })
    },
    viewport,
  )
}
