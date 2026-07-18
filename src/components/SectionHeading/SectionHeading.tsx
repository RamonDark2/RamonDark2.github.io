import { motion } from 'framer-motion'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  /** Para seções de fundo sempre escuro (ex.: Contato), independente do tema. */
  light?: boolean
  center?: boolean
  className?: string
}

function SectionHeading({ eyebrow, title, light, center, className = 'mb-12' }: SectionHeadingProps) {
  return (
    <div className={`${center ? 'flex flex-col items-center text-center' : ''} ${className}`}>
      <motion.p
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`mb-4 flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-[0.25em] ${
          light ? 'text-neutral-400' : 'text-neutral-500 dark:text-amber-300'
        }`}
      >
        <span className="h-px w-8 bg-current" />
        {eyebrow}
      </motion.p>
      {/* whileInView fica no h2 (o elemento que corta), não no span cortado:
          um span 110% para baixo tem interseção 0 com a viewport e nunca dispararia. */}
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        className="overflow-hidden"
      >
        <motion.span
          variants={{
            hidden: { y: '110%' },
            visible: { y: 0, transition: { duration: 0.65, ease: [0.33, 1, 0.68, 1] } },
          }}
          className={`block font-heading text-4xl font-bold sm:text-5xl ${
            light ? 'text-white' : 'text-neutral-900 dark:text-neutral-50'
          }`}
        >
          {title}
        </motion.span>
      </motion.h2>
    </div>
  )
}

export default SectionHeading
