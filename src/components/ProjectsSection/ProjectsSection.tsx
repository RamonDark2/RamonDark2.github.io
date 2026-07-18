import { motion } from 'framer-motion'
import { projects } from '../../data/sobreMim'

function ProjectsSection() {
  return (
    <section className="bg-white px-6 py-24 dark:bg-[#0B0B0C]">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-16 font-heading text-4xl font-bold text-neutral-900 dark:text-neutral-50 sm:text-5xl">
          Projetos Relevantes
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {projects.map((project) => {
            const Icon = project.icon
            return (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col rounded-2xl border border-neutral-200 p-8 transition-transform hover:-translate-y-1 dark:border-neutral-800"
              >
                {project.image ? (
                  project.url ? (
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="mb-6 h-40 w-full rounded-xl object-cover object-top transition-opacity hover:opacity-90"
                      />
                    </a>
                  ) : (
                    <img
                      src={project.image}
                      alt={project.name}
                      className="mb-6 h-40 w-full rounded-xl object-cover object-top"
                    />
                  )
                ) : (
                  <Icon className="mb-6 h-10 w-10 text-neutral-900 dark:text-amber-300" />
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
                    className="mt-6 self-end font-sans text-sm font-semibold text-neutral-900 hover:underline dark:text-amber-300"
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
