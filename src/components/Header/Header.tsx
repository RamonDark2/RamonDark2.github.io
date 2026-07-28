import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, MessageCircle } from 'lucide-react'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import { CURSOR_FILL_CLASSNAME } from '../../styles/cursorFill'

const EMAIL = 'jalbertramon1@gmail.com'
const WHATSAPP_URL = 'https://wa.me/86994258329'
const GITHUB_URL = 'https://github.com/RamonDark2'
const LINKEDIN_URL = 'https://www.linkedin.com/in/ramon-rodrigues-48459721b/'

// Navegação por scroll suave via scrollIntoView — nunca por href="#...":
// o router do site é baseado em hash, e mudar o hash dispararia o
// roteamento (caindo na página 404).
const NAV_ITEMS = [
  { label: 'Sobre', target: 'sobre' },
  { label: 'Competências', target: 'competencias' },
  { label: 'Experiência', target: 'experiencia' },
  { label: 'Projetos', target: 'projetos' },
  { label: 'Contato', target: 'contato' },
]

// Mesmo delay de INTRO_OFFSET_S + 0.5 do Hero.tsx — mantém os dois em sincronia
// se a duração da cortina do IntroReveal mudar.
const STICKY_INTRO_DELAY_S = 2.2
const SCROLL_THRESHOLD_PX = 80

function scrollToSection(target: string) {
  document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
}

interface HeaderProps {
  // 'sticky': fixo no topo da viewport, sem fundo enquanto a página está no
  // topo (para ficar sobre a foto do Hero) e com fundo em glass + versão
  // compacta assim que o usuário rola a página. Usado só na página principal
  // — a página de Login usa o Header no fluxo normal, sem esse comportamento.
  sticky?: boolean
}

function Header({ sticky = false }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (!sticky) return

    function handleScroll() {
      setScrolled(window.scrollY > SCROLL_THRESHOLD_PX)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sticky])

  // Só fica sem fundo (direto sobre a foto do Hero) no topo da página. O
  // texto do Header fica sempre claro quando sticky — tanto no topo (sobre a
  // foto) quanto rolado (o glass é preto de propósito, não branco, então
  // precisa do mesmo texto claro, independente do tema do site).
  const overPhoto = sticky && !scrolled

  const headerClassName = [
    'flex w-full flex-col items-center gap-4 font-sans text-sm md:flex-row md:justify-between',
    sticky
      ? 'fixed inset-x-0 top-0 z-50 text-white transition-[background-color,padding,box-shadow] duration-300'
      : '',
    overPhoto ? 'bg-transparent px-6 py-6' : '',
    sticky && !overPhoto ? 'bg-black/50 px-6 py-3 shadow-sm shadow-black/20 backdrop-blur-md' : '',
    !sticky ? 'px-6 py-6 text-neutral-900 dark:text-neutral-50' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const navClassName = `font-sans text-sm font-medium ${
    sticky ? 'text-neutral-300' : 'text-neutral-600 dark:text-neutral-400'
  } ${CURSOR_FILL_CLASSNAME}`

  return (
    <motion.header
      initial={sticky ? { opacity: 0, y: -16 } : false}
      animate={sticky ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, ease: 'easeOut', delay: STICKY_INTRO_DELAY_S }}
      className={headerClassName}
    >
      <a
        href={`mailto:${EMAIL}`}
        className="rounded-full border border-current px-5 py-2 font-semibold uppercase tracking-wide transition-colors hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-900"
      >
        Fale comigo
      </a>

      <nav className="hidden items-center gap-5 lg:flex">
        {NAV_ITEMS.map((item) => (
          <button key={item.target} type="button" onClick={() => scrollToSection(item.target)} className={navClassName}>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-6">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-2 font-semibold ${CURSOR_FILL_CLASSNAME}`}
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </a>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-2 font-semibold ${CURSOR_FILL_CLASSNAME}`}
        >
          <Github className="h-4 w-4" />
          GitHub
        </a>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-2 font-semibold ${CURSOR_FILL_CLASSNAME}`}
        >
          <Linkedin className="h-4 w-4" />
          LinkedIn
        </a>
        <ThemeToggle />
      </div>
    </motion.header>
  )
}

export default Header
