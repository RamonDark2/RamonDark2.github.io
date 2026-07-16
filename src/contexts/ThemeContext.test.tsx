import { describe, expect, it, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { ThemeProvider, useTheme } from './ThemeContext'

function ThemeProbe() {
  const { theme, toggleTheme } = useTheme()
  return (
    <div>
      <span data-testid="theme-value">{theme}</span>
      <button onClick={toggleTheme}>alternar</button>
    </div>
  )
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
  })

  afterEach(() => {
    cleanup()
  })

  it('defaults to light theme when nothing is stored', () => {
    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>
    )
    expect(screen.getByTestId('theme-value')).toHaveTextContent('light')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('reads a previously stored dark theme on init', () => {
    localStorage.setItem('theme', 'dark')
    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>
    )
    expect(screen.getByTestId('theme-value')).toHaveTextContent('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('toggles the theme and persists it to localStorage', () => {
    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>
    )
    fireEvent.click(screen.getByText('alternar'))
    expect(screen.getByTestId('theme-value')).toHaveTextContent('dark')
    expect(localStorage.getItem('theme')).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })
})
