import type { ComponentType, CSSProperties } from 'react'
import { Briefcase, Cloud, GraduationCap, Heart, Landmark, Network } from 'lucide-react'
import {
  SiDocker,
  SiGit,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiTypescript,
  SiVuedotjs,
} from 'react-icons/si'

const baseUrl = import.meta.env.BASE_URL

export const GITHUB_USERNAME = 'RamonDark2'

export interface Skill {
  category: 'Frontend' | 'Backend' | 'Infraestrutura & Práticas'
  name: string
  // Logos reais de marca via react-icons/si (Simple Icons) quando existem;
  // lucide-react só para as duas entradas sem logo próprio (Infraestrutura,
  // REST APIs) — ambos os tipos aceitam `className`, então convivem aqui.
  icon: ComponentType<{ className?: string; style?: CSSProperties }>
  // Cor oficial de cada marca (aplicada via inline style, currentColor não
  // serve aqui pois cada logo tem sua própria cor, não a do tema). As duas
  // entradas sem marca própria (Infraestrutura, REST APIs) usam um tom
  // neutro só pra não ficarem em cinza puro no meio das cores reais.
  color: string
}

export const skills: Skill[] = [
  { category: 'Frontend', name: 'React', icon: SiReact, color: '#61DAFB' },
  { category: 'Frontend', name: 'Vue.js', icon: SiVuedotjs, color: '#4FC08D' },
  { category: 'Frontend', name: 'Next.js', icon: SiNextdotjs, color: '#A9A9A9' },
  { category: 'Frontend', name: 'React Native + TypeScript', icon: SiReact, color: '#61DAFB' },
  { category: 'Frontend', name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { category: 'Backend', name: 'Node.js', icon: SiNodedotjs, color: '#5FA04E' },
  { category: 'Backend', name: 'NestJS', icon: SiNestjs, color: '#E0234E' },
  { category: 'Backend', name: 'Python / FastAPI', icon: SiPython, color: '#3776AB' },
  { category: 'Backend', name: 'ORM / Prisma', icon: SiPrisma, color: '#16A394' },
  { category: 'Backend', name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
  { category: 'Infraestrutura & Práticas', name: 'Docker', icon: SiDocker, color: '#2496ED' },
  { category: 'Infraestrutura & Práticas', name: 'Infraestrutura', icon: Cloud, color: '#0EA5E9' },
  { category: 'Infraestrutura & Práticas', name: 'REST APIs', icon: Network, color: '#6366F1' },
  { category: 'Infraestrutura & Práticas', name: 'Git', icon: SiGit, color: '#F05032' },
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
    role: 'Desenvolvedor Frontend',
    location: 'Teresina – PI',
    period: '2 anos',
    summary:
      'Atuação no desenvolvimento de sistemas web para a Prefeitura de Teresina e projetos internos de gestão administrativa.',
    highlights: [
      'Desenvolvimento de aplicações web com React e Vue.js, TypeScript e Tailwind CSS',
      'Criação de interfaces responsivas e acessíveis',
      'Implementação de dashboards administrativos para análise de dados',
      'Controle de usuários, permissões e integração com APIs REST',
    ],
  },
]

export interface Project {
  name: string
  description: string
  icon: ComponentType<{ className?: string; style?: CSSProperties }>
  tag: string | null
  url: string | null
  image?: string
}

export const projects: Project[] = [
  {
    name: 'Emprega Teresina',
    description:
      'Plataforma para cadastro de empresas (CNPJ/MEI) e cidadãos, divulgação de vagas de emprego e produtos, com painel administrativo para análise de usuários ativos e encaminhamentos para vagas.',
    icon: Briefcase,
    tag: 'Prefeitura de Teresina',
    url: 'https://emprega.teresina.pi.gov.br/',
    image: `${baseUrl}img/Macbook-Air-emprega.teresina.pi.gov.br.png`,
  },
  {
    name: 'Casamento Design',
    description:
      'Template de site para casamentos, com contagem regressiva para o grande dia, galeria de fotos, guia de dress code, confirmação de presença (RSVP) e lista de presentes com integração via Pix.',
    icon: Heart,
    tag: 'Projeto pessoal',
    url: 'https://casamento-design.vercel.app/',
    image: `${baseUrl}img/Macbook-Air-casamento-design.vercel.app.png`,
  },
  {
    name: 'Certificado Escolar Digital',
    description:
      'Sistema oficial para emissão e download de certificados de conclusão e históricos escolares de alunos que concluíram o Ensino Médio nos últimos 4 anos.',
    icon: GraduationCap,
    tag: 'Prefeitura de Teresina',
    url: 'https://ced.teresina.pi.gov.br/sobre',
    image: `${baseUrl}img/Macbook-Air-ced.teresina.pi.gov.br.png`,
  },
  {
    name: 'Orçamento Popular',
    description:
      'Sistema de gestão interna para entidades de bairro, com cadastro e aprovação de entidades, vinculação de pessoas, controle de vigência, agendamento de assembleias, envio de atas e votações.',
    icon: Landmark,
    tag: 'Prefeitura de Teresina',
    url: 'https://op.teresina.pi.gov.br/sobre',
    image: `${baseUrl}img/Macbook-Air-op.teresina.pi.gov.br.png`,
  },
]

export interface AboutContent {
  heading: string
  paragraphs: string[]
}

export const about: AboutContent = {
  heading: 'Desenvolvimento de aplicações completas, seguras e escaláveis',
  paragraphs: [
    'Desenvolvedor Full Stack com experiência de ponta a ponta — do frontend ao backend, banco de dados, autenticação e deploy.',
    'Atualmente na Prodater — Soluções em Tecnologia da Informação, desenvolvendo sistemas para a Prefeitura de Teresina e soluções internas de gestão administrativa, com dashboards, integração de APIs e controle de acesso.',
    'Participo ativamente de Code Review e sigo boas práticas de arquitetura, componentização e organização de interfaces.',
  ],
}

export interface ComplementaryExperience {
  title: string
  role: string
  summary: string
  highlights: string[]
  image: string
  imageCaption: string
}

export const ecommerceExperience: ComplementaryExperience = {
  title: 'Desenvolvimento Frontend para E-commerces',
  role: 'Desenvolvedor Frontend Freelancer',
  summary:
    'Atuação em projetos de desenvolvimento, personalização e manutenção de interfaces para lojas virtuais.',
  highlights: [
    'Personalização de lojas virtuais',
    'Interfaces responsivas para mobile e desktop',
    'Páginas de produto, carrinho e checkout',
    'Adaptação à identidade visual das marcas',
    'Melhoria de usabilidade e experiência do usuário',
    'Correção de problemas de layout',
    'Manutenção e evolução de lojas virtuais existentes',
  ],
  image: `${baseUrl}img/Macbook-Air-prolimgel.lojavirtualnuvem.com.br.png`,
  imageCaption: 'Prolimgel — loja virtual',
}

export interface Talk {
  title: string
  description: string
  url: string
  linkLabel: string
  mockupImage: string
  photos: string[]
}

export const talk: Talk = {
  title: 'Desenvolvimento Mobile Multiplataforma',
  description:
    'Experiência no compartilhamento de conhecimento técnico, incluindo a apresentação de palestra sobre desenvolvimento mobile, abordando tecnologias multiplataforma, arquitetura, integração com APIs e boas práticas para criação de aplicativos.',
  url: 'https://apresenta-o-react-native.vercel.app/',
  linkLabel: 'Ver apresentação',
  mockupImage: `${baseUrl}img/Macbook-Air-apresenta-o-react-native.vercel.app.png`,
  photos: [
    `${baseUrl}img/Apresentacao1.jpeg`,
    `${baseUrl}img/Apresentacao2.jpeg`,
    `${baseUrl}img/Apresentacao3.jpeg`,
  ],
}
