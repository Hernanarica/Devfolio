'use client'

import {
  motion,
  type HTMLMotionProps,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  type Variants,
} from 'motion/react'
import clsx from 'clsx'

const ease = [0.21, 0.47, 0.32, 0.98] as const

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
}

export function Reveal({
  delay = 0,
  ...props
}: HTMLMotionProps<'div'> & { delay?: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      variants={revealVariants}
      transition={{ delay }}
      {...props}
    />
  )
}

export function Stagger({
  stagger = 0.08,
  delay = 0,
  as = 'div',
  ...props
}: HTMLMotionProps<'div'> & {
  stagger?: number
  delay?: number
  as?: 'div' | 'ul'
}) {
  let Component = as === 'ul' ? motion.ul : motion.div

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
      {...(props as HTMLMotionProps<'div'> & HTMLMotionProps<'ul'>)}
    />
  )
}

export function StaggerItem({
  as = 'div',
  ...props
}: HTMLMotionProps<'div'> & { as?: 'div' | 'li' }) {
  let Component = as === 'li' ? motion.li : motion.div

  return (
    <Component
      variants={revealVariants}
      {...(props as HTMLMotionProps<'div'> & HTMLMotionProps<'li'>)}
    />
  )
}

export function ScrollProgress() {
  let { scrollYProgress } = useScroll()
  let scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-60 h-0.5 origin-left bg-linear-to-r from-teal-400 via-teal-500 to-emerald-400"
    />
  )
}

export function SpotlightCard({
  className,
  children,
  ...props
}: HTMLMotionProps<'div'>) {
  let mouseX = useMotionValue(-400)
  let mouseY = useMotionValue(-400)
  let background = useMotionTemplate`radial-gradient(320px circle at ${mouseX}px ${mouseY}px, var(--spotlight), transparent 80%)`

  return (
    <motion.div
      variants={revealVariants}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      onMouseMove={(event) => {
        let rect = event.currentTarget.getBoundingClientRect()
        mouseX.set(event.clientX - rect.left)
        mouseY.set(event.clientY - rect.top)
      }}
      onMouseLeave={() => {
        mouseX.set(-400)
        mouseY.set(-400)
      }}
      className={clsx(
        'group relative overflow-hidden rounded-3xl border border-zinc-100 bg-white p-6 [--spotlight:rgba(20,184,166,0.10)] dark:border-zinc-700/40 dark:bg-zinc-900 dark:[--spotlight:rgba(45,212,191,0.10)]',
        className,
      )}
      {...props}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
        style={{ background }}
      />
      <div className="relative">{children as React.ReactNode}</div>
    </motion.div>
  )
}
