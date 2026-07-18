import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const DISPLAY_MS = 900
const EXIT_DURATION_S = 0.6

function IntroReveal() {
  const [visible, setVisible] = useState(
    () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    if (!visible) return

    document.body.style.overflow = 'hidden'
    const timer = setTimeout(() => setVisible(false), DISPLAY_MS)
    return () => clearTimeout(timer)
  }, [visible])

  useEffect(() => {
    if (!visible) {
      document.body.style.overflow = ''
    }
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: EXIT_DURATION_S, ease: 'easeInOut' }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-white dark:bg-[#0B0B0C]"
        >
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="font-heading text-4xl font-bold text-neutral-900 dark:text-neutral-50 sm:text-5xl"
          >
            RAMON RODRIGUES
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default IntroReveal
