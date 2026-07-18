import { motion } from 'framer-motion'
import { ecommerceExperience } from '../../data/sobreMim'

function EcommerceExperienceSection() {
  return (
    <section className="bg-neutral-50 px-6 py-24 dark:bg-neutral-950">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-16 font-heading text-4xl font-bold text-neutral-900 dark:text-neutral-50 sm:text-5xl">
          Experiência Profissional Complementar
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="grid gap-10 rounded-2xl border-l-4 border-neutral-900 bg-white p-8 shadow-sm dark:border-amber-300 dark:bg-neutral-900 md:grid-cols-2 md:items-center"
        >
          <div>
            <h3 className="font-heading text-2xl font-bold text-neutral-900 dark:text-neutral-50">
              {ecommerceExperience.title}
            </h3>
            <p className="mt-1 font-sans font-semibold text-neutral-700 dark:text-amber-300">
              {ecommerceExperience.role}
            </p>
            <p className="mt-6 font-sans text-neutral-700 dark:text-neutral-300">
              {ecommerceExperience.summary}
            </p>
            <ul className="mt-6 space-y-3">
              {ecommerceExperience.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-3 font-sans text-sm text-neutral-700 dark:text-neutral-300"
                >
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neutral-900 dark:bg-amber-300" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <img
              src={ecommerceExperience.image}
              alt={ecommerceExperience.imageCaption}
              className="w-full drop-shadow-lg"
            />
            <p className="mt-3 text-center font-sans text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
              {ecommerceExperience.imageCaption}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default EcommerceExperienceSection
