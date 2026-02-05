import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }) => <img src={src} alt={alt} {...props} />,
}))

vi.mock('next/link', () => ({
  default: ({ children, href }) => <a href={href}>{children}</a>,
}))

vi.mock('@next/font/google', () => ({
  Red_Hat_Display: () => ({ className: 'mock-redhat-font' }),
  Plus_Jakarta_Sans: () => ({ className: 'mock-jakarta-font' }),
}))

import Card from '../../components/Card'

describe('Card', () => {
  const mockProps = {
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
})
