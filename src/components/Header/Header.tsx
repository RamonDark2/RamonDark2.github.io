import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Github, Linkedin, Mail, Menu, MessageCircle, X } from 'lucide-react'
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

function scrollToSection(target: string) {
  document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [contactMenuOpen, setContactMenuOpen] = useState(false)
  const [contactAccordionOpen, setContactAccordionOpen] = useState(false)
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

  // Só fica sem fundo (direto sobre a foto do Hero) no topo da página. O
  // texto do Header fica sempre claro quando sticky — tanto no topo (sobre a
  // foto) quanto rolado (o glass é preto de propósito, não branco, então
  // precisa do mesmo texto claro, independente do tema do site).
  const overPhoto = sticky && !scrolled

  const headerClassName = [
    'flex w-full flex-row items-center justify-between gap-4 font-sans text-sm',
    sticky
      ? 'fixed inset-x-0 top-0 z-50 text-white transition-[background-color,padding,box-shadow] duration-300'
      : 'relative',
    overPhoto ? 'bg-transparent px-6 py-6' : '',
    sticky && !overPhoto ? 'bg-black/50 px-6 py-3 shadow-sm shadow-black/20 backdrop-blur-md' : '',
    !sticky ? 'px-6 py-6 text-neutral-900 dark:text-neutral-50' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const navClassName = `font-sans text-sm font-medium ${
    sticky ? 'text-neutral-300' : 'text-neutral-600 dark:text-neutral-400'
  } ${CURSOR_FILL_CLASSNAME}`

  const iconButtonClassName = sticky
    ? 'flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10'
    : 'flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800'

  const ctaClassName =
    'flex items-center gap-1.5 rounded-full border border-current px-5 py-2 font-semibold uppercase tracking-wide transition-colors hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-900'

  const menuItemClassName =
    'flex items-center gap-3 px-4 py-3 font-sans text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800'

  return (
    <motion.header
      initial={sticky ? { opacity: 0, y: -16 } : false}
      animate={sticky ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, ease: 'easeOut', delay: STICKY_INTRO_DELAY_S }}
      className={headerClassName}
    >
      {/* Logo/wordmark — leva ao topo da página, nunca por href="#..." (ver nota acima). */}
      <button
        type="button"
        onClick={scrollToTop}
        className="font-heading text-lg font-bold tracking-tight transition-opacity hover:opacity-80"
      >
        Jalbert Ramon
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

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`absolute left-0 right-0 top-full flex flex-col gap-1 p-3 lg:hidden ${
              sticky
                ? 'bg-black/80 backdrop-blur-md'
                : 'border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900'
            }`}
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.target}
                type="button"
                onClick={() => handleNavClick(item.target)}
                className={`w-full rounded-lg px-4 py-3 text-center font-sans text-sm font-medium transition-colors ${
                  sticky
                    ? 'text-neutral-200 hover:bg-white/10 hover:text-white'
                    : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* "Fale comigo" (mobile): sanfona inline com as opções de contato,
                em vez de um popover flutuante dentro de outro painel. */}
            <button
              type="button"
              onClick={() => setContactAccordionOpen((open) => !open)}
              aria-expanded={contactAccordionOpen}
              className={`mx-4 mt-2 justify-center ${ctaClassName}`}
            >
              Fale comigo
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${contactAccordionOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <AnimatePresence>
              {contactAccordionOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="mx-4 mt-2 overflow-hidden rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900"
                >
                  {CONTACT_OPTIONS.map((option) => (
                    <a
                      key={option.label}
                      href={option.href}
                      target={option.external ? '_blank' : undefined}
                      rel={option.external ? 'noopener noreferrer' : undefined}
                      onClick={() => {
                        setContactAccordionOpen(false)
                        setMobileMenuOpen(false)
                      }}
                      className={menuItemClassName}
                    >
                      <option.icon className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{option.label}</span>
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Header
