import { motion } from 'framer-motion'
import { experience } from '../../data/sobreMim'
import SectionHeading from '../SectionHeading/SectionHeading'

function ExperienceSection() {
  return (
    <section id="experiencia" className="border-t border-neutral-200 bg-neutral-100 px-6 py-24 dark:border-neutral-800/60 dark:bg-[#141416]">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="03 · Trajetória" title="Experiência Profissional" className="mb-16" />

        {experience.map((item) => (
          <motion.div
            key={item.company}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mb-8 rounded-2xl border-l-4 border-amber-500 bg-white p-8 shadow-sm transition-shadow duration-300 last:mb-0 hover:shadow-lg hover:shadow-neutral-200/70 dark:border-amber-300 dark:bg-neutral-900 dark:hover:shadow-black/40"
          >
            <h3 className="font-heading text-2xl font-bold text-neutral-900 dark:text-neutral-50">
              {item.company}
            </h3>
            <p className="mt-1 font-sans font-semibold text-neutral-700 dark:text-amber-300">
              {item.role}
            </p>
            <p className="mt-1 font-sans text-sm text-neutral-500 dark:text-neutral-400">
              {item.location} · {item.period}
            </p>
            <p className="mt-6 font-sans text-neutral-700 dark:text-neutral-300">{item.summary}</p>
            <ul className="mt-6 space-y-3">
              {item.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-3 font-sans text-sm text-neutral-700 dark:text-neutral-300"
                >
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-600 dark:bg-amber-300" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default ExperienceSection
