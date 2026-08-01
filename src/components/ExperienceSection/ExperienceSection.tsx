import { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import { Calendar, ExternalLink, MapPin } from 'lucide-react'
import { ecommerceExperience, experience } from '../../data/sobreMim'
import SectionHeading from '../SectionHeading/SectionHeading'

const prodater = experience[0]
const ProdaterIcon = prodater.icon
const EcommerceIcon = ecommerceExperience.icon

// Marcador da timeline: anel âmbar que "pinga" ao entrar na viewport. Some
// no celular (junto com o trilho) pra o card usar a largura inteira.
function TimelineDot() {
  return (
    <motion.span
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, amount: 1 }}
      transition={{ type: 'spring', damping: 12, stiffness: 260 }}
      className="absolute left-0 top-9 hidden h-6 w-6 items-center justify-center rounded-full border-2 border-amber-500 bg-white dark:border-amber-300 dark:bg-neutral-900 sm:flex"
    >
      <span className="h-2 w-2 rounded-full bg-amber-500 dark:bg-amber-300" />
    </motion.span>
  )
}

// Pílula de tecnologia/competência — mesmo visual usado no stack técnico da
// ProjectsSection, reaproveitado aqui pra manter o mesmo idioma visual.
function TechPill({
  icon: Icon,
  label,
  color,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  label: string
  color?: string
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 bg-neutral-50 px-2 py-1 text-xs font-medium text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200">
      <Icon className="h-3.5 w-3.5" style={color ? { color } : undefined} />
      {label}
    </span>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <h4 className="mb-3 font-sans text-sm font-bold text-amber-600 dark:text-amber-300">{children}</h4>
}

function CardDivider() {
  return <div className="my-6 border-t border-neutral-200 dark:border-neutral-800" />
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
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="03 · Trajetória" title="Experiência Profissional" className="mb-16" />

        <div ref={timelineRef} className="relative">
          {/* Trilho base + trilho de progresso desenhado pelo scroll — some no
              celular junto com os TimelineDot, ver comentário lá. */}
          <div aria-hidden className="absolute bottom-9 left-[11px] top-9 hidden w-0.5 bg-neutral-200 dark:bg-neutral-800 sm:block" />
          <motion.div
            aria-hidden
            style={{ scaleY: scrollYProgress }}
            className="absolute bottom-9 left-[11px] top-9 hidden w-0.5 origin-top bg-amber-500 dark:bg-amber-300 sm:block"
          />

          {/* Entrada 1 — Prodater */}
          <div className="relative pb-8 sm:pl-12">
            <TimelineDot />
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-lg hover:shadow-neutral-200/70 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:shadow-black/40"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-neutral-900 dark:bg-black">
                  <ProdaterIcon className="h-4 w-4 text-amber-400" />
                </span>
                <div>
                  <h3 className="font-heading text-xl font-bold text-neutral-900 dark:text-neutral-50">
                    {prodater.company}
                  </h3>
                  <p className="font-sans text-sm font-semibold text-neutral-500 dark:text-amber-300">
                    {prodater.role}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 font-sans text-sm text-neutral-500 dark:text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  {prodater.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {prodater.period}
                </span>
              </div>

              <p className="mt-4 font-sans text-neutral-700 dark:text-neutral-300">{prodater.summary}</p>

              <CardDivider />

              <div className="grid gap-8 md:grid-cols-[1.4fr_1fr]">
                <div>
                  <SectionLabel>Principais responsabilidades</SectionLabel>
                  <ul className="space-y-2.5">
                    {prodater.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-2.5 font-sans text-sm text-neutral-700 dark:text-neutral-300"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-600 dark:bg-amber-300" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {prodater.techStack && (
                  <div>
                    <SectionLabel>Tecnologias & Ferramentas</SectionLabel>
                    <div className="flex flex-wrap gap-2">
                      {prodater.techStack.map((tech) => (
                        <TechPill key={tech.name} icon={tech.icon} label={tech.name} color={tech.color} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Entrada 2 — Freelance E-commerce */}
          <div className="relative sm:pl-12">
            <TimelineDot />
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-lg hover:shadow-neutral-200/70 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:shadow-black/40"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-neutral-900 dark:bg-black">
                  <EcommerceIcon className="h-4 w-4 text-amber-400" />
                </span>
                <div>
                  <h3 className="font-heading text-xl font-bold text-neutral-900 dark:text-neutral-50">
                    {ecommerceExperience.title}
                  </h3>
                  <p className="font-sans text-sm font-semibold text-neutral-500 dark:text-amber-300">
                    {ecommerceExperience.role}
                  </p>
                </div>
              </div>

              <p className="mt-4 font-sans text-neutral-700 dark:text-neutral-300">
                {ecommerceExperience.summary}
              </p>

              <CardDivider />

              <div className="grid gap-8 md:grid-cols-2 md:items-center">
                <div>
                  <SectionLabel>Principais entregas</SectionLabel>
                  <ul className="md:columns-2 md:gap-x-8">
                    {ecommerceExperience.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="mb-2.5 flex items-start gap-2.5 break-inside-avoid font-sans text-sm text-neutral-700 dark:text-neutral-300"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-600 dark:bg-amber-300" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {ecommerceExperience.competencies && (
                    <div className="mt-4">
                      <SectionLabel>Competências aplicadas</SectionLabel>
                      <div className="flex flex-wrap gap-2">
                        {ecommerceExperience.competencies.map((competency) => (
                          <TechPill key={competency.label} icon={competency.icon} label={competency.label} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  {ecommerceExperience.url ? (
                    <a
                      href={ecommerceExperience.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative block"
                    >
                      <picture>
                        {ecommerceExperience.mobileImage && (
                          <source media="(max-width: 767px)" srcSet={ecommerceExperience.mobileImage} />
                        )}
                        <img
                          src={ecommerceExperience.image}
                          alt={ecommerceExperience.imageCaption}
                          loading="lazy"
                          decoding="async"
                          className="w-full rounded-lg drop-shadow-lg transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                        />
                      </picture>
                      {/* Mesmo visual da etiqueta "Ver ao vivo" do LiveMockup —
                          aqui é só um link externo (sem embed, ver nota do
                          CSP na interface ComplementaryExperience), mas a
                          pílula continua sempre visível igual. */}
                      <span
                        aria-hidden
                        className="pointer-events-none absolute left-1/2 top-[45%] flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-black/60 px-4 py-2 font-sans text-xs font-semibold uppercase tracking-wide text-white shadow-lg backdrop-blur-sm"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Abrir link
                      </span>
                    </a>
                  ) : (
                    <picture>
                      {ecommerceExperience.mobileImage && (
                        <source media="(max-width: 767px)" srcSet={ecommerceExperience.mobileImage} />
                      )}
                      <img
                        src={ecommerceExperience.image}
                        alt={ecommerceExperience.imageCaption}
                        loading="lazy"
                        decoding="async"
                        className="w-full rounded-lg drop-shadow-lg"
                      />
                    </picture>
                  )}
                  <p className="mt-3 text-center font-sans text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                    {ecommerceExperience.imageCaption}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection
