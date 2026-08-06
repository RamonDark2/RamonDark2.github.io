import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { NAV_ITEMS, scrollToSection } from '../../data/navigation'

const LIVE_MOCKUP_EVENT = 'livemockup-open-change'
const ACTIVE_SECTION_ROOT_MARGIN = '-45% 0px -45% 0px'
const BOTTOM_THRESHOLD_PX = 140
// Hero é min-h-screen — encolhe o Dock enquanto ainda estiver dentro dessa
// primeira "tela" de rolagem, pra foto do Hero ficar em foco.
const TOP_SHRINK_VH_RATIO = 0.7

// Mesmo delay de Header.tsx (STICKY_INTRO_DELAY_S) — sem isso a animação de
// entrada do Dock roda e termina inteira escondida atrás da cortina do
// IntroReveal (z-[10000]/[10001], cobre a tela por ~2.3s), e o usuário nunca
// vê nada animar, só o Dock já pronto quando a cortina sobe.
const INTRO_DELAY_S = 2.2

interface PanelCustom {
  isFirstAppearance: boolean
  isNearTop: boolean
}

const panelVariants = {
  hidden: { opacity: 0, y: 64, scale: 0.8, filter: 'blur(10px)' },
  visible: ({ isFirstAppearance, isNearTop }: PanelCustom) => ({
    opacity: isNearTop ? 0.55 : 1,
    y: 0,
    scale: isNearTop ? 0.8 : 1,
    filter: 'blur(0px)',
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 24,
      mass: 0.8,
      delay: isFirstAppearance ? INTRO_DELAY_S : 0,
      staggerChildren: 0.045,
      delayChildren: (isFirstAppearance ? INTRO_DELAY_S : 0) + 0.06,
    },
  }),
  exit: {
    opacity: 0,
    y: 44,
    scale: 0.85,
    filter: 'blur(8px)',
    transition: { duration: 0.28, ease: [0.4, 0, 1, 1] as const },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.6 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 420, damping: 20 },
  },
}

function Dock() {
  const [hiddenForLiveView, setHiddenForLiveView] = useState(false)
  const [isNearBottom, setIsNearBottom] = useState(false)
  const [isNearTop, setIsNearTop] = useState(true)
  const [activeTarget, setActiveTarget] = useState<string | null>(null)
  const isFirstAppearanceRef = useRef(true)
  // Ao clicar, o alvo já vira "ativo" na hora (âmbar + título aparecem
  // junto com o clique) em vez de esperar o IntersectionObserver perceber
  // a seção depois que o scroll suave termina. Suprime o observer durante
  // esse scroll pra ele não sobrescrever com alguma seção que passa por
  // baixo no meio do caminho antes de chegar no alvo.
  const suppressObserverRef = useRef(false)
  const suppressTimeoutRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => () => clearTimeout(suppressTimeoutRef.current), [])

  function handleNavClick(target: string) {
    suppressObserverRef.current = true
    setActiveTarget(target)
    scrollToSection(target)
    clearTimeout(suppressTimeoutRef.current)
    suppressTimeoutRef.current = setTimeout(() => {
      suppressObserverRef.current = false
    }, 900)
  }

  useEffect(() => {
    function onLiveViewChange(event: Event) {
      setHiddenForLiveView(Boolean((event as CustomEvent<boolean>).detail))
    }
    window.addEventListener(LIVE_MOCKUP_EVENT, onLiveViewChange)
    return () => window.removeEventListener(LIVE_MOCKUP_EVENT, onLiveViewChange)
  }, [])

  useEffect(() => {
    function checkScrollPosition() {
      const scrollBottom = window.scrollY + window.innerHeight
      const pageHeight = document.documentElement.scrollHeight
      setIsNearBottom(scrollBottom >= pageHeight - BOTTOM_THRESHOLD_PX)
      setIsNearTop(window.scrollY < window.innerHeight * TOP_SHRINK_VH_RATIO)
    }
    checkScrollPosition()
    window.addEventListener('scroll', checkScrollPosition, { passive: true })
    window.addEventListener('resize', checkScrollPosition)
    return () => {
      window.removeEventListener('scroll', checkScrollPosition)
      window.removeEventListener('resize', checkScrollPosition)
    }
  }, [])

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.target)).filter(
      (el): el is HTMLElement => el !== null,
    )
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (suppressObserverRef.current) return
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length === 0) return
        const mostVisible = visible.reduce((best, entry) => (entry.intersectionRatio > best.intersectionRatio ? entry : best))
        setActiveTarget(mostVisible.target.id)
      },
      { rootMargin: ACTIVE_SECTION_ROOT_MARGIN, threshold: [0, 0.25, 0.5, 0.75, 1] },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const shouldShow = !hiddenForLiveView && !isNearBottom

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden">
      <AnimatePresence>
        {shouldShow && (
          <motion.div
            custom={{ isFirstAppearance: isFirstAppearanceRef.current, isNearTop }}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onAnimationComplete={(definition) => {
              if (definition === 'visible') isFirstAppearanceRef.current = false
            }}
            className="pointer-events-auto flex w-[92%] max-w-sm items-center justify-between gap-2 rounded-2xl border border-white/10 bg-black/40 p-2.5 shadow-lg shadow-black/40 backdrop-blur-sm"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeTarget === item.target
              return (
                <motion.button
                  key={item.target}
                  variants={itemVariants}
                  type="button"
                  onClick={() => handleNavClick(item.target)}
                  aria-label={item.label}
                  aria-current={isActive ? 'true' : undefined}
                  className={`group relative flex h-12 w-12 flex-1 items-center justify-center rounded-xl border transition-colors active:scale-95 ${
                    isActive
                      ? 'border-amber-400 text-amber-300'
                      : 'border-transparent text-neutral-300 hover:border-white/20'
                  }`}
                >
                  <item.icon className="h-6 w-6" />
                  <span
                    className={`pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-black/90 px-2 py-1 text-[11px] text-white transition-all duration-200 ${
                      isActive
                        ? 'scale-100 opacity-100'
                        : 'scale-90 opacity-0 group-focus-visible:scale-100 group-focus-visible:opacity-100 group-active:scale-100 group-active:opacity-100'
                    }`}
                  >
                    {item.label}
                  </span>
                </motion.button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Dock
