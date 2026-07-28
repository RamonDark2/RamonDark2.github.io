import { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import { Check } from 'lucide-react'
import { ecommerceExperience, experience } from '../../data/sobreMim'
import SectionHeading from '../SectionHeading/SectionHeading'

const prodater = experience[0]

// Marcador da timeline: anel âmbar que "pinga" ao entrar na viewport.
function TimelineDot() {
  return (
    <motion.span
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, amount: 1 }}
      transition={{ type: 'spring', damping: 12, stiffness: 260 }}
      className="absolute left-0 top-9 flex h-6 w-6 items-center justify-center rounded-full border-2 border-amber-500 bg-white dark:border-amber-300 dark:bg-neutral-900"
    >
      <span className="h-2 w-2 rounded-full bg-amber-500 dark:bg-amber-300" />
    </motion.span>
  )
}

function ExperienceSection() {
  const timelineRef = useRef<HTMLDivElement>(null)
  // O trilho âmbar cresce acompanhando o scroll pela seção (transform puro,
  // sem custo de layout — mantém a disciplina de performance do site).
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 75%', 'end 65%'],
  })

  return (
    <section id="experiencia" className="border-t border-neutral-200 bg-neutral-100 px-6 py-24 dark:border-neutral-800/60 dark:bg-[#141416]">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="03 · Trajetória" title="Experiência Profissional" className="mb-16" />

        <div ref={timelineRef} className="relative">
          {/* Trilho base + trilho de progresso desenhado pelo scroll. */}
          <div aria-hidden className="absolute bottom-9 left-[11px] top-9 w-0.5 bg-neutral-200 dark:bg-neutral-800" />
          <motion.div
            aria-hidden
            style={{ scaleY: scrollYProgress }}
            className="absolute bottom-9 left-[11px] top-9 w-0.5 origin-top bg-amber-500 dark:bg-amber-300"
          />

          {/* Entrada 1 — Prodater */}
          <div className="relative pb-14 pl-12">
            <TimelineDot />
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-lg hover:shadow-neutral-200/70 dark:bg-neutral-900 dark:hover:shadow-black/40"
            >
              <h3 className="font-heading text-2xl font-bold text-neutral-900 dark:text-neutral-50">
                {prodater.company}
              </h3>
              <p className="mt-1 font-sans font-semibold text-neutral-700 dark:text-amber-300">
                {prodater.role}
              </p>
              <p className="mt-1 font-sans text-sm text-neutral-500 dark:text-neutral-400">
                {prodater.location} · {prodater.period}
              </p>
              <p className="mt-6 font-sans text-neutral-700 dark:text-neutral-300">{prodater.summary}</p>
              <ul className="mt-6 space-y-3">
                {prodater.highlights.map((highlight) => (
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
          </div>

          {/* Entrada 2 — Freelance E-commerce */}
          <div className="relative pl-12">
            <TimelineDot />
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="grid gap-10 rounded-2xl bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-lg hover:shadow-neutral-200/70 dark:bg-neutral-900 dark:hover:shadow-black/40 md:grid-cols-2 md:items-center"
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
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-neutral-900 dark:bg-amber-300">
                        <Check className="h-3 w-3 text-white dark:text-neutral-900" />
                      </span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                {ecommerceExperience.url ? (
                  <a href={ecommerceExperience.url} target="_blank" rel="noopener noreferrer" className="block">
                    <img
                      src={ecommerceExperience.image}
                      alt={ecommerceExperience.imageCaption}
                      loading="lazy"
                      decoding="async"
                      className="w-full drop-shadow-lg transition-transform duration-500 ease-out hover:scale-[1.02]"
                    />
                  </a>
                ) : (
                  <img
                    src={ecommerceExperience.image}
                    alt={ecommerceExperience.imageCaption}
                    loading="lazy"
                    decoding="async"
                    className="w-full drop-shadow-lg"
                  />
                )}
                <p className="mt-3 text-center font-sans text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                  {ecommerceExperience.imageCaption}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection
