import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '../../contexts/ThemeContext'
import Header from './header'

function renderHeader() {
  return render(
    <ThemeProvider>
      <Header />
    </ThemeProvider>
  )
}

describe('Header', () => {
  it('renders a mailto link to contact the developer', () => {
    renderHeader()
    const contactLink = screen.getByRole('link', { name: 'Fale comigo' })
    expect(contactLink).toHaveAttribute('href', 'mailto:jalbertramon1@gmail.com')
  })

  it('renders GitHub and LinkedIn links pointing to the right profiles', () => {
    renderHeader()
    expect(screen.getByRole('link', { name: /GitHub/ })).toHaveAttribute(
      'href',
      'https://github.com/RamonDark2'
    )
    expect(screen.getByRole('link', { name: /LinkedIn/ })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/ramon-rodrigues-48459721b/'
    )
  })

  it('renders the theme toggle button', () => {
    renderHeader()
    expect(screen.getByRole('button', { name: 'Ativar tema escuro' })).toBeInTheDocument()
  })
})
