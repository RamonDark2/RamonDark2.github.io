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

function scrollToSection(target: string) {
  document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
}

function Header() {
  return (
    <header className="flex w-full flex-col items-center gap-4 px-6 py-6 font-sans text-sm text-neutral-900 dark:text-neutral-50 md:flex-row md:justify-between">
      <a
        href={`mailto:${EMAIL}`}
        className="rounded-full border border-current px-5 py-2 font-semibold uppercase tracking-wide transition-colors hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-900"
      >
        Fale comigo
      </a>

      <nav className="hidden items-center gap-5 lg:flex">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.target}
            type="button"
            onClick={() => scrollToSection(item.target)}
            className={`font-sans text-sm font-medium text-neutral-600 dark:text-neutral-400 ${CURSOR_FILL_CLASSNAME}`}
          >
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
    </header>
  )
}

export default Header