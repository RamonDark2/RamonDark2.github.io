import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { skills } from '../../data/sobreMim'
import type { Skill } from '../../data/sobreMim'
import SectionHeading from '../SectionHeading/SectionHeading'

// A segunda fileira começa do meio da lista, pra não repetir a primeira lado a
// lado. Cada fileira é duplicada 1x só para fechar o loop do carrossel (ver
// keyframes em index.css) — a segunda cópia é decorativa.
const rowOne = [...skills, ...skills]
const rowTwoBase = [...skills.slice(7), ...skills.slice(0, 7)]
const rowTwo = [...rowTwoBase, ...rowTwoBase]

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.33, 1, 0.68, 1] as const } },
}

function MarqueeRow({
  items,
  animationClass,
  delayChildren,
}: {
  items: Skill[]
  animationClass: string
  delayChildren: number
}) {
  return (
    // Sem whileInView próprio: o trilho tem ~4500px de largura e a fração
    // visível nunca atingiria o threshold do observer. Os variants chegam por
    // propagação do wrapper externo (largura normal) em SkillsSection.
    <motion.div
      variants={{ visible: { transition: { staggerChildren: 0.04, delayChildren } } }}
      className={`flex w-max gap-4 ${animationClass}`}
    >
      {items.map((skill, index) => {
        const Icon = skill.icon
        return (
          <motion.div
            key={`${skill.name}-${index}`}
            aria-hidden={index >= items.length / 2}
            variants={cardVariants}
            className="group flex w-40 flex-shrink-0 flex-col items-center gap-3 rounded-2xl border border-neutral-200 bg-white px-5 py-5 text-center shadow-sm transition-all duration-300 hover:z-20 hover:-translate-y-1 hover:border-neutral-900 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-600"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100 transition-colors duration-300 group-hover:bg-neutral-50 dark:bg-neutral-800 dark:group-hover:bg-neutral-700">
              <Icon className="h-6 w-6" style={{ color: skill.color }} />
            </span>
            <span className="font-sans text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {skill.name}
            </span>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  // Pausa os dois carrosséis quando a seção sai da viewport — animação
  // infinita fora da tela era uma das fontes de lag já corrigidas antes
  // (blobs do Hero); mesmo remédio aqui.
  const inView = useInView(sectionRef)

  return (
    <section ref={sectionRef} id="competencias" className="border-t border-neutral-200 bg-white py-16 dark:border-neutral-800/60 dark:bg-[#0B0B0C]">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading eyebrow="02 · Stack" title="Competências Técnicas" className="mb-8" />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className={`relative w-full overflow-hidden ${inView ? '' : 'marquee-paused'}`}
      >
        {/* Fachadas de esmaecimento nas bordas: camadas por cima (não um
            mask-image no trilho), pra não reduzir de verdade a opacidade dos
            cards — combinado com o z-index no hover, o card passa por cima da
            fachada e aparece por completo mesmo perto da borda. */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent dark:from-[#0B0B0C] sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent dark:from-[#0B0B0C] sm:w-24" />

        <div className="flex flex-col gap-4">
          <MarqueeRow items={rowOne} animationClass="animate-marquee" delayChildren={0} />
          <MarqueeRow items={rowTwo} animationClass="animate-marquee-reverse" delayChildren={0.25} />
        </div>
      </motion.div>
    </section>
  )
}

export default SkillsSection
