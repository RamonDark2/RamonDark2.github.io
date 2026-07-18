import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ChevronDown, Hand } from 'lucide-react'
import { useGetUsers } from '../../hooks/useGet/useGetUsers'
import Header from '../Header/Header'
import { GITHUB_USERNAME } from '../../data/sobreMim'

const baseUrl = import.meta.env.BASE_URL
const avatarSrc = `${baseUrl}img/FotoPerfil_Linkedin.png`

const REVEAL_EASE = [0.33, 1, 0.68, 1] as const

// Atraso base sincronizado com a cortina do IntroReveal (~1.6s exibição + 0.7s saída):
// as letras terminam de subir enquanto a cortina revela o Hero.
const INTRO_OFFSET_S = 1.7

function MaskedName({ text, delay }: { text: string; delay: number }) {
  return (
    <h1
      aria-label={text}
      className="text-[4rem] font-bold leading-[0.9] sm:text-[6rem] lg:text-[8rem]"
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
  // Pausa os blobs desfocados quando o Hero sai da tela: blur-3xl animando
  // continuamente fora da viewport era uma das fontes de lag no scroll.
  const inView = useInView(sectionRef)

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden bg-white dark:bg-[#0B0B0C]">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -left-20 top-10 h-96 w-96 rounded-full bg-amber-200/40 blur-3xl will-change-transform dark:bg-indigo-900/40"
          animate={inView ? { x: [0, 40, 0], y: [0, 30, 0] } : { x: 0, y: 0 }}
          transition={{ duration: 18, repeat: inView ? Infinity : 0, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute right-0 top-1/3 h-[28rem] w-[28rem] rounded-full bg-rose-200/30 blur-3xl will-change-transform dark:bg-slate-800/40"
          animate={inView ? { x: [0, -30, 0], y: [0, -40, 0] } : { x: 0, y: 0 }}
          transition={{ duration: 22, repeat: inView ? Infinity : 0, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-sky-200/30 blur-3xl will-change-transform dark:bg-amber-900/20"
          animate={inView ? { x: [0, 20, 0], y: [0, -20, 0] } : { x: 0, y: 0 }}
          transition={{ duration: 20, repeat: inView ? Infinity : 0, ease: 'easeInOut' }}
        />
        <svg className="absolute inset-0 h-full w-full opacity-[0.04]">
          <filter id="hero-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves={2} stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#hero-noise)" />
        </svg>
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: INTRO_OFFSET_S + 0.5 }}
        >
          <Header />
        </motion.div>

        <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center font-heading text-neutral-900 dark:text-neutral-50">
          <MaskedName text="RAMON" delay={INTRO_OFFSET_S} />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: INTRO_OFFSET_S + 0.25 }}
            className="group relative my-2 sm:my-4"
          >
            <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-3 -translate-x-1/2 translate-y-1 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
              <div className="flex items-center gap-2 whitespace-nowrap rounded-full bg-neutral-900 px-4 py-2 font-sans text-sm font-medium text-white shadow-lg dark:bg-white dark:text-neutral-900">
                <Hand className="h-4 w-4" />
                Olá!
              </div>
              <div className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-neutral-900 dark:bg-white" />
            </div>
            <img
              src={avatarSrc}
              alt="Ramon Rodrigues"
              className="h-24 w-24 rounded-2xl object-cover object-top shadow-2xl transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105 sm:h-32 sm:w-32"
            />
          </motion.div>

          <MaskedName text="RODRIGUES" delay={INTRO_OFFSET_S + 0.2} />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: INTRO_OFFSET_S + 0.75 }}
            className="mt-10 flex w-full max-w-5xl flex-col justify-between gap-6 font-sans text-sm text-neutral-600 dark:text-neutral-300 sm:flex-row sm:text-left"
          >
            <p className="sm:max-w-xs">
              Desenvolvedor Frontend na Prodater — Soluções em TI há 2 anos, também atuando
              como Full Stack em projetos próprios e freelance.
            </p>
            <p className="sm:max-w-xs sm:text-right">
              Stack principal: Vue.js, React, Next.js, TypeScript, Node.js, NestJS, Python e
              PostgreSQL.
            </p>
          </motion.div>

          {!loading && user && (
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: INTRO_OFFSET_S + 0.9 }}
              className="mt-6 font-sans text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400"
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
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="h-6 w-6 text-neutral-400 dark:text-neutral-500" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
