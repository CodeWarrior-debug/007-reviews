import React from 'react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

vi.mock('next/link', () => ({
  default: ({ children, href, className, onClick }: { children: React.ReactNode; href: string; className?: string; onClick?: () => void }) => (
    <a href={href} className={className} onClick={onClick}>{children}</a>
  ),
}))

vi.mock('next/font/google', () => ({
  Montserrat: () => ({ className: 'mock-montserrat-font' }),
}))

vi.mock('next/router', () => ({
  useRouter: () => ({
    pathname: '/',
  }),
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

    expect(screen.getAllByText('HOME').length).toBeGreaterThan(0)
    expect(screen.getAllByText('CINEMATOGRAPHY').length).toBeGreaterThan(0)
    expect(screen.getAllByText('INFOGRAPHICS').length).toBeGreaterThan(0)
    expect(screen.getAllByText('SIGN IN/OUT').length).toBeGreaterThan(0)
  })

  it('should have correct href for HOME link', () => {
    render(<Navbar />)
    const homeLinks = screen.getAllByText('HOME')
    const homeLink = homeLinks[0].closest('a')
    expect(homeLink).toHaveAttribute('href', '/')
  })

  it('should have correct href for CINEMATOGRAPHY link', () => {
    render(<Navbar />)
    const filmLinks = screen.getAllByText('CINEMATOGRAPHY')
    const filmLink = filmLinks[0].closest('a')
    expect(filmLink).toHaveAttribute('href', '/filmography')
  })

  it('should have correct href for INFOGRAPHICS link', () => {
    render(<Navbar />)
    const infoLinks = screen.getAllByText('INFOGRAPHICS')
    const infoLink = infoLinks[0].closest('a')
    expect(infoLink).toHaveAttribute('href', '/infographics')
  })

  it('should have correct href for SIGN IN/OUT link', () => {
    render(<Navbar />)
    const loginLinks = screen.getAllByText('SIGN IN/OUT')
    const loginLink = loginLinks[0].closest('a')
    expect(loginLink).toHaveAttribute('href', '/login')
  })

  it('should render nav element', () => {
    render(<Navbar />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('should render unordered list with navigation items', () => {
    render(<Navbar />)
    const lists = screen.getAllByRole('list')
    expect(lists.length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByRole('listitem')).toHaveLength(8)
  })

  it('should have backdrop blur styling on nav', () => {
    render(<Navbar />)
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveClass('backdrop-blur-md')
    expect(nav).toHaveClass('bg-[#161616]/80')
  })

  it('should render hamburger menu button for mobile', () => {
    render(<Navbar />)
    expect(screen.getByLabelText('Toggle menu')).toBeInTheDocument()
  })

  it('should toggle mobile menu on hamburger click', () => {
    render(<Navbar />)
    const hamburger = screen.getByLabelText('Toggle menu')

    fireEvent.click(hamburger)

    const mobileMenus = document.querySelectorAll('.sm\\:hidden')
    expect(mobileMenus.length).toBeGreaterThan(0)
  })
})
