import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import SkillsSection from './SkillsSection'
import { skills } from './data'

describe('SkillsSection', () => {
  it('renders the section heading', () => {
    render(<SkillsSection />)
    expect(screen.getByRole('heading', { name: 'Competências Técnicas' })).toBeInTheDocument()
  })

  it('renders every skill name from the data file', () => {
    render(<SkillsSection />)
    skills.forEach((skill) => {
      expect(screen.getByText(skill.name)).toBeInTheDocument()
    })
  })

  it('renders the three category headings', () => {
    render(<SkillsSection />)
    expect(screen.getByText('Frontend')).toBeInTheDocument()
    expect(screen.getByText('Backend')).toBeInTheDocument()
    expect(screen.getByText('Infraestrutura & Práticas')).toBeInTheDocument()
  })
})
