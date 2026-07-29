import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const CURSOR_SIZE = 12
const IMAGE_LINK_SCALE = 2.2
const SPRING_CONFIG = { damping: 26, stiffness: 300, mass: 0.5 }
const SCROLL_IDLE_MS = 120

// Mesmo nome do evento disparado em LiveMockup.tsx (duplicado ali com o
// mesmo comentário cruzado — mesmo padrão do GITHUB_URL local repetido em
// vários arquivos deste projeto) quando um "ao vivo" abre/fecha.
const LIVE_MOCKUP_EVENT = 'livemockup-open-change'

function Cursor() {
  const [enabled, setEnabled] = useState(false)
  // mix-blend-mode força o navegador a recompor essa camada contra tudo que
  // muda por baixo dela — medido em ~1ms a mais por frame e ~1/3 mais frames
  // perdidos durante o scroll. O mouse normalmente fica parado enquanto a
  // página rola por baixo dele, então escondê-lo só nesse instante é
  // imperceptível e evita o custo exatamente quando ele mais pesa.
  const [scrolling, setScrolling] = useState(false)
  // Enquanto um notebook/celular "ao vivo" está aberto, a bolinha some e o
  // cursor normal do sistema assume — o iframe embutido é outro documento e
  // não dispara mousemove no pai, então a bolinha ficava presa ou saltava ao
  // cruzar a borda dele, um estranhamento visual real.
  const [pausedByLightbox, setPausedByLightbox] = useState(false)

  useEffect(() => {
    function onLightboxChange(event: Event) {
      setPausedByLightbox(Boolean((event as CustomEvent<boolean>).detail))
    }
    window.addEventListener(LIVE_MOCKUP_EVENT, onLightboxChange)
    return () => window.removeEventListener(LIVE_MOCKUP_EVENT, onLightboxChange)
  }, [])

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const scale = useMotionValue(1)

  const springX = useSpring(x, SPRING_CONFIG)
  const springY = useSpring(y, SPRING_CONFIG)
  const springScale = useSpring(scale, SPRING_CONFIG)

  useEffect(() => {
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    setEnabled(canHover)
    if (!canHover) return

    function handleMouseMove(event: MouseEvent) {
      x.set(event.clientX - CURSOR_SIZE / 2)
      y.set(event.clientY - CURSOR_SIZE / 2)
    }

    function handleMouseOver(event: MouseEvent) {
      const target = (event.target as HTMLElement).closest('a, button') as HTMLElement | null

      if (!target) {
        scale.set(1)
        return
      }

      // Links de imagem (notebooks de projeto/palestra) só crescem, sem preencher a foto inteira.
      if (target.querySelector('img')) {
        scale.set(IMAGE_LINK_SCALE)
        return
      }

      // Links/botões de texto têm seu próprio preenchimento em pílula via CSS (ver
      // src/styles/cursorFill.ts) — a bolinha some para não sobrepor o efeito local, mas o
      // preenchimento nasce exatamente de onde a bolinha estava (mesmo ponto em que o mouse
      // entrou no link), para dar a sensação de uma transição contínua entre os dois.
      const rect = target.getBoundingClientRect()
      const originX = ((event.clientX - rect.left) / rect.width) * 100
      const originY = ((event.clientY - rect.top) / rect.height) * 100
      target.style.setProperty('--cursor-origin-x', `${originX}%`)
      target.style.setProperty('--cursor-origin-y', `${originY}%`)
      scale.set(0)
    }

    let scrollTimeout: ReturnType<typeof setTimeout> | undefined
    let isScrolling = false

    function handleScroll() {
      if (!isScrolling) {
        isScrolling = true
        setScrolling(true)
      }
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        isScrolling = false
        setScrolling(false)
      }, SCROLL_IDLE_MS)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [x, y, scale])

  if (!enabled || pausedByLightbox) return null

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-3 w-3 rounded-full bg-white mix-blend-difference transition-opacity duration-150"
      style={{ x: springX, y: springY, scale: springScale, opacity: scrolling ? 0 : 1 }}
    />
  )
}

export default Cursor
