import { motion } from 'framer-motion'
import { ecommerceSkills } from '../../data/sobreMim'

function EcommerceSkillsSection() {
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
          Competências em E-commerce
        </motion.h2>

        <div className="flex flex-wrap gap-3">
          {ecommerceSkills.map((skill, index) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              className="rounded-full border border-neutral-200 px-5 py-2 font-sans text-sm font-medium text-neutral-700 transition-transform hover:-translate-y-0.5 dark:border-neutral-800 dark:text-neutral-300"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EcommerceSkillsSection
