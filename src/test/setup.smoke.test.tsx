import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

describe('test environment', () => {
  it('renders a DOM node and matches jest-dom matchers', () => {
    render(<div data-testid="smoke">ok</div>)
    expect(screen.getByTestId('smoke')).toBeInTheDocument()
  })
})
