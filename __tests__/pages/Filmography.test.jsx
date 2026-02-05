import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('next/font/google', () => ({
  Red_Hat_Display: () => ({ className: 'mock-redhat-font' }),
  Plus_Jakarta_Sans: () => ({ className: 'mock-jakarta-font' }),
}))

vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }) => <img src={src} alt={alt} {...props} />,
}))

vi.mock('next/link', () => ({
  default: ({ children, href }) => <a href={href}>{children}</a>,
}))

vi.mock('../../components/Navbar', () => ({
  default: () => <nav data-testid="navbar">Navbar</nav>,
}))

vi.mock('../../components/Footer', () => ({
  default: () => <footer data-testid="footer">Footer</footer>,
}))

vi.mock('../../components/Card', () => ({
  default: ({ title, movieId, overview, release_date, vote_average }) => (
    <div data-testid={`movie-card-${movieId}`}>
      <h3>{title}</h3>
      <p>{overview}</p>
      <span>{release_date}</span>
      <span>{vote_average}</span>
    </div>
  ),
}))

import Filmography from '../../pages/filmography/index'

describe('Filmography Page', () => {
  const mockMovies = [
    {
      id: 1,
      title: 'Skyfall',
      overview: 'Bond investigates MI6 attack',
      poster_path: '/skyfall.jpg',
      release_date: '2012-10-26',
      vote_average: 7.8,
    },
    {
      id: 2,
      title: 'Spectre',
      overview: 'Bond discovers criminal organization',
      poster_path: '/spectre.jpg',
      release_date: '2015-10-26',
      vote_average: 6.8,
    },
    {
      id: 3,
      title: 'No Time to Die',
      overview: 'Bond comes out of retirement',
      poster_path: '/nttd.jpg',
      release_date: '2021-09-30',
      vote_average: 7.3,
    },
  ]

  it('should render the page with movies', () => {
    render(<Filmography movies={mockMovies} />)
    expect(screen.getByTestId('navbar')).toBeInTheDocument()
  })

  it('should render all movie cards', () => {
    render(<Filmography movies={mockMovies} />)
    expect(screen.getByTestId('movie-card-1')).toBeInTheDocument()
    expect(screen.getByTestId('movie-card-2')).toBeInTheDocument()
    expect(screen.getByTestId('movie-card-3')).toBeInTheDocument()
  })

  it('should display movie titles', () => {
    render(<Filmography movies={mockMovies} />)
    expect(screen.getByText('Skyfall')).toBeInTheDocument()
    expect(screen.getByText('Spectre')).toBeInTheDocument()
    expect(screen.getByText('No Time to Die')).toBeInTheDocument()
  })

  it('should render Footer component', () => {
    render(<Filmography movies={mockMovies} />)
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })

  it('should render correct number of movie cards', () => {
    render(<Filmography movies={mockMovies} />)
    const cards = screen.getAllByTestId(/movie-card-/)
    expect(cards).toHaveLength(3)
  })

  it('should handle empty movies array', () => {
    render(<Filmography movies={[]} />)
    expect(screen.getByTestId('navbar')).toBeInTheDocument()
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })

  it('should have dark background', () => {
    const { container } = render(<Filmography movies={mockMovies} />)
    const wrapper = container.firstChild.firstChild
    expect(wrapper).toHaveClass('bg-[#161616]')
  })
})
