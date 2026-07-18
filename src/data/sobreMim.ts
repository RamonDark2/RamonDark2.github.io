import type { LucideIcon } from 'lucide-react'
import {
  Atom,
  Braces,
  Briefcase,
  Cloud,
  Component,
  Container,
  Database,
  GitBranch,
  GraduationCap,
  Heart,
  Hexagon,
  Landmark,
  Layers,
  Network,
  Server,
  Smartphone,
  Triangle,
  Zap,
} from 'lucide-react'

const baseUrl = import.meta.env.BASE_URL

export const GITHUB_USERNAME = 'RamonDark2'

export interface Skill {
  category: 'Frontend' | 'Backend' | 'Infraestrutura & Práticas'
  name: string
  icon: LucideIcon
}

export const skills: Skill[] = [
  { category: 'Frontend', name: 'React', icon: Atom },
  { category: 'Frontend', name: 'Vue.js', icon: Component },
  { category: 'Frontend', name: 'Next.js', icon: Triangle },
  { category: 'Frontend', name: 'React Native + TypeScript', icon: Smartphone },
  { category: 'Frontend', name: 'TypeScript', icon: Braces },
  { category: 'Backend', name: 'Node.js', icon: Hexagon },
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
    role: 'Desenvolvedor Frontend',
    location: 'Teresina – PI',
    period: '2 anos',
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
  image?: string
}

export const projects: Project[] = [
  {
    name: 'Emprega Teresina',
    description:
      'Plataforma para cadastro de empresas (CNPJ/MEI) e cidadãos, divulgação de vagas de emprego e produtos, com painel administrativo para análise de usuários ativos e encaminhamentos para vagas.',
    icon: Briefcase,
    tag: null,
    url: 'https://emprega.teresina.pi.gov.br/',
    image: `${baseUrl}img/Macbook-Air-emprega.teresina.pi.gov.br.png`,
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
  {
    name: 'Casamento Design',
    description:
      'Template de site para casamentos, com contagem regressiva para o grande dia, galeria de fotos, guia de dress code, confirmação de presença (RSVP) e lista de presentes com integração via Pix.',
    icon: Heart,
    tag: 'Projeto pessoal',
    url: 'https://casamento-design.vercel.app/',
    image: `${baseUrl}img/Macbook-Air-casamento-design.vercel.app.png`,
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
    'Desenvolvimento e personalização de páginas de e-commerce',
    'Implementação de layouts responsivos para dispositivos móveis e desktops',
    'Criação e adaptação de componentes visuais',
    'Ajustes em páginas de produtos, carrinho e etapas de compra',
    'Melhoria da usabilidade e da experiência do usuário',
    'Correção de problemas de layout e responsividade',
    'Implementação de interfaces com HTML, CSS, JavaScript e tecnologias modernas de frontend',
    'Adaptação de layouts conforme a identidade visual das marcas',
    'Integração de elementos visuais e componentes em plataformas de comércio eletrônico',
    'Manutenção e evolução de lojas virtuais existentes',
  ],
  image: `${baseUrl}img/Macbook-Air-prolimgel.lojavirtualnuvem.com.br.png`,
  imageCaption: 'Prolimgel — loja virtual',
}

export const ecommerceSkills: string[] = [
  'Desenvolvimento frontend para e-commerces',
  'Personalização de lojas virtuais',
  'Interfaces responsivas',
  'Experiência do usuário aplicada a lojas online',
  'Páginas de produtos',
  'Carrinho de compras',
  'Fluxos de checkout',
  'Manutenção de interfaces',
  'Adaptação de identidade visual',
  'Correção de problemas de layout',
  'Otimização da navegação em dispositivos móveis',
]

export interface Talk {
  title: string
  description: string
  url: string
  linkLabel: string
  mockupImage: string
  photos: string[]
}

export const talk: Talk = {
  title: 'Palestra: Desenvolvimento Mobile Multiplataforma',
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
