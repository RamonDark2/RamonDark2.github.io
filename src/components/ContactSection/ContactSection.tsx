import { Github, Linkedin, Mail, MessageCircle } from 'lucide-react'
import { CURSOR_FILL_LIGHT_CLASSNAME } from '../../styles/cursorFill'

const EMAIL = 'jalbertramon1@gmail.com'
const GITHUB_URL = 'https://github.com/RamonDark2'
const LINKEDIN_URL = 'https://www.linkedin.com/in/ramon-rodrigues-48459721b/'
const WHATSAPP_URL = 'https://wa.me/86994258329'
const WHATSAPP_MESSAGE = 'Olá, Ramon qual o melhor horário para contato?'

function ContactSection() {
  return (
    <section className="bg-neutral-900 px-6 py-24 text-white dark:bg-black">
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <h2 className="font-heading text-4xl font-bold sm:text-5xl">Vamos trabalhar juntos?</h2>
        <p className="mt-4 font-sans text-neutral-300">
          Estou disponível para novos projetos e oportunidades
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href={`mailto:${EMAIL}`}
            className="flex items-center gap-3 rounded-xl bg-white px-6 py-3 font-sans font-semibold text-neutral-900 transition-transform hover:-translate-y-0.5"
          >
            <Mail className="h-5 w-5" />
            {EMAIL}
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-3 rounded-xl border border-white px-6 py-3 font-sans font-semibold transition-[transform,color] hover:-translate-y-0.5 hover:text-neutral-900 ${CURSOR_FILL_LIGHT_CLASSNAME}`}
          >
            <Github className="h-5 w-5" />
            GitHub
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-3 rounded-xl border border-white px-6 py-3 font-sans font-semibold transition-[transform,color] hover:-translate-y-0.5 hover:text-neutral-900 ${CURSOR_FILL_LIGHT_CLASSNAME}`}
          >
            <Linkedin className="h-5 w-5" />
            LinkedIn
          </a>
          <a
            href={`${WHATSAPP_URL}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-3 rounded-xl border border-white px-6 py-3 font-sans font-semibold transition-[transform,color] hover:-translate-y-0.5 hover:text-neutral-900 ${CURSOR_FILL_LIGHT_CLASSNAME}`}
          >
            <MessageCircle className="h-5 w-5" />
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
