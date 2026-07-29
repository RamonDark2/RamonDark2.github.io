import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BookOpen, CheckCircle2, X } from 'lucide-react'
import { talk } from '../../data/sobreMim'
import LiveMockup from '../LiveMockup/LiveMockup'
import SectionHeading from '../SectionHeading/SectionHeading'

function TalkSection() {
  const [lightboxPhoto, setLightboxPhoto] = useState<string | null>(null)

  useEffect(() => {
    if (!lightboxPhoto) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setLightboxPhoto(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [lightboxPhoto])

  return (
    // overflow-hidden: o LiveMockup dos slides usa rotateX na entrada (3D tilt) —
    // enquanto ainda não entrou na viewport (whileInView não disparou), o navegador
    // calcula uma caixa delimitadora rotacionada mais larga que a imagem normal,
    // o que contava pro scrollWidth da página inteira e dava overflow horizontal
    // em algumas larguras (~1040px), mesmo com a seção fora da tela.
    <section className="overflow-hidden border-t border-neutral-200 bg-neutral-100 px-6 py-24 dark:border-neutral-800/60 dark:bg-[#141416]">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-neutral-900 lg:p-10">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <SectionHeading eyebrow="05 · Palestra" title={talk.title} className="mb-4" />
              <p className="font-sans text-neutral-700 dark:text-neutral-300">{talk.description}</p>

              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
                {talk.tags.map((tag, index) => (
                  <div key={tag.label} className="flex items-center gap-4">
                    {index > 0 && <span className="h-4 w-px bg-neutral-300 dark:bg-neutral-700" />}
                    <span className="flex items-center gap-1.5 font-sans text-sm text-neutral-600 dark:text-neutral-300">
                      <tag.icon className="h-4 w-4 text-amber-600 dark:text-amber-300" />
                      {tag.label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 h-px bg-gradient-to-r from-amber-400/70 via-amber-400/15 to-transparent dark:from-amber-300/50 dark:via-amber-300/10" />

              <div className="mt-6 flex items-center gap-3">
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-500/10">
                  <BookOpen className="h-4 w-4 text-amber-600 dark:text-amber-300" />
                </span>
                <h4 className="font-heading text-lg font-bold text-neutral-900 dark:text-neutral-50">
                  Tópicos abordados
                </h4>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2.5">
                {talk.topics.map((topic) => (
                  <span
                    key={topic}
                    className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 font-sans text-xs text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 sm:text-sm"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 text-amber-500 dark:text-amber-300 sm:h-4 sm:w-4" />
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <LiveMockup image={talk.mockupImage} alt={talk.title} url={talk.url} entrance />
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {talk.photos.map((photo, index) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center gap-4 overflow-hidden rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 sm:relative sm:block sm:border-0 sm:bg-transparent sm:dark:bg-transparent"
            >
              <button
                type="button"
                onClick={() => setLightboxPhoto(photo.src)}
                aria-label={`Ampliar foto: ${photo.label}`}
                className="group relative h-24 w-24 flex-shrink-0 overflow-hidden sm:h-48 sm:w-full sm:rounded-2xl"
              >
                <img
                  src={photo.src}
                  alt={photo.label}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </button>
              <div className="flex items-center gap-2 pr-4 font-sans text-sm font-medium text-neutral-700 dark:text-neutral-200 sm:absolute sm:bottom-3 sm:left-3 sm:w-fit sm:rounded-full sm:bg-black/60 sm:px-3 sm:py-1.5 sm:text-white sm:backdrop-blur-sm">
                <photo.icon className="h-4 w-4 flex-shrink-0 text-amber-600 sm:text-amber-300" />
                {photo.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox das fotos: clique fora ou Esc fecham. */}
      <AnimatePresence>
        {lightboxPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setLightboxPhoto(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-6"
          >
            <button
              type="button"
              onClick={() => setLightboxPhoto(null)}
              aria-label="Fechar foto ampliada"
              className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.img
              src={lightboxPhoto}
              alt="Foto da apresentação ampliada"
              initial={{ scale: 0.92, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="max-h-[85vh] max-w-full rounded-xl object-contain shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default TalkSection
