import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'

vi.mock('next/head', () => ({
  default: ({ children }) => <>{children}</>,
}))

vi.mock('next/image', () => ({
  default: ({ src, alt, fill, priority, ...props }) => (
    <img src={src} alt={alt} data-fill={fill} data-priority={priority} {...props} />
  ),
}))

vi.mock('next/font/google', () => ({
  Montserrat: () => ({ className: 'mock-montserrat-font' }),
}))

vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
  },
}))

vi.mock('../../components/Navbar', () => ({
  default: () => <nav data-testid="navbar">Navbar</nav>,
}))

vi.mock('../../components/Footer', () => ({
  default: () => <footer data-testid="footer">Footer</footer>,
}))

import Home from '../../pages/index'
import Axios from 'axios'

describe('Home Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    Axios.get.mockResolvedValue({
      data: { poster_path: '/test-poster.jpg' },
    })
  })

  it('should render the page', () => {
    render(<Home />)
    expect(screen.getByText('James Bond')).toBeInTheDocument()
  })

  it('should render 007 Reviews title', () => {
    render(<Home />)
    expect(screen.getByText('007 Reviews')).toBeInTheDocument()
  })

  it('should render Navbar component', () => {
    render(<Home />)
    expect(screen.getByTestId('navbar')).toBeInTheDocument()
  })

  it('should render Footer component', () => {
    render(<Home />)
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })

  it('should render poster image with alt text', async () => {
    render(<Home />)
    await waitFor(() => {
      const image = screen.getByAltText('Bond Collection Poster')
      expect(image).toBeInTheDocument()
    })
  })

  it('should fetch poster from TMDB API on mount', async () => {
    render(<Home />)
    await waitFor(() => {
      expect(Axios.get).toHaveBeenCalled()
    })
  })

  it('should have main element with dark background', () => {
    render(<Home />)
    const main = screen.getByRole('main')
    expect(main).toHaveClass('bg-[#161616]')
  })

  it('should display James Bond text with gradient styling', () => {
    render(<Home />)
    const title = screen.getByText('James Bond')
    expect(title).toHaveClass('text-transparent')
    expect(title).toHaveClass('bg-clip-text')
  })
})
