import { motion } from 'framer-motion'
import { useGetUsers } from '../../hooks/useGet/useGetUsers'
import Header from '../../components/Header/header'
import { GITHUB_USERNAME } from './data'

const baseUrl = import.meta.env.BASE_URL
const avatarSrc = `${baseUrl}img/FotoPerfil_Linkedin.png`

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

function Hero() {
  const { user, loading } = useGetUsers(GITHUB_USERNAME)

  return (
    <section className="relative min-h-screen overflow-hidden bg-white dark:bg-[#0B0B0C]">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -left-20 top-10 h-96 w-96 rounded-full bg-amber-200/40 blur-3xl dark:bg-indigo-900/40"
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute right-0 top-1/3 h-[28rem] w-[28rem] rounded-full bg-rose-200/30 blur-3xl dark:bg-slate-800/40"
          animate={{ x: [0, -30, 0], y: [0, -40, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-sky-200/30 blur-3xl dark:bg-amber-900/20"
          animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <svg className="absolute inset-0 h-full w-full opacity-[0.05] mix-blend-overlay">
          <filter id="hero-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves={2} stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#hero-noise)" />
        </svg>
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />

        <motion.div
          className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center font-heading text-neutral-900 dark:text-neutral-50"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            className="text-[4rem] font-bold leading-[0.9] sm:text-[6rem] lg:text-[8rem]"
          >
            RAMON
          </motion.h1>

          <motion.div variants={itemVariants} className="relative my-2 sm:my-4">
            <img
              src={avatarSrc}
              alt="Ramon Rodrigues"
              className="h-24 w-24 rounded-2xl object-cover shadow-2xl transition-transform hover:scale-105 sm:h-32 sm:w-32"
            />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-[4rem] font-bold leading-[0.9] sm:text-[6rem] lg:text-[8rem]"
          >
            RODRIGUES
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="mt-10 flex w-full max-w-5xl flex-col justify-between gap-6 font-sans text-sm text-neutral-600 dark:text-neutral-300 sm:flex-row sm:text-left"
          >
            <p className="sm:max-w-xs">
              Desenvolvedor Full Stack, atualmente na Prodater — Soluções em TI, disponível para
              novos projetos.
            </p>
            <p className="sm:max-w-xs sm:text-right">
              Focado em construir aplicações completas, do front ao deploy — React, Next.js, Node
              e Python.
            </p>
          </motion.div>

          {!loading && user && (
            <motion.p
              variants={itemVariants}
              className="mt-6 font-sans text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400"
            >
              {user.public_repos} repositórios públicos · {user.followers} seguidores no GitHub
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
