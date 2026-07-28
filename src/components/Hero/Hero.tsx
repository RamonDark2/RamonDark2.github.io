import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useGetUsers } from '../../hooks/useGet/useGetUsers'
import { GITHUB_USERNAME } from '../../data/sobreMim'

const baseUrl = import.meta.env.BASE_URL
// Retrato 4:5 — usado em telas estreitas (<768px), onde o recorte "cover" de um
// retrato numa área alta e estreita fica fiel, sem cortar cabeça nem corpo.
const heroPhotoSrc = `${baseUrl}img/ramon-retrato-landing-1600px.webp`
const heroPhotoSrcSet = [
  `${baseUrl}img/ramon-retrato-landing-828px.webp 828w`,
  `${baseUrl}img/ramon-retrato-landing-1600px.webp 1600w`,
  `${baseUrl}img/ramon-retrato-landing-2560px.webp 2560w`,
].join(', ')
// Paisagem 16:9 — usada a partir de 768px (notebook/desktop), onde a razão já bate
// com a área larga e curta do Hero: cobre a largura toda com corte mínimo/lateral,
// sem precisar ampliar o rosto nem deixar barra escura nas bordas.
const heroPhotoDesktopSrcSet = [
  `${baseUrl}img/ramon-ultrawide-1024px.webp 1024w`,
  `${baseUrl}img/ramon-ultrawide-1672px.webp 1672w`,
].join(', ')

const REVEAL_EASE = [0.33, 1, 0.68, 1] as const

// Atraso base sincronizado com a cortina do IntroReveal (~1.6s exibição + 0.7s saída):
// as letras terminam de subir enquanto a cortina revela o Hero.
const INTRO_OFFSET_S = 1.7

function MaskedName({ text, delay }: { text: string; delay: number }) {
  return (
    <h1
      aria-label={text}
      className="text-[2.5rem] font-bold leading-[0.95] drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)] sm:text-[4rem] lg:text-[5.5rem]"
    >
      {text.split('').map((letter, index) => (
        <span key={`${letter}-${index}`} aria-hidden className="inline-block overflow-hidden">
          <motion.span
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, ease: REVEAL_EASE, delay: delay + index * 0.045 }}
            className="inline-block"
          >
            {letter}
          </motion.span>
        </span>
      ))}
    </h1>
  )
}

function Hero() {
  const { user, loading } = useGetUsers(GITHUB_USERNAME)
  const sectionRef = useRef<HTMLElement>(null)
  // Pausa o pulo infinito do chevron quando o Hero sai da tela — animação
  // contínua fora da viewport é custo de composição à toa.
  const inView = useInView(sectionRef)

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden bg-neutral-900">
      <picture>
        <source media="(min-width: 768px)" srcSet={heroPhotoDesktopSrcSet} sizes="100vw" />
        <img
          src={heroPhotoSrc}
          srcSet={heroPhotoSrcSet}
          sizes="100vw"
          alt="Jalbert Ramon"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[center_12%] md:object-center"
        />
      </picture>
      {/* Vinheta fixa (não segue o tema): escurece topo (Header) e base (nome/texto),
          mantendo uma faixa central clara onde o rosto aparece sem texto por cima. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.65)_0%,rgba(0,0,0,0)_18%,rgba(0,0,0,0)_58%,rgba(0,0,0,0.78)_82%,rgba(0,0,0,0.94)_100%)]"
      />

      <div className="relative z-10 flex min-h-screen flex-col">
        <div className="flex flex-1 flex-col items-center justify-end px-6 pb-20 text-center font-heading text-white">
          <MaskedName text="JALBERT" delay={INTRO_OFFSET_S} />
          <MaskedName text="RAMON" delay={INTRO_OFFSET_S + 0.2} />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: INTRO_OFFSET_S + 0.75 }}
            className="mt-6 flex max-w-xl flex-col items-center gap-3"
          >
            <p className="font-sans text-base text-neutral-100">
              Desenvolvedor Frontend na Prodater — Soluções em TI há 2 anos, também atuando
              como Full Stack em projetos próprios e freelance.
            </p>
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-neutral-400">
              Vue.js · React · Next.js · TypeScript · Node.js · NestJS · Python · PostgreSQL
            </p>
          </motion.div>

          {!loading && user && (
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: INTRO_OFFSET_S + 0.9 }}
              className="mt-8 font-sans text-xs uppercase tracking-widest text-neutral-300"
            >
              {user.public_repos} repositórios públicos · {user.followers} seguidores no GitHub
            </motion.p>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: INTRO_OFFSET_S + 1.3 }}
          className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={inView ? { y: [0, 8, 0] } : { y: 0 }}
            transition={{ duration: 1.6, repeat: inView ? Infinity : 0, ease: 'easeInOut' }}
          >
            <ChevronDown className="h-6 w-6 text-neutral-300" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
