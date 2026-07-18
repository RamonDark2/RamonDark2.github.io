import { motion } from 'framer-motion'
import { skills } from '../../data/sobreMim'

const categories = ['Frontend', 'Backend', 'Infraestrutura & Práticas'] as const

function SkillsSection() {
  return (
    <section className="bg-white px-6 py-24 dark:bg-[#0B0B0C]">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mb-16 font-heading text-4xl font-bold text-neutral-900 dark:text-neutral-50 sm:text-5xl"
        >
          Competências Técnicas
        </motion.h2>

        {categories.map((category) => (
          <div key={category} className="mb-12 last:mb-0">
            <h3 className="mb-6 font-sans text-xs font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
              {category}
            </h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {skills
                .filter((skill) => skill.category === category)
                .map((skill, index) => {
                  const Icon = skill.icon
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="group flex flex-col items-center gap-3 rounded-xl border border-neutral-200 p-6 text-center transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-neutral-400 hover:shadow-lg hover:shadow-neutral-200/60 dark:border-neutral-800 dark:hover:border-amber-300/50 dark:hover:shadow-none"
                    >
                      <Icon className="h-7 w-7 text-neutral-900 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 dark:text-neutral-50" />
                      <span className="font-sans text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        {skill.name}
                      </span>
                    </motion.div>
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
