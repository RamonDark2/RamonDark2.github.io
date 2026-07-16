import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from './footer'

describe('Footer', () => {
  it('renders the copyright notice with the current year', () => {
    render(<Footer />)
    const year = new Date().getFullYear()
    expect(screen.getByText(`© ${year} Ramon Rodrigues`)).toBeInTheDocument()
  })

  it('renders WhatsApp, GitHub and LinkedIn links', () => {
    render(<Footer />)
    expect(screen.getByLabelText('WhatsApp')).toHaveAttribute('href', 'https://wa.me/86994258329')
    expect(screen.getByLabelText('GitHub')).toHaveAttribute('href', 'https://github.com/RamonDark2')
    expect(screen.getByLabelText('LinkedIn')).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/ramon-rodrigues-48459721b/'
    )
  })
})
