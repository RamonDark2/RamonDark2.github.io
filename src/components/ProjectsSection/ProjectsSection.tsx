import { motion } from 'framer-motion'
import { ArrowRight, Github } from 'lucide-react'
import { projects } from '../../data/sobreMim'
import LiveMockup from '../LiveMockup/LiveMockup'
import SectionHeading from '../SectionHeading/SectionHeading'

const GITHUB_URL = 'https://github.com/Ramonrrc'

function ProjectsSection() {
  return (
    <section id="projetos" className="border-t border-neutral-200 bg-white px-6 py-20 dark:border-neutral-800/60 dark:bg-[#0B0B0C]">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="04 · Portfólio" title="Projetos Relevantes" className="mb-4" />
        <p className="mb-16 max-w-2xl font-sans text-sm text-neutral-500 dark:text-neutral-400">
          Clique no notebook ou celular de cada projeto para navegar pelo site real, ao vivo, direto aqui na página.
        </p>

        <div className="grid gap-6 xl:grid-cols-2">
          {projects.map((project, index) => {
            const Icon = project.icon
            return (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: (index % 2) * 0.12 }}
                className="group flex flex-col gap-5 rounded-2xl border border-neutral-200 p-5 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-neutral-400 hover:shadow-xl hover:shadow-neutral-200/60 dark:border-neutral-800 dark:hover:border-amber-300/50 dark:hover:shadow-none sm:flex-row sm:items-end sm:gap-5"
              >
                <div className="flex flex-1 flex-col sm:w-[44%]">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-neutral-900 dark:bg-black">
                    <Icon className="h-4 w-4 text-amber-400" />
                  </span>
                  <h3 className="mt-3 font-heading text-lg font-bold text-neutral-900 dark:text-neutral-50">
                    {project.name}
                  </h3>
                  {project.tag && (
                    <p className="mt-0.5 font-sans text-xs font-semibold text-neutral-500 dark:text-amber-300">
                      {project.tag}
                    </p>
                  )}
                  <p className="mt-2 font-sans text-sm leading-snug text-neutral-600 dark:text-neutral-300">
                    {project.description}
                  </p>

                  {project.stack && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {project.stack.map((tech) => (
                        <span
                          key={tech.name}
                          className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-xs font-medium text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
                        >
                          <tech.icon className="h-3 w-3" style={{ color: tech.color }} />
                          {tech.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {project.image && (
                  <div className="sm:w-[56%] sm:flex-shrink-0">
                    {project.url ? (
                      <LiveMockup
                        image={project.image}
                        mobileImage={project.mobileImage}
                        liveImage={project.liveImage}
                        alt={project.name}
                        url={project.url}
                        tiltedArt
                        labelBelow
                      />
                    ) : (
                      <img
                        src={project.image}
                        alt={project.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full drop-shadow-lg"
                      />
                    )}
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

        <div className="mt-10 flex flex-col items-center gap-6 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-neutral-900 dark:bg-black">
              <Github className="h-5 w-5 text-amber-400" />
            </span>
            <div>
              <p className="font-sans text-sm font-semibold text-neutral-900 dark:text-neutral-50">
                Mais projetos, código e detalhes técnicos.
              </p>
              <p className="font-sans text-sm text-neutral-500 dark:text-neutral-400">
                Acesse meu GitHub e confira todos os repositórios.
              </p>
            </div>
          </div>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group/cta inline-flex flex-shrink-0 items-center gap-3 rounded-lg border border-neutral-300 py-2 pl-5 pr-2 font-sans text-sm font-semibold text-neutral-900 transition-colors hover:border-neutral-400 dark:border-neutral-700 dark:text-neutral-50 dark:hover:border-neutral-600"
          >
            <span>
              Explorar no <span className="text-amber-600 dark:text-amber-300">GitHub</span>
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-amber-500 text-white transition-transform duration-300 group-hover/cta:translate-x-0.5 dark:bg-amber-400 dark:text-neutral-900">
              <ArrowRight className="h-4 w-4" />
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
