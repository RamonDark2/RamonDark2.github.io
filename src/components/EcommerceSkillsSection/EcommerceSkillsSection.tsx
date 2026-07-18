import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { ecommerceSkills } from '../../data/sobreMim'
import SectionHeading from '../SectionHeading/SectionHeading'

function EcommerceSkillsSection() {
  return (
    <section className="bg-white px-6 py-24 dark:bg-[#0B0B0C]">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="06 · E-commerce" title="Competências em E-commerce" className="mb-12" />

        <div className="grid gap-x-12 gap-y-4 sm:grid-cols-2">
          {ecommerceSkills.map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              className="flex items-start gap-3 border-b border-neutral-100 pb-4 dark:border-neutral-900"
            >
              <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-neutral-900 dark:bg-amber-300">
                <Check className="h-3 w-3 text-white dark:text-neutral-900" />
              </span>
              <span className="font-sans text-sm text-neutral-700 dark:text-neutral-300">{skill}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EcommerceSkillsSection
