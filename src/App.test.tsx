import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { ThemeProvider } from './contexts/ThemeContext'
import App from './App'

function renderAppAt(hash: string) {
  window.location.hash = hash
  return render(
    <ThemeProvider>
      <App />
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

describe('App routing', () => {
  it('renders the résumé page on the default route', async () => {
    renderAppAt('')
    await waitFor(() => {
      expect(screen.getByText('RAMON')).toBeInTheDocument()
    })
  })

  it('no longer has a /landing-page route (falls back to 404)', async () => {
    renderAppAt('#/landing-page')
    await waitFor(() => {
      expect(screen.getByText('Página não encontrada')).toBeInTheDocument()
    })
  })
})
