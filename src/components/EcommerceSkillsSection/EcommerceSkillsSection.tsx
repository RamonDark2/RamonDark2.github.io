import { motion } from 'framer-motion'
import { ecommerceSkills } from '../../data/sobreMim'
import SectionHeading from '../SectionHeading/SectionHeading'

function EcommerceSkillsSection() {
  return (
    <section className="bg-white px-6 py-24 dark:bg-[#0B0B0C]">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="06 · E-commerce" title="Competências em E-commerce" className="mb-16" />

        <div className="flex flex-wrap gap-3">
          {ecommerceSkills.map((skill, index) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              className="rounded-full border border-neutral-200 px-5 py-2 font-sans text-sm font-medium text-neutral-700 transition-[transform,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-neutral-900 hover:bg-neutral-50 dark:border-neutral-800 dark:text-neutral-300 dark:hover:border-amber-300/60 dark:hover:bg-neutral-900"
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
