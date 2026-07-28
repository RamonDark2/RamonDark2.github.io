import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Cloud,
  Code2,
  Database,
  LayoutGrid,
  Server,
  Smartphone,
} from 'lucide-react'
import { skills } from '../../data/sobreMim'
import type { Skill } from '../../data/sobreMim'
import SectionHeading from '../SectionHeading/SectionHeading'

function findSkill(name: string): Skill {
  const found = skills.find((skill) => skill.name === name)
  if (!found) throw new Error(`Skill "${name}" não encontrada em sobreMim.ts`)
  return found
}

// As mesmas 14 tecnologias de sempre, só reagrupadas em mais categorias pra
// dar uma rede mais rica visualmente — nenhuma tecnologia nova, nenhuma
// removida (ver soma: 4 + 1 + 3 + 2 + 4 = 14).
const heroSkills = ['React', 'Vue.js', 'Next.js', 'TypeScript'].map(findSkill)

interface SatelliteGroup {
  title: string
  description: string
  icon: typeof Smartphone
  items: Skill[]
}

const SATELLITES: SatelliteGroup[] = [
  {
    title: 'Mobile',
    description: 'Apps multiplataforma reaproveitando a mesma base do frontend web.',
    icon: Smartphone,
    items: ['React Native + TypeScript'].map(findSkill),
  },
  {
    title: 'Backend',
    description: 'APIs robustas e documentadas para sustentar aplicações modernas.',
    icon: Server,
    items: ['Node.js', 'NestJS', 'Python / FastAPI'].map(findSkill),
  },
  {
    title: 'Banco de Dados',
    description: 'Modelagem e consultas eficientes para dados consistentes.',
    icon: Database,
    items: ['PostgreSQL', 'ORM / Prisma'].map(findSkill),
  },
  {
    title: 'Infraestrutura & Práticas',
    description: 'Contêineres, integração contínua e boas práticas de versionamento.',
    icon: Cloud,
    items: ['Docker', 'Infraestrutura', 'REST APIs', 'Git'].map(findSkill),
  },
]

// Palavras do selo giratório — vêm de trechos já reais do site (about.paragraphs),
// não inventadas pra essa peça decorativa.
const BADGE_TEXT = 'FULL STACK  ·  BOAS PRÁTICAS  ·  CODE REVIEW  ·  '

interface Point {
  x: number
  y: number
}

interface Geometry {
  width: number
  height: number
  origin: Point
  targets: Point[]
}

// Mede a posição real (em pixels do contêiner) do card principal e dos
// satélites pra desenhar as linhas exatamente na borda deles — coordenadas
// fixas ficavam levemente erradas em larguras entre o breakpoint `lg`
// (1024px) e o teto do `max-w-7xl`, já que a coluna do card principal é em
// px fixo e come uma fração diferente do contêiner nessa faixa. O viewBox do
// SVG usa essas mesmas dimensões em pixels (1 unidade = 1px real, sem
// esticar) — só assim círculos continuam círculos; um viewBox abstrato
// "0 0 100 100" esticado sem manter proporção (preserveAspectRatio="none")
// virava oval num contêiner bem mais largo que alto.
function useConnectorGeometry(
  containerRef: React.RefObject<HTMLDivElement | null>,
  heroRef: React.RefObject<HTMLDivElement | null>,
  satelliteRefs: React.MutableRefObject<(HTMLDivElement | null)[]>,
) {
  const [geometry, setGeometry] = useState<Geometry | null>(null)

  useEffect(() => {
    function measure() {
      const container = containerRef.current
      const hero = heroRef.current
      if (!container || !hero) return
      const containerRect = container.getBoundingClientRect()
      if (containerRect.width === 0 || containerRect.height === 0) return

      const heroRect = hero.getBoundingClientRect()
      const origin = {
        x: heroRect.right - containerRect.left,
        y: heroRect.top + heroRect.height / 2 - containerRect.top,
      }
      const targets = satelliteRefs.current.map((el) => {
        if (!el) return { x: origin.x, y: origin.y }
        const rect = el.getBoundingClientRect()
        return {
          x: rect.left - containerRect.left,
          y: rect.top + rect.height / 2 - containerRect.top,
        }
      })
      setGeometry({ width: containerRect.width, height: containerRect.height, origin, targets })
    }

    measure()
    const observer = new ResizeObserver(measure)
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [containerRef, heroRef, satelliteRefs])

  return geometry
}

function curve(from: Point, to: Point) {
  const midX = (from.x + to.x) / 2
  return `M ${from.x},${from.y} C ${midX},${from.y} ${midX},${to.y} ${to.x},${to.y}`
}

function ConnectorLines({ geometry, animate }: { geometry: Geometry | null; animate: boolean }) {
  if (!geometry) return null
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${geometry.width} ${geometry.height}`}
      className={`pointer-events-none absolute inset-0 hidden h-full w-full lg:block ${animate ? '' : 'connector-paused'}`}
    >
      {geometry.targets.map((target, index) => {
        const d = curve(geometry.origin, target)
        return (
          <g key={index}>
            <motion.path
              d={d}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              className="text-amber-500/70 dark:text-amber-300/60"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={animate ? { pathLength: 1, opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.9, delay: 0.3 + index * 0.15, ease: 'easeInOut' }}
            />
            {/* Luz viajando do card principal até o satélite: só translada ao
                longo do path (offset-path), roda no compositor — bem mais
                barato que animar coordenadas a cada frame via JS. Viewbox
                agora é em pixels reais, então o raio não distorce em oval. */}
            <circle
              r={4}
              className="connector-dot fill-amber-400 dark:fill-amber-300"
              style={{
                offsetPath: `path("${d}")`,
                animationDelay: `${index * 0.5}s`,
              }}
            />
          </g>
        )
      })}
      <circle cx={geometry.origin.x} cy={geometry.origin.y} r={3.5} className="fill-amber-500 dark:fill-amber-300" />
    </svg>
  )
}

function RotatingBadge({ spinning }: { spinning: boolean }) {
  return (
    <div className="pointer-events-none absolute right-0 top-0 hidden h-24 w-24 items-center justify-center sm:flex">
      <svg viewBox="0 0 100 100" className={`h-full w-full ${spinning ? 'animate-badge-spin' : ''}`}>
        <defs>
          <path id="skills-badge-circle" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
        </defs>
        <text
          fontSize="6.4"
          letterSpacing="1"
          fill="currentColor"
          className="fill-neutral-400 uppercase dark:fill-neutral-600"
        >
          <textPath href="#skills-badge-circle" startOffset="0%">
            {BADGE_TEXT.repeat(2)}
          </textPath>
        </text>
      </svg>
      <Code2 className="absolute h-5 w-5 text-amber-600 dark:text-amber-300" />
    </div>
  )
}

function Pill({ skill, tone }: { skill: Skill; tone: 'dark' | 'light' }) {
  const Icon = skill.icon
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${
        tone === 'dark'
          ? 'border-white/15 bg-white/5 text-neutral-200'
          : 'border-neutral-200 bg-neutral-50 text-neutral-700 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-100'
      }`}
    >
      <Icon className="h-3.5 w-3.5" style={{ color: skill.color }} />
      {skill.name}
    </span>
  )
}

// Marcador do "spine" vertical mobile — mesmo motivo visual da timeline de
// Experiência, só que nesta seção (dot + trilho) em vez de dot + trilho que
// se desenha no scroll, pra não duplicar o mesmo efeito de scroll-tracking
// duas vezes na página.
function MobileDot() {
  return (
    <span className="absolute left-0 top-8 -translate-x-1/2 rounded-full border-2 border-amber-500 bg-white p-0.5 dark:border-amber-300 dark:bg-neutral-900 lg:hidden">
      <span className="block h-1.5 w-1.5 rounded-full bg-amber-500 dark:bg-amber-300" />
    </span>
  )
}

const cardTransition = { duration: 0.6, ease: [0.33, 1, 0.68, 1] as const }

function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const satelliteRefs = useRef<(HTMLDivElement | null)[]>([])
  // Pausa a rotação do selo e o redesenho das linhas quando a seção sai da
  // tela — mesma lição de performance já aplicada ao carrossel de
  // tecnologias e aos blobs do Hero.
  const inView = useInView(sectionRef, { amount: 0.2 })
  const geometry = useConnectorGeometry(containerRef, heroRef, satelliteRefs)

  return (
    <section
      ref={sectionRef}
      id="competencias"
      className="relative overflow-hidden border-t border-neutral-200 bg-white px-6 py-20 dark:border-neutral-800/60 dark:bg-[#0B0B0C]"
    >
      {/* Formas de fundo decorativas — estáticas de propósito (blur contínuo
          animado foi uma causa real de lag já corrigida neste projeto). */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-amber-100/60 blur-3xl dark:bg-amber-500/[0.08]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-neutral-200/50 blur-3xl dark:bg-neutral-700/20"
      />

      <div className="relative mx-auto max-w-7xl">
        <RotatingBadge spinning={inView} />
        <SectionHeading eyebrow="02 · Stack" title="Competências Técnicas" className="mb-12 max-w-xl" />

        <div ref={containerRef} className="relative">
          <ConnectorLines geometry={geometry} animate={inView} />

          {/* Trilho vertical mobile/tablet (<lg): mesma linguagem visual da
              rede de linhas do desktop, adaptada a uma pilha de uma coluna
              só. Some a partir de lg, onde a rede horizontal assume. */}
          <div
            aria-hidden
            className="absolute bottom-10 left-0 top-10 w-px bg-gradient-to-b from-amber-500/50 via-amber-500/30 to-transparent dark:from-amber-300/40 dark:via-amber-300/20 lg:hidden"
          />

          {/* z-10 pra ficar acima do SVG das linhas (absolute): sem isso, a
              ordem de pintura padrão do CSS coloca elementos posicionados
              (o SVG) por cima do conteúdo em fluxo normal (esta grid),
              mesmo vindo depois no DOM — as linhas atravessariam os cards
              em vez de parecerem "chegar até" a borda deles. */}
          <div className="relative z-10 grid gap-6 pl-8 lg:grid-cols-[340px_1fr] lg:gap-16 lg:pl-0">
            {/* Card principal — Frontend */}
            <motion.div
              ref={heroRef}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={cardTransition}
              className="relative isolate overflow-hidden rounded-3xl bg-neutral-900 p-8 text-white shadow-xl dark:bg-black"
            >
              <MobileDot />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-20 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-amber-500/20 blur-3xl"
              />
              <div className="relative">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                  <LayoutGrid className="h-7 w-7 text-amber-400" />
                </span>
                <h3 className="mt-6 font-heading text-2xl font-bold">Frontend</h3>
                <p className="mt-3 text-sm text-neutral-300">
                  Interfaces modernas, rápidas e acessíveis, com foco em experiência e performance.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {heroSkills.map((skill) => (
                    <Pill key={skill.name} skill={skill} tone="dark" />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Satélites */}
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
              {SATELLITES.map((group, index) => {
                const GroupIcon = group.icon
                return (
                  <motion.div
                    key={group.title}
                    ref={(el) => {
                      satelliteRefs.current[index] = el
                    }}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ ...cardTransition, delay: 0.15 + index * 0.1 }}
                    className="relative rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md dark:border-neutral-700 dark:bg-neutral-800"
                  >
                    <MobileDot />
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-700">
                      <GroupIcon className="h-5 w-5 text-amber-600 dark:text-amber-300" />
                    </span>
                    <h4 className="mt-4 font-heading text-base font-bold text-neutral-900 dark:text-neutral-50">
                      {group.title}
                    </h4>
                    <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">{group.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {group.items.map((skill) => (
                        <Pill key={skill.name} skill={skill} tone="light" />
                      ))}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-neutral-200 pt-6 font-sans text-xs uppercase tracking-widest text-neutral-500 dark:border-neutral-800 dark:text-neutral-400 sm:flex-row sm:items-center sm:justify-between">
          <span>CI/CD · JWT & Refresh Token · Atomic Design</span>
          <span>Code Review · Boas Práticas · Arquitetura</span>
        </div>
      </div>
    </section>
  )
}

export default SkillsSection
