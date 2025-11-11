// Shared motion tokens and variants
import { Variants, Transition } from 'framer-motion'

export const transition: Transition = {
  type: 'spring',
  stiffness: 260,
  damping: 22,
  mass: 0.9,
}

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition,
  },
}

export const containerStagger: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition },
}

export const hoverLift = {
  whileHover: { y: -3, scale: 1.02 },
  whileTap: { scale: 0.98 },
}
