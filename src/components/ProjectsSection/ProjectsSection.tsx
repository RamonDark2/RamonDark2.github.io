import { motion } from 'framer-motion'
import { projects } from '../../data/sobreMim'
import { CURSOR_FILL_CLASSNAME } from '../../styles/cursorFill'
import LiveMockup from '../LiveMockup/LiveMockup'
import SectionHeading from '../SectionHeading/SectionHeading'

function ProjectsSection() {
  return (
    <section id="projetos" className="border-t border-neutral-200 bg-white px-6 py-24 dark:border-neutral-800/60 dark:bg-[#0B0B0C]">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="04 · Portfólio" title="Projetos Relevantes" className="mb-16" />

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => {
            const Icon = project.icon
            return (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: (index % 2) * 0.12 }}
                className="group flex flex-col rounded-2xl border border-neutral-200 p-8 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-neutral-400 hover:shadow-xl hover:shadow-neutral-200/60 dark:border-neutral-800 dark:hover:border-amber-300/50 dark:hover:shadow-none"
              >
                {project.image ? (
                  <div className="mb-6">
                    {project.url ? (
                      <LiveMockup
                        image={project.image}
                        mobileImage={project.mobileImage}
                        alt={project.name}
                        url={project.url}
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
                ) : (
                  <Icon className="mb-6 h-10 w-10 text-neutral-900 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 dark:text-amber-300" />
                )}
                <h3 className="font-heading text-xl font-bold text-neutral-900 dark:text-neutral-50">
                  {project.name}
                </h3>
                <p className="mt-4 flex-1 font-sans text-sm text-neutral-600 dark:text-neutral-300">
                  {project.description}
                </p>
                {project.tag && (
                  <span className="mt-6 self-start rounded-full bg-neutral-100 px-3 py-1 font-sans text-xs font-semibold text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200">
                    {project.tag}
                  </span>
                )}
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-6 self-end font-sans text-sm font-semibold text-neutral-900 dark:text-amber-300 ${CURSOR_FILL_CLASSNAME}`}
                  >
                    Ver site
                  </a>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
