import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const DISPLAY_MS = 1300
const EXIT_DURATION_S = 0.7

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
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: EXIT_DURATION_S, ease: [0.76, 0, 0.24, 1] }}
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
            Olá, bem-vindo!
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
            className="font-sans text-sm uppercase tracking-widest text-neutral-500 dark:text-neutral-400"
          >
            Ramon Rodrigues
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default IntroReveal
