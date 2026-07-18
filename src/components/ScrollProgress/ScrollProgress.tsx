import { motion, useScroll, useSpring } from 'framer-motion'

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { damping: 30, stiffness: 200, mass: 0.4 })

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[9998] h-0.5 w-full origin-left bg-neutral-900 dark:bg-amber-300"
    />
  )
}

export default ScrollProgress
