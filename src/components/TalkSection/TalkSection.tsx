import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink, X } from 'lucide-react'
import { talk } from '../../data/sobreMim'
import { CURSOR_FILL_CLASSNAME } from '../../styles/cursorFill'
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
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="05 · Palestra" title={talk.title} className="mb-0" />

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
          <div className="md:col-span-3">
            <LiveMockup image={talk.mockupImage} alt={talk.title} url={talk.url} entrance />
          </div>
          {talk.photos.map((photo, index) => (
            <motion.button
              key={photo}
              type="button"
              onClick={() => setLightboxPhoto(photo)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              aria-label={`Ampliar foto da apresentação ${index + 1}`}
              className="group overflow-hidden rounded-xl shadow-md"
            >
              <img
                src={photo}
                alt={`Foto da apresentação ${index + 1}`}
                loading="lazy"
                decoding="async"
                className="h-48 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </motion.button>
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
