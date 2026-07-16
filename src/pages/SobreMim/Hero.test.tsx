import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { ThemeProvider } from '../../contexts/ThemeContext'
import Hero from './Hero'

function renderHero() {
  return render(
    <ThemeProvider>
      <Hero />
    </ThemeProvider>
  )
}

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

describe('Hero', () => {
  it('renders the name split across two headings', () => {
    renderHero()
    expect(screen.getByText('RAMON')).toBeInTheDocument()
    expect(screen.getByText('RODRIGUES')).toBeInTheDocument()
  })

  it('renders the local avatar photo with an accessible name', () => {
    renderHero()
    const avatar = screen.getByAltText('Ramon Rodrigues') as HTMLImageElement
    expect(avatar.src).toContain('img/FotoPerfil_Linkedin.png')
  })

  it('renders both corner bio texts', () => {
    renderHero()
    expect(screen.getByText(/atualmente na Prodater/)).toBeInTheDocument()
    expect(screen.getByText(/Focado em construir aplicações completas/)).toBeInTheDocument()
  })

  it('renders live GitHub stats once the API call resolves', async () => {
    renderHero()
    await waitFor(() => {
      expect(
        screen.getByText('12 repositórios públicos · 34 seguidores no GitHub')
      ).toBeInTheDocument()
    })
  })
})
