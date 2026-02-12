import React from 'react'
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Axios from 'axios'

vi.mock('axios')

const mockedAxios = Axios as { get: Mock }

vi.mock('next/image', () => ({
  default: ({ src, alt, fill, priority, ...props }: { src: string; alt: string; fill?: boolean; priority?: boolean; [key: string]: unknown }) => (
    <img src={src} alt={alt} data-fill={fill} data-priority={priority} {...props} />
  ),
}))

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>,
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
  default: ({ userReview, audienceReview }: { userReview: number; audienceReview: number }) => (
    <div data-testid="review-chart">
      User: {userReview}, Audience: {audienceReview}
    </div>
  ),
}))

import MovieId, { getStaticProps, getStaticPaths } from '../../pages/filmography/[movieId]'

interface MovieFacts {
  id: number
  title: string
  tagline: string
  overview: string
  backdrop_path: string
  poster_path: string
  release_date: string
  runtime: number
  revenue: number
  budget: number
  vote_average: number
  vote_count: number
  popularity: number
  homepage: string | null
  imdb_id: string | null
}

describe('MovieDetail Page', () => {
  const mockMovieFacts: MovieFacts = {
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

  it('should toggle poster visibility on button click', async () => {
    render(<MovieId movieFacts={mockMovieFacts} />)
    const button = screen.getByRole('button', { name: /Hide Details/i })

    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Show Details/i })).toBeInTheDocument()
    })
  })

  it('should toggle back to show details', async () => {
    render(<MovieId movieFacts={mockMovieFacts} />)
    const button = screen.getByRole('button', { name: /Hide Details/i })

    fireEvent.click(button)
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Show Details/i })).toBeInTheDocument()
    })

    fireEvent.click(screen.getByRole('button', { name: /Show Details/i }))
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Hide Details/i })).toBeInTheDocument()
    })
  })

  it('should handle update review button click', async () => {
    render(<MovieId movieFacts={mockMovieFacts} />)
    const input = screen.getByRole('spinbutton')
    const button = screen.getByRole('button', { name: 'Update Review' })

    fireEvent.change(input, { target: { value: '8' } })
    fireEvent.click(button)

    expect(button).toBeInTheDocument()
  })

  it('should show validation dialog for invalid review value > 10', async () => {
    const { container } = render(<MovieId movieFacts={mockMovieFacts} />)
    const dialog = container.querySelector('dialog') as HTMLDialogElement
    const input = screen.getByRole('spinbutton')
    const button = screen.getByRole('button', { name: 'Update Review' })

    dialog.show = vi.fn()
    dialog.close = vi.fn()

    fireEvent.change(input, { target: { value: '15' } })
    fireEvent.click(button)

    await waitFor(() => {
      expect(dialog.show).toHaveBeenCalled()
    })
  })

  it('should show validation dialog for invalid review value < 0', async () => {
    const { container } = render(<MovieId movieFacts={mockMovieFacts} />)
    const dialog = container.querySelector('dialog') as HTMLDialogElement
    const input = screen.getByRole('spinbutton')
    const button = screen.getByRole('button', { name: 'Update Review' })

    dialog.show = vi.fn()
    dialog.close = vi.fn()

    fireEvent.change(input, { target: { value: '-5' } })
    fireEvent.click(button)

    await waitFor(() => {
      expect(dialog.show).toHaveBeenCalled()
    })
  })

  it('should display formatted release date', () => {
    render(<MovieId movieFacts={mockMovieFacts} />)
    expect(screen.getByText(/October 26, 2012/i)).toBeInTheDocument()
  })

  it('should handle movie without homepage', () => {
    const movieWithoutHomepage = { ...mockMovieFacts, homepage: null }
    render(<MovieId movieFacts={movieWithoutHomepage} />)
    expect(screen.queryByText('Official Homepage')).not.toBeInTheDocument()
  })

  it('should handle movie without imdb_id', () => {
    const movieWithoutImdb = { ...mockMovieFacts, imdb_id: null }
    render(<MovieId movieFacts={movieWithoutImdb} />)
    expect(screen.queryByText('IMDB Infopage')).not.toBeInTheDocument()
  })
})

describe('getStaticPaths', () => {
  const mockCollectionResponse = {
    data: {
      parts: [
        { id: 37724 },
        { id: 206647 },
        { id: 370172 },
      ]
    }
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch movie collection from TMDB API', async () => {
    mockedAxios.get.mockResolvedValue(mockCollectionResponse)

    await getStaticPaths()

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining('https://api.themoviedb.org/3/collection/')
    )
  })

  it('should return paths for all movies', async () => {
    mockedAxios.get.mockResolvedValue(mockCollectionResponse)

    const result = await getStaticPaths()

    expect(result.paths).toHaveLength(3)
    expect(result.paths[0]).toEqual({ params: { movieId: '37724' } })
    expect(result.paths[1]).toEqual({ params: { movieId: '206647' } })
    expect(result.paths[2]).toEqual({ params: { movieId: '370172' } })
  })

  it('should set fallback to blocking', async () => {
    mockedAxios.get.mockResolvedValue(mockCollectionResponse)

    const result = await getStaticPaths()

    expect(result.fallback).toBe('blocking')
  })

  it('should handle API errors', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    mockedAxios.get.mockRejectedValue(new Error('API Error'))

    try {
      await getStaticPaths()
    } catch (e) {
      // Expected to fail
    }

    consoleSpy.mockRestore()
  })
})

describe('getStaticProps', () => {
  const mockMovieResponse = {
    data: {
      id: 37724,
      title: 'Skyfall',
      tagline: 'Think on your sins.',
      overview: 'Bond investigates an attack on MI6.',
      backdrop_path: '/skyfall-backdrop.jpg',
      release_date: '2012-10-26',
      runtime: 143,
      revenue: 1108561013,
      budget: 200000000,
      vote_average: 7.8,
      vote_count: 15000,
      popularity: 45.5,
    }
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch movie details from TMDB API', async () => {
    mockedAxios.get.mockResolvedValue(mockMovieResponse)

    await getStaticProps({ params: { movieId: '37724' } })

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining('https://api.themoviedb.org/3/movie/37724')
    )
  })

  it('should return movie facts in props', async () => {
    mockedAxios.get.mockResolvedValue(mockMovieResponse)

    const result = await getStaticProps({ params: { movieId: '37724' } })

    expect(result.props.movieFacts).toEqual(mockMovieResponse.data)
  })

  it('should set revalidate to 3600 seconds', async () => {
    mockedAxios.get.mockResolvedValue(mockMovieResponse)

    const result = await getStaticProps({ params: { movieId: '37724' } })

    expect(result.revalidate).toBe(3600)
  })

  it('should use movieId from params', async () => {
    mockedAxios.get.mockResolvedValue(mockMovieResponse)

    await getStaticProps({ params: { movieId: '206647' } })

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining('/206647')
    )
  })

  it('should handle API errors gracefully', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    mockedAxios.get.mockRejectedValue(new Error('API Error'))

    await getStaticProps({ params: { movieId: '37724' } })

    expect(consoleSpy).toHaveBeenCalled()
    consoleSpy.mockRestore()
  })
})
