import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { GoArrowUpRight } from 'react-icons/go'
import './CardNav.css'

export interface CardNavLink {
  label: string
  ariaLabel: string
  // Link externo/real (renderiza <a>). Sem `href`, renderiza <button> com
  // `onClick` — usado pra navegação interna por scroll (nunca href="#...",
  // ver Global Constraints).
  href?: string
  onClick?: () => void
  external?: boolean
}

export interface CardNavGroup {
  label: string
  bgColor: string
  textColor: string
  links: CardNavLink[]
}

interface CardNavProps {
  isOpen: boolean
  cards: CardNavGroup[]
  ease?: string
}

const CONTENT_PADDING = 16

// Painel expansível adaptado do CardNav do react-bits — só a musculatura de
// animação (altura do container por GSAP + stagger dos cards) e o visual
// dos "nav-card" foram reaproveitados. A barra própria do componente
// original (hambúrguer + logo + CTA) não existe aqui: quem abre/fecha é o
// hambúrguer que já existe em Header.tsx, via a prop `isOpen`.
function CardNav({ isOpen, cards, ease = 'power3.out' }: CardNavProps) {
  const navRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  const calculateHeight = () => {
    const contentEl = navRef.current?.querySelector<HTMLDivElement>('.card-nav-content')
    return contentEl ? contentEl.scrollHeight + CONTENT_PADDING : 0
  }

  const createTimeline = () => {
    const navEl = navRef.current
    if (!navEl) return null

    gsap.set(navEl, { height: 0, overflow: 'hidden' })
    gsap.set(cardsRef.current, { y: 50, opacity: 0 })

    const tl = gsap.timeline({ paused: true })
    tl.to(navEl, { height: calculateHeight, duration: 0.4, ease })
    tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, '-=0.1')
    return tl
  }

  useLayoutEffect(() => {
    const tl = createTimeline()
    tlRef.current = tl
    // Sem isso, trocar o tema enquanto o painel está aberto recria a
    // timeline do zero (fechada) mas não avisa `isOpen` — o painel some
    // visualmente enquanto o estado React ainda acha que está aberto.
    // Mesmo guard já usado no efeito de resize logo abaixo.
    if (isOpen) tl?.progress(1)
    return () => {
      tl?.kill()
      tlRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ease, cards])

  useLayoutEffect(() => {
    function handleResize() {
      if (!tlRef.current) return
      tlRef.current.kill()
      const newTl = createTimeline()
      if (!newTl) return
      tlRef.current = newTl
      if (isOpen) newTl.progress(1)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  useLayoutEffect(() => {
    const tl = tlRef.current
    if (!tl) return
    if (isOpen) {
      tl.play(0)
    } else {
      tl.reverse()
    }
  }, [isOpen])

  return (
    <div ref={navRef} className="card-nav">
      <div className="card-nav-content" aria-hidden={!isOpen} {...(!isOpen ? { inert: '' } : {})}>
        {cards.slice(0, 3).map((card, idx) => (
          <div
            key={card.label}
            className="nav-card"
            ref={(el) => {
              cardsRef.current[idx] = el
            }}
            style={{ backgroundColor: card.bgColor, color: card.textColor }}
          >
            <div className="nav-card-label">{card.label}</div>
            <div className="nav-card-links">
              {card.links.map((link) =>
                link.href ? (
                  <a
                    key={link.label}
                    className="nav-card-link"
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    aria-label={link.ariaLabel}
                    onClick={link.onClick}
                  >
                    <GoArrowUpRight className="nav-card-link-icon" aria-hidden="true" />
                    {link.label}
                  </a>
                ) : (
                  <button
                    key={link.label}
                    type="button"
                    className="nav-card-link"
                    onClick={link.onClick}
                    aria-label={link.ariaLabel}
                  >
                    <GoArrowUpRight className="nav-card-link-icon" aria-hidden="true" />
                    {link.label}
                  </button>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CardNav
