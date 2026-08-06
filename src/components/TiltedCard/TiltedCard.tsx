import { forwardRef, useRef } from 'react'
import type { MouseEvent as ReactMouseEvent, MutableRefObject, ReactNode } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

const SPRING = { damping: 30, stiffness: 100, mass: 2 }

interface TiltedCardProps {
  children: ReactNode
  className?: string
  scaleOnHover?: number
  rotateAmplitude?: number
}

const TiltedCard = forwardRef<HTMLDivElement, TiltedCardProps>(function TiltedCard(
  { children, className = '', scaleOnHover = 1.03, rotateAmplitude = 23 },
  forwardedRef,
) {
  const innerRef = useRef<HTMLDivElement | null>(null)
  const prefersReducedMotion = useReducedMotion()

  const rotateX = useSpring(useMotionValue(0), SPRING)
  const rotateY = useSpring(useMotionValue(0), SPRING)
  const scale = useSpring(1, SPRING)

  function setRefs(el: HTMLDivElement | null) {
    innerRef.current = el
    if (typeof forwardedRef === 'function') forwardedRef(el)
    else if (forwardedRef) (forwardedRef as MutableRefObject<HTMLDivElement | null>).current = el
  }

  function handleMouseMove(event: ReactMouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion || !innerRef.current) return
    const rect = innerRef.current.getBoundingClientRect()
    const offsetX = event.clientX - rect.left - rect.width / 2
    const offsetY = event.clientY - rect.top - rect.height / 2
    rotateX.set((offsetY / (rect.height / 2)) * -rotateAmplitude)
    rotateY.set((offsetX / (rect.width / 2)) * rotateAmplitude)
  }

  function handleMouseEnter() {
    if (prefersReducedMotion) return
    scale.set(scaleOnHover)
  }

  function handleMouseLeave() {
    scale.set(1)
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <div
      ref={setRefs}
      style={{ perspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className={className}
        style={{ rotateX, rotateY, scale, transformStyle: 'preserve-3d', willChange: 'transform' }}
      >
        {children}
      </motion.div>
    </div>
  )
})

export default TiltedCard
