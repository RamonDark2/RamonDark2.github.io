import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { talk } from '../../data/sobreMim'
import { CURSOR_FILL_CLASSNAME } from '../../styles/cursorFill'
import SectionHeading from '../SectionHeading/SectionHeading'

function TalkSection() {
  return (
    <section className="border-t border-neutral-200 bg-neutral-100 px-6 py-24 dark:border-neutral-800/60 dark:bg-[#141416]">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="07 · Palestra" title={talk.title} className="mb-0" />

        <p className="mt-6 max-w-3xl font-sans text-neutral-700 dark:text-neutral-300">
          {talk.description}
        </p>

        <a
          href={talk.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-6 inline-flex items-center gap-2 font-sans text-sm font-semibold text-neutral-900 dark:text-amber-300 ${CURSOR_FILL_CLASSNAME}`}
        >
          {talk.linkLabel}
          <ExternalLink className="h-4 w-4" />
        </a>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <motion.a
            href={talk.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="md:col-span-3"
          >
            <img
              src={talk.mockupImage}
              alt={talk.title}
              loading="lazy"
              decoding="async"
              className="w-full drop-shadow-lg transition-opacity hover:opacity-90"
            />
          </motion.a>
          {talk.photos.map((photo, index) => (
            <motion.div
              key={photo}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="overflow-hidden rounded-xl shadow-md"
            >
              <img
                src={photo}
                alt={`Foto da apresentação ${index + 1}`}
                loading="lazy"
                decoding="async"
                className="h-48 w-full object-cover transition-transform duration-500 ease-out hover:scale-105"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TalkSection
