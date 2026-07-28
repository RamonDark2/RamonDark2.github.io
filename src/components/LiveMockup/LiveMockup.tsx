import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink, Loader2, MonitorPlay, X } from 'lucide-react'

// Área útil da tela dentro dos mockups Macbook-Air-*.png (todos 1600×919 com a
// mesma moldura — medido por varredura de pixels: tela de x 176→1420, y 54→830).
const SCREEN = {
  left: '11%',
  top: '5.88%',
  width: '77.75%',
  height: '84.44%',
} as const

// O iframe renderiza o site numa viewport virtual de desktop e é reduzido via
// transform até caber na tela do notebook — assim aparece o layout desktop
// miniaturizado, não a versão mobile espremida.
const VIRTUAL_WIDTH_PX = 1280

// Proporção do mockup é 1600/919 ≈ 1.741 — o notebook ampliado ocupa o máximo
// da viewport sem estourar nem largura (94vw) nem altura (~88vh · 1.741 ≈ 153vh).
const MODAL_WIDTH_CLASS = 'w-[min(94vw,153vh)]'

interface LiveMockupProps {
  image: string
  alt: string
  url: string
  // Anima a entrada do notebook (leve abertura 3D) na primeira vez em que ele
  // entra na viewport. Desligue quando o pai já anima o card inteiro.
  entrance?: boolean
}

function LiveMockup({ image, alt, url, entrance = false }: LiveMockupProps) {
  const [live, setLive] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const screenRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0)

  const closeLive = () => {
    setLive(false)
    setLoaded(false)
    setScale(0)
  }

  // Com o notebook ampliado aberto: trava o scroll da página e fecha no Esc.
  useEffect(() => {
    if (!live) return
    document.body.style.overflow = 'hidden'
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') closeLive()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [live])

  // Mede a tela do notebook ampliado para calcular a escala do iframe — refaz
  // no resize da janela.
  useEffect(() => {
    if (!live) return
    const el = screenRef.current
    if (!el) return

    const measure = () => setScale(el.clientWidth / VIRTUAL_WIDTH_PX)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [live])

  return (
    <>
      <motion.div
        initial={entrance ? { opacity: 0, y: 32, rotateX: 14 } : false}
        whileInView={entrance ? { opacity: 1, y: 0, rotateX: 0 } : undefined}
        viewport={entrance ? { once: true, amount: 0.3 } : undefined}
        transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
        style={entrance ? { transformPerspective: 1000 } : undefined}
        className="group/mockup relative"
      >
        <img src={image} alt={alt} loading="lazy" decoding="async" className="w-full drop-shadow-lg" />

        <button
          type="button"
          onClick={() => setLive(true)}
          className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2"
          aria-label={`Ver ${alt} ao vivo dentro do mockup`}
        >
          {/* Em telas de toque (sem hover) o botão fica sempre visível; com mouse,
              aparece só no hover do mockup. */}
          <span className="flex items-center gap-2 whitespace-nowrap rounded-full bg-black/60 px-4 py-2 font-sans text-xs font-semibold uppercase tracking-wide text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-black/80 group-hover/mockup:opacity-100 [@media(hover:hover)]:opacity-0">
            <MonitorPlay className="h-4 w-4" />
            Ver ao vivo
          </span>
        </button>
      </motion.div>

      {/* Notebook ampliado no centro da tela: só o notebook flutuando sobre um
          fundo escurecido (sem caixa de modal), com o site real navegável na
          tela. Clique fora, Esc ou X fecham. */}
      <AnimatePresence>
        {live && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeLive}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 8 }}
              transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
              onClick={(event) => event.stopPropagation()}
              className={`relative ${MODAL_WIDTH_CLASS}`}
            >
              <img src={image} alt={alt} decoding="async" className="w-full drop-shadow-2xl" />

              <div ref={screenRef} className="absolute overflow-hidden rounded-[3px] bg-white" style={SCREEN}>
                {!loaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-neutral-100">
                    <Loader2 className="h-7 w-7 animate-spin text-neutral-500" />
                  </div>
                )}
                {scale > 0 && (
                  <iframe
                    src={url}
                    title={alt}
                    onLoad={() => setLoaded(true)}
                    style={{
                      width: VIRTUAL_WIDTH_PX,
                      height: screenRef.current ? screenRef.current.clientHeight / scale : 0,
                      transform: `scale(${scale})`,
                      transformOrigin: '0 0',
                      border: 0,
                    }}
                  />
                )}
              </div>

              {/* Controles acima do notebook, alinhados à borda da tela. */}
              <div className="absolute -top-12 right-[4%] flex items-center gap-2 sm:right-0">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Abrir ${alt} em nova aba`}
                  className="flex h-9 items-center gap-2 rounded-full bg-white/10 px-4 font-sans text-xs font-semibold text-white transition-colors hover:bg-white/20"
                >
                  <ExternalLink className="h-4 w-4" />
                  Abrir site
                </a>
                <button
                  type="button"
                  onClick={closeLive}
                  aria-label="Fechar visualização ao vivo"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default LiveMockup
