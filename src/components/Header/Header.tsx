import { Github, Linkedin } from 'lucide-react'
import ThemeToggle from '../ThemeToggle/ThemeToggle'

const EMAIL = 'jalbertramon1@gmail.com'
const GITHUB_URL = 'https://github.com/RamonDark2'
const LINKEDIN_URL = 'https://www.linkedin.com/in/ramon-rodrigues-48459721b/'

function Header() {
  return (
    <header className="flex w-full flex-col items-center gap-4 px-6 py-6 font-sans text-sm text-neutral-900 dark:text-neutral-50 md:flex-row md:justify-between">
      <a
        href={`mailto:${EMAIL}`}
        className="rounded-full border border-current px-5 py-2 font-semibold uppercase tracking-wide transition-colors hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-900"
      >
        Fale comigo
      </a>

      <div className="flex items-center gap-6">
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-semibold hover:opacity-70"
        >
          <Github className="h-4 w-4" />
          GitHub
        </a>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-semibold hover:opacity-70"
        >
          <Linkedin className="h-4 w-4" />
          LinkedIn
        </a>
        <ThemeToggle />
      </div>
    </header>
  )
}

export default Header