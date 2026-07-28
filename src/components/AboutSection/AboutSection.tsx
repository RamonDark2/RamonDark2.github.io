import { motion } from 'framer-motion'
import { about, experience, projects, skills } from '../../data/sobreMim'
import SectionHeading from '../SectionHeading/SectionHeading'

// Números reais derivados dos dados existentes (não hardcoded soltos) — se a
// experiência, os projetos ou o stack mudarem, esses destaques acompanham.
const stats = [
  { value: experience[0]?.period ?? '', label: 'de experiência profissional' },
  { value: String(projects.length), label: 'projetos entregues' },
  { value: String(skills.length), label: 'tecnologias no stack' },
]

function AboutSection() {
  return (
    <section id="sobre" className="border-t border-neutral-200 bg-neutral-100 px-6 py-24 dark:border-neutral-800/60 dark:bg-[#141416]">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="01 · Sobre mim" title={about.heading} />

        <div className="max-w-3xl space-y-6">
          {about.paragraphs.map((paragraph, index) => (
            <motion.p
              key={paragraph}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="font-sans text-neutral-700 dark:text-neutral-300"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 grid max-w-3xl grid-cols-3 gap-6 border-t border-neutral-200 pt-8 dark:border-neutral-800"
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-heading text-3xl font-bold text-neutral-900 dark:text-neutral-50 sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 font-sans text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection
