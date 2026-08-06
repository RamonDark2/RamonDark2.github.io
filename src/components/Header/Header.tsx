import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Github, Linkedin, Mail, Menu, MessageCircle, X } from 'lucide-react'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import CardNav, { type CardNavGroup } from '../CardNav/CardNav'
import { useTheme } from '../../contexts/ThemeContext'
import { CURSOR_FILL_CLASSNAME, CURSOR_FILL_CONTAINED_CLASSNAME } from '../../styles/cursorFill'
import { NAV_ITEMS, scrollToSection, scrollToTop } from '../../data/navigation'

const baseUrl = import.meta.env.BASE_URL
const EMAIL = 'jalbertramon1@gmail.com'
const WHATSAPP_URL = 'https://wa.me/86994258329'
const GITHUB_URL = 'https://github.com/Ramonrrc'
const LINKEDIN_URL = 'https://www.linkedin.com/in/jalbert-ramon-dev'

// Opções do menu "Fale comigo" — consolida os contatos num só botão em vez
// de espalhar WhatsApp/GitHub/LinkedIn soltos pelo header.
const CONTACT_OPTIONS = [
  { label: EMAIL, icon: Mail, href: `mailto:${EMAIL}`, external: false },
  { label: 'WhatsApp', icon: MessageCircle, href: WHATSAPP_URL, external: true },
  { label: 'GitHub', icon: Github, href: GITHUB_URL, external: true },
  { label: 'LinkedIn', icon: Linkedin, href: LINKEDIN_URL, external: true },
]

// Mesmo delay de INTRO_OFFSET_S + 0.5 do Hero.tsx — mantém os dois em sincronia
// se a duração da cortina do IntroReveal mudar.
const STICKY_INTRO_DELAY_S = 2.2
const SCROLL_THRESHOLD_PX = 80

interface HeaderProps {
  // 'sticky': fixo no topo da viewport, sem fundo enquanto a página está no
  // topo (para ficar sobre a foto do Hero) e com fundo em glass + versão
  // compacta assim que o usuário rola a página. Usado só na página principal
  // — a página de Login usa o Header no fluxo normal, sem esse comportamento.
  sticky?: boolean
}

function Header({ sticky = false }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [contactMenuOpen, setContactMenuOpen] = useState(false)
  const contactMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sticky) return

    function handleScroll() {
      setScrolled(window.scrollY > SCROLL_THRESHOLD_PX)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sticky])

  useEffect(() => {
    if (!mobileMenuOpen) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setMobileMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [mobileMenuOpen])

  // Popover do "Fale comigo" (desktop): fecha ao clicar fora ou com Esc.
  useEffect(() => {
    if (!contactMenuOpen) return
    function onPointerDown(event: MouseEvent) {
      if (contactMenuRef.current && !contactMenuRef.current.contains(event.target as Node)) {
        setContactMenuOpen(false)
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setContactMenuOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [contactMenuOpen])

  function handleNavClick(target: string) {
    setMobileMenuOpen(false)
    scrollToSection(target)
  }

  const { theme } = useTheme()

  const cardNavGroups: CardNavGroup[] = useMemo(() => {
    const isDark = theme === 'dark'
    return [
      {
        label: 'Navegar',
        bgColor: isDark ? '#171717' : '#f5f5f4',
        textColor: isDark ? '#f5f5f4' : '#171717',
        links: NAV_ITEMS.map((item) => ({
          label: item.label,
          ariaLabel: `Ir para ${item.label}`,
          onClick: () => handleNavClick(item.target),
        })),
      },
      {
        label: 'Fale comigo',
        bgColor: isDark ? '#78350f' : '#fef3c7',
        textColor: isDark ? '#fde68a' : '#78350f',
        links: CONTACT_OPTIONS.map((option) => ({
          label: option.label,
          ariaLabel: option.label,
          href: option.href,
          external: option.external,
          onClick: () => setMobileMenuOpen(false),
        })),
      },
    ]
  }, [theme])

  // Só fica sem fundo (direto sobre o Hero) no topo da página. O fundo do
  // Hero ali é sempre uma foto (carrossel), mesmo no tema claro do projeto —
  // texto/ícones cinza ficam ilegíveis em cima de foto variável, então o
  // texto do Header continua claro fixo em todo estado sticky (topo e
  // rolado), independente do tema do site — igual já era antes.
  const overPhoto = sticky && !scrolled

  // Mesma regra de cor do texto que essa logo substitui: sticky é sempre
  // claro (texto do Header fixo em branco em cima da foto/glass do Hero);
  // fora do sticky (ex: página de Login) segue o tema do site.
  const logoSrc = `${baseUrl}img/${sticky || theme === 'dark' ? 'Logo_branco' : 'Logo_preto'}_tight.png`

  const headerClassName = [
    'flex w-full flex-row items-center justify-between gap-4 font-sans text-sm',
    sticky
      ? 'fixed inset-x-0 top-0 z-50 text-white transition-[background-color,padding,box-shadow] duration-300'
      : 'relative',
    overPhoto ? 'bg-transparent px-6 py-2' : '',
    sticky && !overPhoto ? 'bg-black/50 px-6 py-2 shadow-sm shadow-black/20 backdrop-blur-md' : '',
    !sticky ? 'px-6 py-2 text-neutral-900 dark:text-neutral-50' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const navClassName = `font-sans text-sm font-medium ${
    sticky ? 'text-neutral-300' : 'text-neutral-600 dark:text-neutral-400'
  } ${CURSOR_FILL_CLASSNAME}`

  const iconButtonClassName =
    sticky
      ? 'flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10'
      : 'flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800'

  // Pílula sólida em âmbar (mesmo acento de CTA usado no Hero/Projetos) em
  // vez de só contorno — mais destaque que o resto do header. Hover usa o
  // mesmo mecanismo de preenchimento que nasce do ponto exato onde o mouse
  // entrou (CURSOR_FILL_CONTAINED_CLASSNAME) que a nav usa, só que contido
  // dentro da própria pílula em vez de crescer além dela.
  const ctaClassName = `flex items-center gap-1.5 rounded-full bg-amber-500 px-5 py-2 font-semibold uppercase tracking-wide text-neutral-900 shadow-sm shadow-amber-500/30 dark:bg-amber-400 dark:shadow-amber-400/20 ${CURSOR_FILL_CONTAINED_CLASSNAME}`

  const menuItemClassName =
    'flex items-center gap-3 px-4 py-3 font-sans text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800'

  return (
    <motion.header
      initial={sticky ? { opacity: 0, y: -16 } : false}
      animate={sticky ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, ease: 'easeOut', delay: STICKY_INTRO_DELAY_S }}
      className={headerClassName}
    >
      {/* Logo/wordmark — leva ao topo da página, nunca por href="#..." (ver nota acima). Segunda
          imagem (sempre a versão preta) sobreposta e cortada via clip-path: escondida abaixo da
          borda inferior em repouso, "sobe" cobrindo a logo original no hover — como um líquido
          preenchendo de baixo pra cima até virar a logo preta por completo. */}
      <button type="button" onClick={scrollToTop} className="group relative shrink-0">
        <img src={logoSrc} alt="Jalbert Ramon" className="h-9 w-auto sm:h-14" />
        <img
          src={`${baseUrl}img/Logo_preto_tight.png`}
          aria-hidden
          className="pointer-events-none absolute inset-0 h-9 w-auto [clip-path:inset(100%_0_0_0)] transition-[clip-path] duration-700 ease-out group-hover:[clip-path:inset(0%_0_0_0)] group-focus-visible:[clip-path:inset(0%_0_0_0)] sm:h-14"
        />
      </button>

      <nav className="hidden items-center gap-5 lg:flex lg:pl-32">
        {NAV_ITEMS.map((item) => (
          <button key={item.target} type="button" onClick={() => scrollToSection(item.target)} className={navClassName}>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-4 md:gap-6">
        <ThemeToggle sticky={sticky} />

        {/* "Fale comigo" (desktop): consolida e-mail/WhatsApp/GitHub/LinkedIn
            num popover só, em vez de espalhar os três soltos pelo header. */}
        <div ref={contactMenuRef} className="relative hidden lg:block">
          <button
            type="button"
            onClick={() => setContactMenuOpen((open) => !open)}
            aria-expanded={contactMenuOpen}
            className={ctaClassName}
          >
            Fale comigo
            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${contactMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {contactMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.18, ease: [0.33, 1, 0.68, 1] }}
                className="absolute right-0 top-full z-50 mt-2 w-60 overflow-hidden rounded-2xl border border-neutral-200 bg-white text-left shadow-xl dark:border-neutral-800 dark:bg-neutral-900"
              >
                {CONTACT_OPTIONS.map((option) => (
                  <a
                    key={option.label}
                    href={option.href}
                    target={option.external ? '_blank' : undefined}
                    rel={option.external ? 'noopener noreferrer' : undefined}
                    onClick={() => setContactMenuOpen(false)}
                    className={menuItemClassName}
                  >
                    <option.icon className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate normal-case tracking-normal">{option.label}</span>
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Menu hambúrguer: some a partir de lg, onde a nav horizontal assume. */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={mobileMenuOpen}
          className={`${iconButtonClassName} lg:hidden`}
        >
          {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      <div
        className={`absolute left-0 right-0 top-full overflow-hidden lg:hidden ${
          sticky ? 'bg-black/80 backdrop-blur-md' : 'bg-white dark:bg-neutral-900'
        }`}
      >
        <CardNav isOpen={mobileMenuOpen} cards={cardNavGroups} />
      </div>
    </motion.header>
  )
}

export default Header
