import { motion } from 'framer-motion'
import { about } from '../../data/sobreMim'
import SectionHeading from '../SectionHeading/SectionHeading'

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
      </div>
    </section>
  )
}

export default AboutSection
