import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import ExperienceSection from './ExperienceSection'
import { experience } from './data'

describe('ExperienceSection', () => {
  it('renders the section heading', () => {
    render(<ExperienceSection />)
    expect(screen.getByRole('heading', { name: 'Experiência Profissional' })).toBeInTheDocument()
  })

  it('renders the company name, role and every highlight', () => {
    render(<ExperienceSection />)
    const [item] = experience
    expect(screen.getByText(item.company)).toBeInTheDocument()
    expect(screen.getByText(item.role)).toBeInTheDocument()
    item.highlights.forEach((highlight) => {
      expect(screen.getByText(highlight)).toBeInTheDocument()
    })
  })
})
