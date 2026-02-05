import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'

vi.mock('next/link', () => ({
  default: ({ children, href }) => <a href={href}>{children}</a>,
}))

vi.mock('@next/font/google', () => ({
  Montserrat: () => ({ className: 'mock-montserrat-font' }),
}))

import Navbar from '../../components/Navbar'

describe('Navbar', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('should render all navigation links', () => {
    render(<Navbar />)

    expect(screen.getByText('HOME')).toBeInTheDocument()
    expect(screen.getByText('CINEMATOGRAPHY')).toBeInTheDocument()
    expect(screen.getByText('INFOGRAPHICS')).toBeInTheDocument()
    expect(screen.getByText('SIGN IN/OUT')).toBeInTheDocument()
  })

  it('should have correct href for HOME link', () => {
    render(<Navbar />)
    const homeLink = screen.getByText('HOME').closest('a')
    expect(homeLink).toHaveAttribute('href', '/')
  })

  it('should have correct href for CINEMATOGRAPHY link', () => {
    render(<Navbar />)
    const filmLink = screen.getByText('CINEMATOGRAPHY').closest('a')
    expect(filmLink).toHaveAttribute('href', '/filmography')
  })

  it('should have correct href for INFOGRAPHICS link', () => {
    render(<Navbar />)
    const infoLink = screen.getByText('INFOGRAPHICS').closest('a')
    expect(infoLink).toHaveAttribute('href', '/infographics')
  })

  it('should have correct href for SIGN IN/OUT link', () => {
    render(<Navbar />)
    const loginLink = screen.getByText('SIGN IN/OUT').closest('a')
    expect(loginLink).toHaveAttribute('href', '/login')
  })

  it('should render nav element', () => {
    render(<Navbar />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('should render unordered list with navigation items', () => {
    render(<Navbar />)
    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(4)
  })
})
