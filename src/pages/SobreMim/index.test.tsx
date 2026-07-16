import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '../../contexts/ThemeContext'
import SobreMim from './index'

beforeEach(() => {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ public_repos: 12, followers: 34 }),
    })
  )
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('SobreMim page', () => {
  it('renders every section of the résumé', () => {
    render(
      <ThemeProvider>
        <SobreMim />
      </ThemeProvider>
    )

    expect(screen.getByText('RAMON')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Competências Técnicas' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Experiência Profissional' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Projetos Relevantes' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Vamos trabalhar juntos?' })).toBeInTheDocument()
  })
})
