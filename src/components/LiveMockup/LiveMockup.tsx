import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink, Loader2, MonitorPlay, X } from 'lucide-react'

// Avisa o Cursor.tsx global que um "ao vivo" está aberto, pra ele pausar a
// bolinha que segue o mouse (sem isso, ela fica presa/salta ao entrar e sair
// do iframe do site real embutido no mockup — o iframe é outro documento e
// não dispara mousemove no pai). Mesmo nome duplicado em Cursor.tsx (mesmo
// padrão do GITHUB_URL local repetido em vários arquivos deste projeto).
const LIVE_MOCKUP_EVENT = 'livemockup-open-change'

// Área útil da tela dentro dos mockups Macbook-Air-*.png (todos 1600×919 com a
// mesma moldura — medido por varredura de pixels: tela de x 176→1420, y 54→830).
// Usado só na visualização "ao vivo" ampliada (liveImage): o card pequeno
// mostra o combo notebook+celular, mas ao clicar o embed abre neste mockup
// solo, com a calibração original já testada.
const SCREEN = {
  left: '11%',
  top: '5.88%',
  width: '77.75%',
  height: '84.44%',
} as const

// Área útil da tela dentro dos mockups iPhone-14-PRO-MAX-*.webp (todos
// 982×1998 com a mesma moldura — medido por varredura de pixels: a barra de
// status/dynamic island e a barra do Safari embaixo já fazem parte da imagem,
// então a área útil real é x 52→931, y 182→1691).
const SCREEN_PHONE = {
  left: '5.3%',
  top: '9.11%',
  width: '89.6%',
  height: '75.53%',
} as const

// O iframe renderiza o site numa viewport virtual de desktop e é reduzido via
// transform até caber na tela do notebook — assim aparece o layout desktop
// miniaturizado, não a versão mobile espremida.
const VIRTUAL_WIDTH_PX = 1280

// Já no mockup de celular o objetivo é o oposto: mostrar o layout mobile real
// do site (não o desktop espremido), então a viewport virtual do iframe usa a
// largura lógica de um iPhone 14 Pro Max.
const VIRTUAL_WIDTH_PX_PHONE = 430

// Proporção do mockup solo é 1600/919 ≈ 1.741 — o notebook ampliado ocupa o
// máximo da viewport sem estourar nem largura (94vw) nem altura (~88vh · 1.741 ≈ 153vh).
const MODAL_WIDTH_CLASS = 'w-[min(94vw,153vh)]'

// Proporção do mockup de celular é 982/1998 ≈ 0.4915 (retrato) — o oposto do
// notebook: aqui é a altura que limita, então o modal ocupa quase a tela
// inteira (92vh) sem estourar a largura em telas muito baixas/largas (187vw).
const MODAL_HEIGHT_CLASS_PHONE = 'h-[min(92vh,187vw)]'

// Abaixo de 768px (breakpoint "md" do Tailwind) o layout de projetos já cai
// para uma coluna só — tratamos isso como "tela de celular" para trocar o
// mockup de notebook pelo de iPhone.
const MOBILE_BREAKPOINT_QUERY = '(max-width: 767px)'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia(MOBILE_BREAKPOINT_QUERY).matches)

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_BREAKPOINT_QUERY)
    const onChange = () => setIsMobile(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return isMobile
}

// Os mockups combo (notebook + celular juntos, usados no card pequeno dos
// projetos) são um render 3D real, não uma captura de frente — o topo da
// tela sobe da esquerda pra direita (medido por varredura de pixels: y 231
// em x=400 até y 207 em x=1000, ~2.3° — ver uso de "rotate-[-2.3deg]" mais
// abaixo). A etiqueta "Ver ao vivo" acompanha esse ângulo pra não parecer um
// adesivo reto sobre uma tela inclinada. Os mockups solo (Macbook-Air-*.png,
// usados na ampliada e na palestra) são de frente, sem inclinação nenhuma —
// por isso essa correção só entra quando `tiltedArt` é true.

interface LiveMockupProps {
  image: string
  alt: string
  url: string
  // Mockup em iPhone 14 Pro Max — quando informado, substitui o de notebook
  // em telas de celular (card e visualização ao vivo ampliada).
  mobileImage?: string
  // Notebook solo (sem o celular ao lado) usado só na visualização "ao vivo"
  // ampliada em telas de desktop — o card pequeno continua mostrando `image`
  // (o combo notebook+celular). Sem essa prop, a ampliada reaproveita `image`.
  liveImage?: string
  // `image` é o render combo (notebook + celular, levemente inclinado) em vez
  // do mockup solo de frente — ver comentário de COMBO_ART_TILT_DEG.
  tiltedArt?: boolean
  // Anima a entrada do notebook (leve abertura 3D) na primeira vez em que ele
  // entra na viewport. Desligue quando o pai já anima o card inteiro.
  entrance?: boolean
}

function LiveMockup({ image, alt, url, mobileImage, liveImage, tiltedArt = false, entrance = false }: LiveMockupProps) {
  const [live, setLive] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const screenRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0)
  const isMobile = useIsMobile()
  const showPhone = Boolean(mobileImage) && isMobile
  const displayImage = showPhone ? (mobileImage as string) : image
  const modalImage = showPhone ? (mobileImage as string) : (liveImage ?? image)

  const closeLive = () => {
    setLive(false)
    setLoaded(false)
    setScale(0)
  }

  // Com o notebook ampliado aberto: trava o scroll da página, fecha no Esc,
  // e devolve o cursor normal do sistema (a bolinha custom some via o evento
  // abaixo, então precisa do cursor de verdade de volta nesse meio-tempo).
  useEffect(() => {
    if (!live) return
    document.body.style.overflow = 'hidden'
    document.body.style.cursor = 'auto'
    window.dispatchEvent(new CustomEvent(LIVE_MOCKUP_EVENT, { detail: true }))
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') closeLive()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      document.body.style.cursor = ''
      window.dispatchEvent(new CustomEvent(LIVE_MOCKUP_EVENT, { detail: false }))
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [live])

  // Mede a tela do notebook ampliado para calcular a escala do iframe — refaz
  // no resize da janela.
  useEffect(() => {
    if (!live) return
    const el = screenRef.current
    if (!el) return

    const virtualWidth = showPhone ? VIRTUAL_WIDTH_PX_PHONE : VIRTUAL_WIDTH_PX
    const measure = () => setScale(el.clientWidth / virtualWidth)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [live, showPhone])

  return (
    <>
      {/* O mockup inteiro é clicável (não só a pílula) — além de aumentar a
          área de clique, isso ativa o efeito já existente do cursor
          customizado (Cursor.tsx) que cresce sobre links de imagem, que
          antes nunca disparava aqui por não haver nenhum <button>/<a>
          envolvendo a própria imagem. */}
      <motion.button
        type="button"
        onClick={() => setLive(true)}
        aria-label={`Ver ${alt} ao vivo dentro do mockup`}
        initial={entrance ? { opacity: 0, y: 32, rotateX: 14 } : false}
        whileInView={entrance ? { opacity: 1, y: 0, rotateX: 0 } : undefined}
        viewport={entrance ? { once: true, amount: 0.3 } : undefined}
        transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
        style={entrance ? { transformPerspective: 1000 } : undefined}
        className="group/mockup relative block w-full appearance-none bg-transparent p-0 text-left"
      >
        <img src={displayImage} alt={alt} loading="lazy" decoding="async" className="w-full drop-shadow-lg" />

        {/* Etiqueta sempre visível (não só no hover) tanto no desktop quanto
            no celular — em telas de toque isso já era assim (medido via
            `isMobile` em JS, não `@media(hover:hover)`, que alguns
            navegadores mobile reais não "casam" de forma confiável); o
            texto também muda pra deixar claro que é toque, não hover. No
            notebook combo (tiltedArt), a etiqueta acompanha o ângulo real do
            render 3D (ver comentário de COMBO_ART_TILT_DEG) — sem isso ela
            fica reta sobre uma tela inclinada, um "adesivo torto". Puramente
            decorativa (aria-hidden): o botão já tem seu próprio aria-label. */}
        <span
          aria-hidden
          className={`pointer-events-none absolute left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-black/60 px-4 py-2 font-sans text-xs font-semibold uppercase tracking-wide text-white opacity-100 shadow-lg backdrop-blur-sm transition-all duration-300 ${
            showPhone ? 'top-[46%]' : 'top-[45%]'
          } ${tiltedArt && !showPhone ? 'rotate-[-2.3deg]' : ''}`}
        >
          <MonitorPlay className="h-4 w-4" />
          {isMobile ? 'Toque para ver ao vivo' : 'Ver ao vivo'}
        </span>
      </motion.button>

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
              className={`relative ${showPhone ? MODAL_HEIGHT_CLASS_PHONE : MODAL_WIDTH_CLASS}`}
            >
              <img
                src={modalImage}
                alt={alt}
                decoding="async"
                className={showPhone ? 'h-full w-auto drop-shadow-2xl' : 'w-full drop-shadow-2xl'}
              />

              <div
                ref={screenRef}
                className="absolute overflow-hidden rounded-[3px] bg-white"
                style={showPhone ? SCREEN_PHONE : SCREEN}
              >
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
                      width: showPhone ? VIRTUAL_WIDTH_PX_PHONE : VIRTUAL_WIDTH_PX,
                      height: screenRef.current ? screenRef.current.clientHeight / scale : 0,
                      transform: `scale(${scale})`,
                      transformOrigin: '0 0',
                      border: 0,
                    }}
                  />
                )}
              </div>
            </motion.div>

            {/* Controles fixos no canto da tela (não relativos ao notebook/
                celular ampliado) — no mockup de celular o modal ocupa quase
                92vh, então prender os controles à borda do próprio card
                cortaria o botão pra fora da viewport. */}
            <div
              onClick={(event) => event.stopPropagation()}
              className="fixed right-4 top-4 z-[110] flex items-center gap-2 sm:right-6 sm:top-6"
            >
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
        )}
      </AnimatePresence>
    </>
  )
}

export default LiveMockup
