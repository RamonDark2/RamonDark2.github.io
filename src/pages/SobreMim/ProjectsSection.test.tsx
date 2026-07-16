import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProjectsSection from './ProjectsSection'
import { projects } from './data'

describe('ProjectsSection', () => {
  it('renders the section heading', () => {
    render(<ProjectsSection />)
    expect(screen.getByRole('heading', { name: 'Projetos Relevantes' })).toBeInTheDocument()
  })

  it('renders every project name and description', () => {
    render(<ProjectsSection />)
    projects.forEach((project) => {
      expect(screen.getByText(project.name)).toBeInTheDocument()
      expect(screen.getByText(project.description)).toBeInTheDocument()
    })
  })

  it('only renders a "Ver site" link for projects that have a URL', () => {
    render(<ProjectsSection />)
    const links = screen.getAllByRole('link', { name: 'Ver site' })
    const projectsWithUrl = projects.filter((project) => project.url !== null)
    expect(links).toHaveLength(projectsWithUrl.length)
  })
})
