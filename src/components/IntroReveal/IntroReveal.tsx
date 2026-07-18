import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const DISPLAY_MS = 1100
const EXIT_DURATION_S = 0.6

const baseUrl = import.meta.env.BASE_URL
const wavingPhotoSrc = `${baseUrl}img/Ola.png`

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
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center gap-6 bg-white dark:bg-[#0B0B0C]"
        >
          <motion.img
            src={wavingPhotoSrc}
            alt="Ramon Rodrigues acenando"
            initial={{ opacity: 0, y: 16, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="h-32 w-32 rounded-full object-cover object-top shadow-xl sm:h-40 sm:w-40"
          />
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
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
