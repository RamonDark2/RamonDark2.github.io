import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { talk } from '../../data/sobreMim'
import { CURSOR_FILL_CLASSNAME } from '../../styles/cursorFill'

function TalkSection() {
  return (
    <section className="bg-neutral-50 px-6 py-24 dark:bg-neutral-950">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="font-heading text-4xl font-bold text-neutral-900 dark:text-neutral-50 sm:text-5xl"
        >
          {talk.title}
        </motion.h2>

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
              className="w-full drop-shadow-lg transition-opacity hover:opacity-90"
            />
          </motion.a>
          {talk.photos.map((photo, index) => (
            <motion.img
              key={photo}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              src={photo}
              alt={`Foto da apresentação ${index + 1}`}
              className="h-48 w-full rounded-xl object-cover shadow-md"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TalkSection
