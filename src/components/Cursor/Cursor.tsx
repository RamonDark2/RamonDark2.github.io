import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const CURSOR_SIZE = 12
const HOVER_SCALE = 2.2

function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const springX = useSpring(mouseX, { damping: 25, stiffness: 300, mass: 0.5 })
  const springY = useSpring(mouseY, { damping: 25, stiffness: 300, mass: 0.5 })

  useEffect(() => {
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    setEnabled(canHover)
    if (!canHover) return

    function handleMouseMove(event: MouseEvent) {
      mouseX.set(event.clientX - CURSOR_SIZE / 2)
      mouseY.set(event.clientY - CURSOR_SIZE / 2)
    }

    function handleMouseOver(event: MouseEvent) {
      const target = event.target as HTMLElement
      setHovering(Boolean(target.closest('a, button')))
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [mouseX, mouseY])

  if (!enabled) return null

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full bg-white mix-blend-difference"
      style={{
        width: CURSOR_SIZE,
        height: CURSOR_SIZE,
        x: springX,
        y: springY,
        scale: hovering ? HOVER_SCALE : 1,
      }}
      transition={{ scale: { duration: 0.2 } }}
    />
  )
}

export default Cursor
