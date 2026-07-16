import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import ContactSection from './ContactSection'

describe('ContactSection', () => {
  it('renders a mailto link, GitHub link and LinkedIn link', () => {
    render(<ContactSection />)
    expect(screen.getByRole('link', { name: /jalbertramon1@gmail.com/ })).toHaveAttribute(
      'href',
      'mailto:jalbertramon1@gmail.com'
    )
    expect(screen.getByRole('link', { name: /GitHub/ })).toHaveAttribute(
      'href',
      'https://github.com/RamonDark2'
    )
    expect(screen.getByRole('link', { name: /LinkedIn/ })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/ramon-rodrigues-48459721b/'
    )
  })
})
