import type { ComponentType, CSSProperties } from 'react'
import {
  Briefcase,
  Building2,
  Cloud,
  Code2,
  CreditCard,
  GraduationCap,
  Heart,
  Landmark,
  Layers,
  Mic,
  Network,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  User,
  UserCircle,
  Users,
} from 'lucide-react'
import {
  SiCss3,
  SiDocker,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVuedotjs,
} from 'react-icons/si'

const baseUrl = import.meta.env.BASE_URL

export const GITHUB_USERNAME = 'Ramonrrc'

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

// Ícone de marca (ou genérico, quando não há logo próprio) com a cor real —
// usado tanto no stack técnico dos projetos quanto no da experiência.
export interface TechBadge {
  name: string
  icon: ComponentType<{ className?: string; style?: CSSProperties }>
  color: string
}

export interface ExperienceItem {
  company: string
  role: string
  location: string
  period: string
  summary: string
  highlights: string[]
  icon: ComponentType<{ className?: string; style?: CSSProperties }>
  techStack?: TechBadge[]
}

export const experience: ExperienceItem[] = [
  {
    company: 'Prodater – Soluções em Tecnologia da Informação',
    role: 'Desenvolvedor Frontend',
    location: 'Teresina – PI',
    period: '2 anos',
    summary:
      'Atuação no desenvolvimento de sistemas web para a Prefeitura de Teresina e projetos internos de gestão administrativa.',
    icon: Building2,
    techStack: [
      { name: 'React', icon: SiReact, color: '#61DAFB' },
      { name: 'Vue.js', icon: SiVuedotjs, color: '#4FC08D' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#38BDF8' },
      { name: 'APIs REST', icon: Network, color: '#6366F1' },
    ],
    highlights: [
      'Desenvolvimento de aplicações web com React e Vue.js, TypeScript e Tailwind CSS',
      'Criação de interfaces responsivas e acessíveis',
      'Implementação de dashboards administrativos para análise de dados',
      'Controle de usuários, permissões e integração com APIs REST',
      'Code reviews',
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
  // Mockup em iPhone 14 Pro Max — usado no lugar do notebook quando o "Ver ao
  // vivo" abre em telas de celular, ocupando quase a tela inteira.
  mobileImage?: string
  // Notebook solo (sem o celular ao lado) — usado só na visualização "ao
  // vivo" ampliada em telas de desktop; o card pequeno continua mostrando o
  // combo notebook+celular em `image`.
  liveImage?: string
  stack?: TechBadge[]
}

// Stack real dos sistemas feitos para a Prefeitura de Teresina (Emprega
// Teresina, Certificado Escolar Digital, Orçamento Popular): Vue.js + Node.js
// no backend, TypeScript e Tailwind CSS.
const prefeituraStack: TechBadge[] = [
  { name: 'Vue.js', icon: SiVuedotjs, color: '#4FC08D' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#5FA04E' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#38BDF8' },
]

export const projects: Project[] = [
  {
    name: 'Emprega Teresina',
    description:
      'Plataforma para cadastro de empresas (CNPJ/MEI) e cidadãos, divulgação de vagas de emprego e produtos, com painel administrativo para análise de usuários ativos e encaminhamentos para vagas.',
    icon: Briefcase,
    tag: 'Prefeitura de Teresina',
    url: 'https://emprega.teresina.pi.gov.br/',
    image: `${baseUrl}img/Emprega-teresina.png`,
    mobileImage: `${baseUrl}img/iPhone-14-PRO-MAX-emprega.teresina.pi.gov.br.webp`,
    liveImage: `${baseUrl}img/Macbook-Air-emprega.teresina.pi.gov.br.png`,
    stack: prefeituraStack,
  },
  {
    name: 'Casamento Design',
    description:
      'Template de site para casamentos, com contagem regressiva para o grande dia, galeria de fotos, guia de dress code, confirmação de presença (RSVP) e lista de presentes com integração via Pix.',
    icon: Heart,
    tag: 'Projeto pessoal',
    url: 'https://casamento-design.vercel.app/',
    image: `${baseUrl}img/Casamento-Design.png`,
    mobileImage: `${baseUrl}img/iPhone-14-PRO-MAX-casamento-design.vercel.app.webp`,
    liveImage: `${baseUrl}img/Macbook-Air-casamento-design.vercel.app.png`,
    stack: [
      { name: 'HTML', icon: SiHtml5, color: '#E34F26' },
      { name: 'CSS', icon: SiCss3, color: '#1572B6' },
      { name: 'JavaScript', icon: SiJavascript, color: '#D4A017' },
    ],
  },
  {
    name: 'Certificado Escolar Digital',
    description:
      'Sistema oficial para emissão e download de certificados de conclusão e históricos escolares de alunos que concluíram o Ensino Médio nos últimos 4 anos.',
    icon: GraduationCap,
    tag: 'Prefeitura de Teresina',
    url: 'https://ced.teresina.pi.gov.br/sobre',
    image: `${baseUrl}img/Certificado-digital.png`,
    mobileImage: `${baseUrl}img/iPhone-14-PRO-MAX-ced.teresina.pi.gov.br.webp`,
    liveImage: `${baseUrl}img/Macbook-Air-ced.teresina.pi.gov.br.png`,
    stack: prefeituraStack,
  },
  {
    name: 'Orçamento Popular',
    description:
      'Sistema de gestão interna para entidades de bairro, com cadastro e aprovação de entidades, vinculação de pessoas, controle de vigência, agendamento de assembleias, envio de atas e votações.',
    icon: Landmark,
    tag: 'Prefeitura de Teresina',
    url: 'https://op.teresina.pi.gov.br/sobre',
    image: `${baseUrl}img/Orcamento-popular.png`,
    mobileImage: `${baseUrl}img/iPhone-14-PRO-MAX-op.teresina.pi.gov.br.webp`,
    liveImage: `${baseUrl}img/Macbook-Air-op.teresina.pi.gov.br.png`,
    stack: prefeituraStack,
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
  icon: ComponentType<{ className?: string; style?: CSSProperties }>
  // Tags curtas de competência (ícone genérico, não logo de marca — por isso
  // sem `color`, herdam a cor do tema como os demais ícones da seção).
  competencies?: { label: string; icon: ComponentType<{ className?: string }> }[]
  image: string
  imageCaption: string
  // Screenshot plano (sem moldura de aparelho) usado em telas de celular no
  // lugar do notebook — troca só de imagem via <picture>, sem live embed: ver
  // nota abaixo.
  mobileImage?: string
  // A Nuvemshop/Tiendanube bloqueia embed vivo via CSP `frame-ancestors`
  // (só permite framing a partir do próprio domínio da plataforma) — por
  // isso aqui é só um link externo, sem LiveMockup, diferente dos projetos
  // próprios em ProjectsSection.
  url?: string
}

export const ecommerceExperience: ComplementaryExperience = {
  title: 'Desenvolvimento Frontend para E-commerces',
  role: 'Desenvolvedor Frontend Freelancer',
  url: 'https://prolimgel.lojavirtualnuvem.com.br/',
  summary:
    'Atuação em projetos de desenvolvimento, personalização e manutenção de interfaces para lojas virtuais.',
  icon: ShoppingCart,
  competencies: [
    { label: 'Checkout', icon: CreditCard },
    { label: 'Responsivo', icon: Smartphone },
    { label: 'UX', icon: UserCircle },
    { label: 'E-commerce', icon: ShoppingBag },
  ],
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
  // Screenshot plano do site real (sem moldura de celular) — pedido explícito
  // do usuário no lugar do mockup de iPhone usado antes.
  mobileImage: `${baseUrl}img/Prolimgel.png`,
  imageCaption: 'Prolimgel — loja virtual',
}

export interface Talk {
  title: string
  description: string
  url: string
  mockupImage: string
  // Selo de contexto logo abaixo da descrição (ícone + rótulo curto).
  tags: { label: string; icon: ComponentType<{ className?: string }> }[]
  // "Tópicos abordados" — recorte direto da própria description acima, não
  // é conteúdo novo inventado.
  topics: string[]
  photos: { src: string; label: string; icon: ComponentType<{ className?: string }> }[]
}

export const talk: Talk = {
  title: 'Desenvolvimento Mobile Multiplataforma',
  description:
    'Experiência no compartilhamento de conhecimento técnico, incluindo a apresentação de palestra sobre desenvolvimento mobile, abordando tecnologias multiplataforma, arquitetura, integração com APIs e boas práticas para criação de aplicativos.',
  url: 'https://apresenta-o-react-native.vercel.app/',
  mockupImage: `${baseUrl}img/Macbook-Air-apresenta-o-react-native.vercel.app.png`,
  tags: [
    { label: 'Palestra técnica', icon: User },
    { label: 'Mobile', icon: Smartphone },
    { label: 'Multiplataforma', icon: Layers },
  ],
  topics: [
    'Tecnologias multiplataforma',
    'Arquitetura de aplicativos',
    'Integração com APIs',
    'Boas práticas de desenvolvimento',
  ],
  photos: [
    { src: `${baseUrl}img/Apresentacao1.jpeg`, label: 'Apresentação', icon: Mic },
    { src: `${baseUrl}img/Apresentacao2.jpeg`, label: 'Demonstração prática', icon: Code2 },
    { src: `${baseUrl}img/Apresentacao3.jpeg`, label: 'Momento com a turma', icon: Users },
  ],
}
