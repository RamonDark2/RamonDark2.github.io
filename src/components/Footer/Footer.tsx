import { Github, Linkedin, MessageCircle } from 'lucide-react'

const WHATSAPP_URL = 'https://wa.me/86994258329'
const GITHUB_URL = 'https://github.com/RamonDark2'
const LINKEDIN_URL = 'https://www.linkedin.com/in/ramon-rodrigues-48459721b/'

function Footer() {
  return (
    <footer className="flex w-full flex-col items-center justify-between gap-4 border-t border-neutral-200 bg-white px-6 py-6 text-sm text-neutral-600 dark:border-neutral-800 dark:bg-[#0B0B0C] dark:text-neutral-400 sm:flex-row">
      <span>© {new Date().getFullYear()} Jalbert Ramon</span>
      <div className="flex items-center gap-4">
        <a target="_blank" rel="noopener noreferrer" href={WHATSAPP_URL} aria-label="WhatsApp">
          <MessageCircle className="h-5 w-5 hover:opacity-70" />
        </a>
        <a target="_blank" rel="noopener noreferrer" href={GITHUB_URL} aria-label="GitHub">
          <Github className="h-5 w-5 hover:opacity-70" />
        </a>
        <a target="_blank" rel="noopener noreferrer" href={LINKEDIN_URL} aria-label="LinkedIn">
          <Linkedin className="h-5 w-5 hover:opacity-70" />
        </a>
      </div>
    </footer>
  )
}

export default Footer
