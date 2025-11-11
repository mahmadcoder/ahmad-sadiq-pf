'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { PropsWithChildren } from 'react'
import { fadeIn } from '@/lib/motion'

export function ClientTransition({ children }: PropsWithChildren) {
  const pathname = usePathname()
  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} variants={fadeIn} initial="hidden" animate="show" exit="hidden">
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
