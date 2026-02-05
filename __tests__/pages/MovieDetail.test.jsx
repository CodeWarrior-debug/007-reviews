import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

vi.mock('next/image', () => ({
  default: ({ src, alt, fill, priority, ...props }) => (
    <img src={src} alt={alt} data-fill={fill} data-priority={priority} {...props} />
  ),
}))

vi.mock('next/link', () => ({
  default: ({ children, href }) => <a href={href}>{children}</a>,
}))

vi.mock('next/font/google', () => ({
  Montserrat: () => ({ className: 'mock-montserrat-font' }),
}))

vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(() => ({})),
}))

vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(() => ({})),
  getDoc: vi.fn(() => Promise.resolve({ exists: () => false })),
  doc: vi.fn(),
  updateDoc: vi.fn(() => Promise.resolve()),
}))

vi.mock('../../lib/db', () => ({
  firebaseConfig: {},
}))

vi.mock('../../components/Footer', () => ({
  default: () => <footer data-testid="footer">Footer</footer>,
}))

vi.mock('../../components/OneMovieReview', () => ({
  default: ({ userReview, audienceReview }) => (
    <div data-testid="review-chart">
      User: {userReview}, Audience: {audienceReview}
    </div>
  ),
}))

import MovieId from '../../pages/filmography/[movieId]'

describe('MovieDetail Page', () => {
  const mockMovieFacts = {
    id: 37724,
    title: 'Skyfall',
    tagline: 'Think on your sins.',
    overview: 'Bond investigates an attack on MI6.',
    backdrop_path: '/skyfall-backdrop.jpg',
    poster_path: '/skyfall.jpg',
    release_date: '2012-10-26',
    runtime: 143,
    revenue: 1108561013,
    budget: 200000000,
    vote_average: 7.8,
    vote_count: 15000,
    popularity: 45.5,
    homepage: 'http://skyfall-movie.com',
    imdb_id: 'tt1074638',
  }

  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  it('should render the movie title', () => {
    render(<MovieId movieFacts={mockMovieFacts} />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Skyfall')
  })

  it('should render Films List link', () => {
    render(<MovieId movieFacts={mockMovieFacts} />)
    const link = screen.getByRole('link', { name: 'Films List' })
    expect(link).toHaveAttribute('href', '/filmography')
  })

  it('should display movie tagline', () => {
    render(<MovieId movieFacts={mockMovieFacts} />)
    expect(screen.getByText('Think on your sins.')).toBeInTheDocument()
  })

  it('should display movie overview', () => {
    render(<MovieId movieFacts={mockMovieFacts} />)
    expect(screen.getByText('Bond investigates an attack on MI6.')).toBeInTheDocument()
  })

  it('should render the review chart component', () => {
    render(<MovieId movieFacts={mockMovieFacts} />)
    expect(screen.getByTestId('review-chart')).toBeInTheDocument()
  })

  it('should display runtime in hours', () => {
    render(<MovieId movieFacts={mockMovieFacts} />)
    expect(screen.getByText('2.4 HR')).toBeInTheDocument()
  })

  it('should display formatted revenue', () => {
    render(<MovieId movieFacts={mockMovieFacts} />)
    expect(screen.getByText('$1,108,561,013')).toBeInTheDocument()
  })

  it('should display formatted budget', () => {
    render(<MovieId movieFacts={mockMovieFacts} />)
    expect(screen.getByText('$200,000,000')).toBeInTheDocument()
  })

  it('should calculate and display profit', () => {
    render(<MovieId movieFacts={mockMovieFacts} />)
    expect(screen.getByText('$908,561,013')).toBeInTheDocument()
  })

  it('should display vote average', () => {
    render(<MovieId movieFacts={mockMovieFacts} />)
    expect(screen.getByText('7.8 / 10')).toBeInTheDocument()
  })

  it('should display vote count', () => {
    render(<MovieId movieFacts={mockMovieFacts} />)
    expect(screen.getByText('15,000')).toBeInTheDocument()
  })

  it('should display TMDB trend score', () => {
    render(<MovieId movieFacts={mockMovieFacts} />)
    expect(screen.getByText('45.5 / 100')).toBeInTheDocument()
  })

  it('should render Official Homepage link when available', () => {
    render(<MovieId movieFacts={mockMovieFacts} />)
    const link = screen.getByRole('link', { name: 'Official Homepage' })
    expect(link).toHaveAttribute('href', 'http://skyfall-movie.com')
  })

  it('should render IMDB link', () => {
    render(<MovieId movieFacts={mockMovieFacts} />)
    const link = screen.getByRole('link', { name: 'IMDB Infopage' })
    expect(link).toHaveAttribute('href', 'https://www.imdb.com/title/tt1074638')
  })

  it('should render Footer component', () => {
    render(<MovieId movieFacts={mockMovieFacts} />)
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })

  it('should have review input field', () => {
    render(<MovieId movieFacts={mockMovieFacts} />)
    const input = screen.getByRole('spinbutton')
    expect(input).toHaveAttribute('type', 'number')
    expect(input).toHaveAttribute('min', '0')
    expect(input).toHaveAttribute('max', '10')
  })

  it('should have Update Review button', () => {
    render(<MovieId movieFacts={mockMovieFacts} />)
    expect(screen.getByRole('button', { name: 'Update Review' })).toBeInTheDocument()
  })

  it('should show sign in prompt when not logged in', () => {
    render(<MovieId movieFacts={mockMovieFacts} />)
    expect(screen.getByText(/Reviews Will Save If Signed In/)).toBeInTheDocument()
  })

  it('should render backdrop image', () => {
    render(<MovieId movieFacts={mockMovieFacts} />)
    const images = screen.getAllByAltText(/movie_backdrop_pic/)
    expect(images.length).toBeGreaterThan(0)
  })

  it('should have dialog element for validation', () => {
    const { container } = render(<MovieId movieFacts={mockMovieFacts} />)
    const dialog = container.querySelector('dialog')
    expect(dialog).toBeInTheDocument()
  })
})
