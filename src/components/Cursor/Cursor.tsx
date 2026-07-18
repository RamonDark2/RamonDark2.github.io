import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const CURSOR_SIZE = 12
const IMAGE_LINK_SCALE = 2.2
const SPRING_CONFIG = { damping: 26, stiffness: 300, mass: 0.5 }

function Cursor() {
  const [enabled, setEnabled] = useState(false)
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

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [x, y, scale])

  if (!enabled) return null

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-3 w-3 rounded-full bg-white mix-blend-difference"
      style={{ x: springX, y: springY, scale: springScale }}
    />
  )
}

export default Cursor
