import type { LucideIcon } from 'lucide-react'
import {
  Atom,
  Braces,
  Briefcase,
  Cloud,
  Container,
  Database,
  GitBranch,
  GraduationCap,
  Landmark,
  Layers,
  Network,
  Server,
  Smartphone,
  Triangle,
  Zap,
} from 'lucide-react'

export const GITHUB_USERNAME = 'RamonDark2'

export interface Skill {
  category: 'Frontend' | 'Backend' | 'Infraestrutura & Práticas'
  name: string
  icon: LucideIcon
}

export const skills: Skill[] = [
  { category: 'Frontend', name: 'React', icon: Atom },
  { category: 'Frontend', name: 'Next.js', icon: Triangle },
  { category: 'Frontend', name: 'React Native + TypeScript', icon: Smartphone },
  { category: 'Frontend', name: 'TypeScript', icon: Braces },
  { category: 'Backend', name: 'NestJS', icon: Server },
  { category: 'Backend', name: 'Python / FastAPI', icon: Zap },
  { category: 'Backend', name: 'ORM / Prisma', icon: Layers },
  { category: 'Backend', name: 'PostgreSQL', icon: Database },
  { category: 'Infraestrutura & Práticas', name: 'Docker', icon: Container },
  { category: 'Infraestrutura & Práticas', name: 'Infraestrutura', icon: Cloud },
  { category: 'Infraestrutura & Práticas', name: 'REST APIs', icon: Network },
  { category: 'Infraestrutura & Práticas', name: 'Git', icon: GitBranch },
]

export interface ExperienceItem {
  company: string
  role: string
  location: string
  period: string
  summary: string
  highlights: string[]
}

export const experience: ExperienceItem[] = [
  {
    company: 'Prodater – Soluções em Tecnologia da Informação',
    role: 'Desenvolvedor Full Stack',
    location: 'Teresina – PI',
    period: 'Atual',
    summary:
      'Atuação no desenvolvimento de sistemas web para a Prefeitura de Teresina e projetos internos de gestão administrativa.',
    highlights: [
      'Experiência prática em desenvolvimento de aplicações web utilizando React, TypeScript, JavaScript e Tailwind CSS',
      'Desenvolvimento de aplicações web utilizando Vue.js, TypeScript, JavaScript e Tailwind CSS',
      'Criação de interfaces responsivas e acessíveis',
      'Implementação de dashboards administrativos para análise de dados',
      'Controle de usuários, permissões e vigência de vínculos',
      'Integração com APIs REST e sistemas internos',
    ],
  },
]

export interface Project {
  name: string
  description: string
  icon: LucideIcon
  tag: string | null
  url: string | null
}

export const projects: Project[] = [
  {
    name: 'Portal da Empregabilidade',
    description:
      'Plataforma para cadastro de empresas (CNPJ/MEI) e cidadãos, divulgação de vagas de emprego e produtos, com painel administrativo para análise de usuários ativos e encaminhamentos para vagas.',
    icon: Briefcase,
    tag: null,
    url: 'https://emprega.teresina.pi.gov.br/',
  },
  {
    name: 'Certificado Escolar Digital',
    description:
      'Sistema oficial para emissão e download de certificados de conclusão e históricos escolares de alunos que concluíram o Ensino Médio nos últimos 4 anos.',
    icon: GraduationCap,
    tag: 'Prefeitura de Teresina',
    url: 'https://ced.teresina.pi.gov.br/sobre',
  },
  {
    name: 'Orçamento Popular',
    description:
      'Sistema de gestão interna para entidades de bairro, com cadastro e aprovação de entidades, vinculação de pessoas, controle de vigência, agendamento de assembleias, envio de atas e votações.',
    icon: Landmark,
    tag: 'Em andamento',
    url: null,
  },
]
