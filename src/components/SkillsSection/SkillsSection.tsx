import { motion } from 'framer-motion'
import { skills } from '../../data/sobreMim'
import SectionHeading from '../SectionHeading/SectionHeading'

const categories = ['Frontend', 'Backend', 'Infraestrutura & Práticas'] as const

function SkillsSection() {
  return (
    <section id="competencias" className="border-t border-neutral-200 bg-white px-6 py-24 dark:border-neutral-800/60 dark:bg-[#0B0B0C]">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="02 · Stack" title="Competências Técnicas" className="mb-12" />

        {categories.map((category) => (
          <div
            key={category}
            className="border-t border-neutral-200 py-8 last:pb-0 dark:border-neutral-800 md:grid md:grid-cols-[240px_1fr] md:gap-8"
          >
            <motion.h3
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="mb-5 font-heading text-lg font-bold text-neutral-900 dark:text-neutral-50 md:mb-0"
            >
              {category}
            </motion.h3>

            <div className="flex flex-wrap items-start gap-3">
              {skills
                .filter((skill) => skill.category === category)
                .map((skill, index) => {
                  const Icon = skill.icon
                  return (
                    <motion.span
                      key={skill.name}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 font-sans text-sm font-medium text-neutral-700 transition-[transform,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-neutral-900 hover:bg-neutral-50 dark:border-neutral-800 dark:text-neutral-300 dark:hover:border-amber-300/60 dark:hover:bg-neutral-900"
                    >
                      <Icon className="h-4 w-4 text-neutral-900 dark:text-amber-300" />
                      {skill.name}
                    </motion.span>
                  )
                })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default SkillsSection
