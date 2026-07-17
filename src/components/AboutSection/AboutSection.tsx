import { motion } from 'framer-motion'
import { about } from '../../data/sobreMim'

function AboutSection() {
  return (
    <section className="bg-neutral-50 px-6 py-24 dark:bg-neutral-950">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mb-12 font-heading text-4xl font-bold text-neutral-900 dark:text-neutral-50 sm:text-5xl"
        >
          {about.heading}
        </motion.h2>

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
      </div>
    </section>
  )
}

export default AboutSection
