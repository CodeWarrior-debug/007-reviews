import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('next/link', () => ({
  default: ({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  ),
}))

vi.mock('../../components/Navbar', () => ({
  default: () => <nav data-testid="navbar">Navbar</nav>,
}))

vi.mock('next/router', () => ({
  useRouter: () => ({
    pathname: '/404',
  }),
}))

vi.mock('next/font/google', () => ({
  Montserrat: () => ({ className: 'mock-montserrat-font' }),
}))

import Custom404 from '../../pages/404'

describe('Custom 404 Page', () => {
  it('should render PAGE NOT FOUND heading', () => {
    render(<Custom404 />)
    expect(screen.getByText('PAGE NOT FOUND')).toBeInTheDocument()
  })

  it('should render the Bond-themed message', () => {
    render(<Custom404 />)
    expect(screen.getByText(/collateral damage/i)).toBeInTheDocument()
  })

  it('should have a headquarters link pointing to home', () => {
    render(<Custom404 />)
    const link = screen.getByRole('link', { name: /headquarters/i })
    expect(link).toHaveAttribute('href', '/')
  })

  it('should render the Navbar component', () => {
    render(<Custom404 />)
    expect(screen.getByTestId('navbar')).toBeInTheDocument()
  })

  it('should have dark background and white text', () => {
    const { container } = render(<Custom404 />)
    const darkDiv = container.querySelector('.bg-\\[\\#161616\\]')
    expect(darkDiv).toBeInTheDocument()
    expect(darkDiv).toHaveClass('text-white')
    expect(darkDiv).toHaveClass('min-h-screen')
  })

  it('should have gold gradient text on heading', () => {
    render(<Custom404 />)
    const heading = screen.getByText('PAGE NOT FOUND')
    expect(heading).toHaveClass('text-transparent')
    expect(heading).toHaveClass('bg-clip-text')
  })

  it('should use responsive padding instead of fixed pl-48 pr-48', () => {
    const { container } = render(<Custom404 />)
    const paddedDiv = container.querySelector('.px-8')
    expect(paddedDiv).toBeInTheDocument()
    const fixedPaddingDiv = container.querySelector('.pl-48')
    expect(fixedPaddingDiv).toBeNull()
  })

  it('should style headquarters link with gold color', () => {
    render(<Custom404 />)
    const link = screen.getByRole('link', { name: /headquarters/i })
    expect(link).toHaveClass('text-[#BF953F]')
    expect(link).toHaveClass('hover:text-[#FCF6ba]')
  })
})
