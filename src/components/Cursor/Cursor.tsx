import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const CURSOR_SIZE = 12
const IMAGE_LINK_SCALE = 2.2
const FILL_PADDING_X = 14
const FILL_PADDING_Y = 8
const SPRING_CONFIG = { damping: 26, stiffness: 300, mass: 0.5 }

function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const filling = useRef(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const width = useMotionValue(CURSOR_SIZE)
  const height = useMotionValue(CURSOR_SIZE)
  const scale = useMotionValue(1)

  const springX = useSpring(x, SPRING_CONFIG)
  const springY = useSpring(y, SPRING_CONFIG)
  const springWidth = useSpring(width, SPRING_CONFIG)
  const springHeight = useSpring(height, SPRING_CONFIG)
  const springScale = useSpring(scale, SPRING_CONFIG)

  useEffect(() => {
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    setEnabled(canHover)
    if (!canHover) return

    function handleMouseMove(event: MouseEvent) {
      if (filling.current) return
      x.set(event.clientX - CURSOR_SIZE / 2)
      y.set(event.clientY - CURSOR_SIZE / 2)
    }

    function resetCursor() {
      filling.current = false
      scale.set(1)
      width.set(CURSOR_SIZE)
      height.set(CURSOR_SIZE)
    }

    function handleMouseOver(event: MouseEvent) {
      const target = (event.target as HTMLElement).closest('a, button') as HTMLElement | null

      if (!target) {
        resetCursor()
        return
      }

      // Links de imagem (notebooks de projeto/palestra) só crescem, sem preencher a foto inteira.
      if (target.querySelector('img')) {
        filling.current = false
        scale.set(IMAGE_LINK_SCALE)
        width.set(CURSOR_SIZE)
        height.set(CURSOR_SIZE)
        return
      }

      const rect = target.getBoundingClientRect()
      filling.current = true
      scale.set(1)
      x.set(rect.left - FILL_PADDING_X)
      y.set(rect.top - FILL_PADDING_Y)
      width.set(rect.width + FILL_PADDING_X * 2)
      height.set(rect.height + FILL_PADDING_Y * 2)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [x, y, width, height, scale])

  if (!enabled) return null

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full bg-white mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        width: springWidth,
        height: springHeight,
        scale: springScale,
      }}
    />
  )
}

export default Cursor
