import { describe, expect, it, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { ThemeProvider } from '../../contexts/ThemeContext'
import ThemeToggle from './ThemeToggle'

function renderToggle() {
  return render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>
  )
}

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
  })

  afterEach(() => {
    cleanup()
  })

  it('shows a button to switch to dark mode when theme is light', () => {
    renderToggle()
    expect(screen.getByRole('button', { name: 'Ativar tema escuro' })).toBeInTheDocument()
  })

  it('switches label after being clicked', () => {
    renderToggle()
    fireEvent.click(screen.getByRole('button', { name: 'Ativar tema escuro' }))
    expect(screen.getByRole('button', { name: 'Ativar tema claro' })).toBeInTheDocument()
  })
})
