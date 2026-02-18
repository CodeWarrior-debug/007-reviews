import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) => (
    <img src={src} alt={alt} {...props} />
  ),
}))

vi.mock('next/link', () => ({
  default: ({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  ),
}))

vi.mock('next/font/google', () => ({
  Red_Hat_Display: () => ({ className: 'mock-redhat-font' }),
  Plus_Jakarta_Sans: () => ({ className: 'mock-jakarta-font' }),
}))

import Card from '../../components/Card'

interface CardProps {
  movieId: number
  title: string
  overview: string
  poster_path: string
  release_date: string
  vote_average: number
}

describe('Card', () => {
  const mockProps: CardProps = {
    movieId: 123,
    title: 'Skyfall',
    overview: 'James Bond investigates an attack on MI6.',
    poster_path: '/poster.jpg',
    release_date: '2012-10-26',
    vote_average: 7.8,
  }

  it('should render the movie title', () => {
    render(<Card {...mockProps} />)
    expect(screen.getByText('Skyfall')).toBeInTheDocument()
  })

  it('should render the movie overview', () => {
    render(<Card {...mockProps} />)
    expect(screen.getByText('James Bond investigates an attack on MI6.')).toBeInTheDocument()
  })

  it('should render the release date', () => {
    render(<Card {...mockProps} />)
    expect(screen.getByText('2012-10-26')).toBeInTheDocument()
  })

  it('should render the vote average with one decimal and star', () => {
    render(<Card {...mockProps} />)
    expect(screen.getByText('7.8 ★')).toBeInTheDocument()
  })

  it('should render the poster image with correct alt text', () => {
    render(<Card {...mockProps} />)
    const image = screen.getByAltText('Skyfall')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/poster.jpg')
  })

  it('should link to the correct movie page', () => {
    render(<Card {...mockProps} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', './filmography/123')
  })

  it('should format vote average to one decimal place', () => {
    render(<Card {...{ ...mockProps, vote_average: 8.333 }} />)
    expect(screen.getByText('8.3 ★')).toBeInTheDocument()
  })

  it('should handle integer vote average', () => {
    render(<Card {...{ ...mockProps, vote_average: 8 }} />)
    expect(screen.getByText('8.0 ★')).toBeInTheDocument()
  })

  it('should use dark background with gold ring styling', () => {
    render(<Card {...mockProps} />)
    const link = screen.getByRole('link')
    expect(link).toHaveClass('bg-[#1e1e1e]')
    expect(link).toHaveClass('ring-1')
    expect(link).toHaveClass('ring-[#BF953F]/30')
    expect(link).toHaveClass('shadow-lg')
  })

  it('should use white text for title instead of black', () => {
    render(<Card {...mockProps} />)
    const title = screen.getByText('Skyfall')
    expect(title).toHaveClass('text-white')
    expect(title).not.toHaveClass('text-black')
  })

  it('should use gray-300 for metadata text', () => {
    render(<Card {...mockProps} />)
    const metaDiv = screen.getByText('2012-10-26').closest('div')?.parentElement
    expect(metaDiv).toHaveClass('text-gray-300')
  })

  it('should have transition and hover classes for smooth interaction', () => {
    render(<Card {...mockProps} />)
    const link = screen.getByRole('link')
    expect(link).toHaveClass('transition-all')
    expect(link).toHaveClass('duration-300')
    expect(link).toHaveClass('hover:scale-105')
  })
})
