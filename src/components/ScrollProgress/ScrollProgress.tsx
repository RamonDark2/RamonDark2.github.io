import { motion, useScroll } from 'framer-motion'

function ScrollProgress() {
  // Sem useSpring de propósito: o spring continua agendando frames depois que o
  // scroll para, e o acoplamento 1:1 direto já é suave o bastante para uma barra.
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed left-0 top-0 z-[9998] h-0.5 w-full origin-left bg-amber-500 will-change-transform dark:bg-amber-400"
    />
  )
}

export default ScrollProgress
