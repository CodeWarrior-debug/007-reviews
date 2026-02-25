import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('next/link', () => ({
  default: ({ children, href, target, className }: { children: React.ReactNode; href: string; target?: string; className?: string }) => (
    <a href={href} target={target} className={className}>{children}</a>
  ),
}))

import Footer from '../../components/Footer'

describe('Footer', () => {
  it('should render footer content', () => {
    render(<Footer />)
    expect(screen.getByText(/icon by/i)).toBeInTheDocument()
  })

  it('should have Icons8 attribution link', () => {
    render(<Footer />)
    const icons8Link = screen.getByRole('link', { name: 'Icons8' })
    expect(icons8Link).toHaveAttribute('href', 'https://icons8.com')
    expect(icons8Link).toHaveAttribute('target', '_blank')
  })

  it('should have 007 icon link', () => {
    render(<Footer />)
    const iconLink = screen.getByRole('link', { name: '007' })
    expect(iconLink).toHaveAttribute('href', 'https://icons8.com/icon/19532/007')
  })

  it('should have TMDB API link', () => {
    render(<Footer />)
    const tmdbApiLink = screen.getByRole('link', { name: 'TMDB API' })
    expect(tmdbApiLink).toHaveAttribute('href', 'https://www.themoviedb.org/documentation/api')
  })

  it('should have TMDB link', () => {
    render(<Footer />)
    const tmdbLink = screen.getByRole('link', { name: 'TMDB' })
    expect(tmdbLink).toHaveAttribute('href', 'https://www.themoviedb.org/')
  })

  it('should have GitHub repository link', () => {
    render(<Footer />)
    const githubLink = screen.getByRole('link', { name: 'GitHub' })
    expect(githubLink).toHaveAttribute('href', 'https://github.com/CodeWarrior-debug/007-reviews')
  })

  it('should have CodeWarrior-debug link', () => {
    render(<Footer />)
    const authorLink = screen.getByRole('link', { name: 'CodeWarrior-debug' })
    expect(authorLink).toHaveAttribute('href', 'https://github.com/CodeWarrior-debug')
  })

  it('should mention TMDB disclaimer', () => {
    render(<Footer />)
    expect(screen.getByText(/not endorsed or certified by/i)).toBeInTheDocument()
  })

  it('should use semantic footer element as outer wrapper', () => {
    const { container } = render(<Footer />)
    expect(container.querySelector('footer')).toBeInTheDocument()
  })

  it('should not contain any br tags', () => {
    const { container } = render(<Footer />)
    expect(container.querySelectorAll('br')).toHaveLength(0)
  })

  it('should not have nested p inside p tags', () => {
    const { container } = render(<Footer />)
    const paragraphs = container.querySelectorAll('p')
    paragraphs.forEach((p) => {
      expect(p.querySelector('p')).toBeNull()
    })
  })

  it('should use blue and red link colors matching original style', () => {
    render(<Footer />)
    const icons8Link = screen.getByRole('link', { name: 'Icons8' })
    expect(icons8Link).toHaveClass('text-blue-400')
    const tmdbApiLink = screen.getByRole('link', { name: 'TMDB API' })
    expect(tmdbApiLink).toHaveClass('text-red-400')
  })

  it('should use text-base font-light for footer text', () => {
    const { container } = render(<Footer />)
    const textDiv = container.querySelector('.text-base')
    expect(textDiv).toBeInTheDocument()
    expect(textDiv).toHaveClass('font-light')
  })
})
