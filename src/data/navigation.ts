import type { ComponentType } from 'react'
import { Briefcase, Code2, FolderKanban, Mail, User } from 'lucide-react'

export interface NavItem {
  label: string
  target: string
  icon: ComponentType<{ className?: string }>
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Sobre', target: 'sobre', icon: User },
  { label: 'Competências', target: 'competencias', icon: Code2 },
  { label: 'Experiência', target: 'experiencia', icon: Briefcase },
  { label: 'Projetos', target: 'projetos', icon: FolderKanban },
  { label: 'Contato', target: 'contato', icon: Mail },
]

export function scrollToSection(target: string) {
  document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
