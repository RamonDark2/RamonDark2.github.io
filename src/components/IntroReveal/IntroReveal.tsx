import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const DISPLAY_MS = 1600
const EXIT_EASE = [0.76, 0, 0.24, 1] as const
const REVEAL_EASE = [0.33, 1, 0.68, 1] as const

const baseUrl = import.meta.env.BASE_URL
const wavingPhotoSrc = `${baseUrl}img/Ola.png`

const GREETING_WORDS = ['Olá,', 'bem-vindo!']

// Borda inferior curvada que aparece enquanto o painel sobe — fica escondida
// abaixo da viewport (top-full) até a cortina começar a se mover.
function CurvedEdge() {
  return (
    <div
      className="absolute left-0 top-full h-24 w-[100vw] bg-inherit"
      style={{ borderBottomLeftRadius: '50% 100%', borderBottomRightRadius: '50% 100%' }}
    />
  )
}

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
      {visible && [
        // Cortina de trás (cor invertida do tema): sai depois da principal,
        // criando o efeito de dupla camada na revelação do site.
        <motion.div
          key="intro-accent"
          exit={{ y: '-115%' }}
          transition={{ duration: 0.7, ease: EXIT_EASE, delay: 0.15 }}
          className="fixed inset-0 z-[10000] bg-neutral-900 dark:bg-white"
        >
          <CurvedEdge />
        </motion.div>,

        // Cortina principal com o conteúdo da saudação.
        <motion.div
          key="intro-main"
          exit={{ y: '-115%' }}
          transition={{ duration: 0.7, ease: EXIT_EASE }}
          className="fixed inset-0 z-[10001] bg-white dark:bg-[#0B0B0C]"
        >
          <motion.div
            exit={{ opacity: 0, y: -48 }}
            transition={{ duration: 0.4, ease: 'easeIn' }}
            className="flex h-full flex-col items-center justify-center gap-6 px-6"
          >
            <div className="relative">
              <motion.span
                initial={{ scale: 0.9, opacity: 0.6 }}
                animate={{ scale: 1.35, opacity: 0 }}
                transition={{ duration: 1.4, ease: 'easeOut', delay: 0.45, repeat: Infinity, repeatDelay: 0.4 }}
                className="absolute inset-0 rounded-full border-2 border-neutral-300 dark:border-neutral-700"
              />
              <motion.img
                src={wavingPhotoSrc}
                alt="Jalbert Ramon acenando"
                initial={{ opacity: 0, scale: 0.55 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', damping: 14, stiffness: 180, delay: 0.1 }}
                className="h-32 w-32 rounded-full object-cover object-top shadow-xl sm:h-40 sm:w-40"
              />
            </div>

            <h1 className="flex gap-[0.35em] font-heading text-4xl font-bold text-neutral-900 dark:text-neutral-50 sm:text-6xl">
              {GREETING_WORDS.map((word, index) => (
                <span key={word} className="inline-block overflow-hidden py-1">
                  <motion.span
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.65, ease: REVEAL_EASE, delay: 0.35 + index * 0.14 }}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            <span className="inline-block overflow-hidden">
              <motion.span
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: REVEAL_EASE, delay: 0.7 }}
                className="inline-block font-sans text-sm uppercase tracking-[0.35em] text-neutral-500 dark:text-neutral-400"
              >
                Jalbert Ramon
              </motion.span>
            </span>

            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, ease: 'easeInOut', delay: 0.45 }}
              className="mt-2 h-px w-40 origin-left bg-neutral-300 dark:bg-neutral-700"
            />
          </motion.div>
          <CurvedEdge />
        </motion.div>,
      ]}
    </AnimatePresence>
  )
}

export default IntroReveal
