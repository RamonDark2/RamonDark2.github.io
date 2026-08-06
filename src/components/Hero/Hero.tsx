import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react'
import { useGetUsers } from '../../hooks/useGet/useGetUsers'
import { GITHUB_USERNAME } from '../../data/sobreMim'
import { scrollToSection } from '../../data/navigation'
import { CURSOR_FILL_CONTAINED_CLASSNAME } from '../../styles/cursorFill'
import MorphSlider from '../MorphSlider/MorphSlider'
import FoldText from '../FoldText/FoldText'

const baseUrl = import.meta.env.BASE_URL
const heroSlides = [
  { image: `${baseUrl}img/im1.webp` },
  { image: `${baseUrl}img/im2.webp` },
]

// Atraso base sincronizado com a cortina do IntroReveal (~1.6s exibição + 0.7s saída):
// as letras terminam de subir enquanto a cortina revela o Hero.
const INTRO_OFFSET_S = 1.7

// "Liquid glass": base escura sólida (bg-black/30) + gradiente claro sutil
// de cima pra baixo por cima dela (simula luz batendo numa superfície
// curva) + brilho fino por dentro no topo (o "aro" que pega luz numa borda
// de vidro de verdade), pra dar profundidade. Sem o véu do Hero (removido —
// deixava a foto muito lavada), esses painéis são a ÚNICA fonte de
// contraste pro texto de dentro deles — por isso a base precisa ser sólida
// o bastante sozinha (bg-black/30), não só desfoque + um branco quase
// transparente, que ficava ilegível dependendo do trecho da foto atrás.
// Mesmo visual nos dois temas do site (o do modo escuro, por escolha — não
// adapta por dark:). Sem rounded-full nem overflow aqui — cada uso escolhe
// o raio (a pílula longa do stack de tecnologias quebra linha, e cantos
// totalmente redondos num bloco de duas linhas ficam desproporcionais) e o
// overflow (o stack de tecnologias usa overflow-x-auto pra rolar em telas
// muito estreitas em vez de cortar o texto — misturar um overflow-hidden
// fixo aqui dentro teria vencido essa regra por último no CSS gerado do
// Tailwind e cortava "PostgreSQL" no meio).
const GLASS_PANEL_CLASSNAME =
  'relative isolate border border-white/10 bg-black/30 bg-gradient-to-b from-white/15 via-white/5 to-transparent shadow-[0_8px_24px_-8px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.2),inset_0_-1px_2px_rgba(0,0,0,0.3)] backdrop-blur-xl'

function Hero() {
  const { user, loading } = useGetUsers(GITHUB_USERNAME)
  const sectionRef = useRef<HTMLElement>(null)
  // Pausa o pulo infinito do chevron quando o Hero sai da tela — animação
  // contínua fora da viewport é custo de composição à toa.
  const inView = useInView(sectionRef)

  // O FoldText dispara sozinho ao montar — se montasse junto com o resto,
  // a dobra terminaria de rodar enquanto o motion.div pai ainda está em
  // opacity:0 (só fica visível em INTRO_OFFSET_S + 0.6s) e ninguém veria a
  // animação. Só monta o FoldText depois que o bloco já está visível.
  const [showFoldedName, setShowFoldedName] = useState(false)
  useEffect(() => {
    const id = setTimeout(() => setShowFoldedName(true), (INTRO_OFFSET_S + 0.6) * 1000)
    return () => clearTimeout(id)
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden bg-neutral-50 dark:bg-neutral-950">
      {/* Mobile: bloco de altura fixa em fluxo normal (foto some do fundo,
          fica visível inteira acima do texto). A partir de sm: volta a ser
          full-bleed atrás do conteúdo (design original), já que só o mobile
          teve queixa de texto ilegível em cima da foto. */}
      <div className="relative h-[55vh] min-h-[340px] w-full sm:absolute sm:inset-0 sm:h-auto">
        <MorphSlider
          items={heroSlides}
          transition="melt"
          aberration={0}
          autoplay
          autoplayDelay={5}
          showControls={false}
          showIndicators={false}
          showCaptions={false}
          radius={0}
          focalX={0.65}
          className="h-full w-full"
        />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-40 bg-gradient-to-t from-neutral-50/55 to-transparent dark:from-neutral-950/55 sm:block"
      />

      {/* Mobile: card sólido logo abaixo da foto (não por cima dela), com as
          pontas de cima arredondadas puxadas sobre o fim da foto (-mt-8) pra
          esconder a costura — texto sempre sobre fundo sólido, nunca sobre a
          foto. Em sm: volta a ser a sobreposição translúcida original. */}
      <div className="relative z-10 -mt-8 rounded-t-[2rem] bg-neutral-50 px-6 pb-12 pt-8 shadow-[0_-16px_40px_-20px_rgba(0,0,0,0.25)] dark:bg-neutral-950 sm:mt-0 sm:flex sm:min-h-screen sm:flex-col sm:justify-center sm:rounded-none sm:bg-transparent sm:px-10 sm:pb-24 sm:pt-32 sm:shadow-none sm:dark:bg-transparent lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: INTRO_OFFSET_S }}
          className="flex max-w-xl flex-col"
        >
          <span className="order-1 inline-flex items-center gap-2 self-start rounded-full border border-amber-300/30 bg-amber-500/10 px-3 py-1 font-sans text-xs font-semibold uppercase tracking-widest text-amber-700/70 dark:border-amber-300/25 dark:bg-amber-300/10 dark:text-amber-300 sm:text-white/80">
            <Sparkles className="h-3.5 w-3.5" />
            Desenvolvedor Full Stack
          </span>

          <h1 className="order-2 mt-5 font-heading text-4xl font-bold leading-[1.05] text-neutral-900 dark:text-neutral-50 sm:text-5xl sm:text-amber-400 sm:dark:text-amber-400 lg:text-6xl">
            {showFoldedName ? (
              <FoldText text="Jalbert Ramon" fontSize="inherit" fontWeight="inherit" color="inherit" hinge="top" />
            ) : (
              <span className="invisible">Jalbert Ramon</span>
            )}
          </h1>

          <p className="order-3 mt-5 max-w-md font-sans text-base text-neutral-900 dark:text-neutral-100 sm:text-white sm:dark:text-neutral-900">
            Desenvolvedor Frontend na Prodater — Soluções em TI há 2 anos, também atuando como
            Full Stack em projetos próprios e freelance.
          </p>

          {/* Mesma ordem em todos os tamanhos: stack de tecnologias logo
              acima do selo do GitHub, com os botões antes dele. */}
          <p
            className={`order-5 mt-6 inline-block max-w-full self-start rounded-2xl px-3.5 py-2 font-sans text-xs leading-relaxed tracking-wide text-white sm:overflow-x-auto sm:whitespace-nowrap sm:leading-normal ${GLASS_PANEL_CLASSNAME}`}
          >
            <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
            <span className="relative z-[1]">Vue.js · React · Next.js · TypeScript · Node.js · NestJS · Python · PostgreSQL</span>
          </p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: INTRO_OFFSET_S + 0.15 }}
            className="order-4 mt-6 flex flex-wrap items-center gap-4"
          >
            <button
              type="button"
              onClick={() => scrollToSection('projetos')}
              className="group/cta inline-flex items-center gap-3 rounded-full bg-amber-500 py-2 pl-5 pr-2 font-sans text-sm font-semibold text-neutral-900 shadow-lg shadow-amber-500/25 transition-transform hover:-translate-y-0.5 dark:bg-amber-400"
            >
              Ver projetos
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-white transition-transform duration-300 group-hover/cta:translate-x-0.5 dark:bg-neutral-950">
                <ArrowRight className="h-4 w-4" />
              </span>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('contato')}
              className={`inline-flex items-center gap-2 rounded-full border border-neutral-900 px-5 py-2 font-sans text-base font-semibold text-neutral-900 dark:border-white dark:text-white sm:border-white sm:text-white ${CURSOR_FILL_CONTAINED_CLASSNAME}`}
            >
              Fale comigo
            </button>
          </motion.div>

          {!loading && user && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: INTRO_OFFSET_S + 0.3 }}
              className={`order-6 mt-3 inline-block self-start overflow-hidden rounded-2xl px-3.5 py-1.5 font-sans text-xs uppercase tracking-widest text-white sm:rounded-full ${GLASS_PANEL_CLASSNAME}`}
            >
              <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
              <span className="relative z-[1]">
                {user.public_repos} repositórios públicos · {user.followers} seguidores no GitHub
              </span>
            </motion.p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: INTRO_OFFSET_S + 0.6 }}
          className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:block"
        >
          <motion.div
            animate={inView ? { y: [0, 8, 0] } : { y: 0 }}
            transition={{ duration: 1.6, repeat: inView ? Infinity : 0, ease: 'easeInOut' }}
          >
            <ChevronDown className="h-6 w-6 text-neutral-400 dark:text-neutral-600" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
