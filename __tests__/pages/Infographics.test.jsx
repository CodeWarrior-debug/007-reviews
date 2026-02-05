import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('next/font/google', () => ({
  Montserrat: () => ({ className: 'mock-montserrat-font' }),
}))

vi.mock('react-chartjs-2', () => ({
  Bar: ({ options, data, className }) => (
    <div data-testid="bar-chart" className={className}>
      <span data-testid="chart-title">{options.plugins.title.text}</span>
      <span data-testid="chart-labels">{JSON.stringify(data.labels)}</span>
      <span data-testid="chart-data">{JSON.stringify(data.datasets[0].data)}</span>
    </div>
  ),
}))

vi.mock('chart.js/auto', () => ({
  Chart: {
    register: vi.fn(),
  },
}))

vi.mock('chartjs-plugin-datalabels', () => ({
  default: {},
}))

vi.mock('../../components/Navbar', () => ({
  default: () => <nav data-testid="navbar">Navbar</nav>,
}))

vi.mock('../../components/Footer', () => ({
  default: () => <footer data-testid="footer">Footer</footer>,
}))

import Infographics from '../../pages/infographics'

describe('Infographics Page', () => {
  const mockMovies = [
    {
      id: 1,
      original_title: 'Skyfall',
      vote_average: 7.8,
      vote_count: 15000,
      popularity: 45.5,
    },
    {
      id: 2,
      original_title: 'Spectre',
      vote_average: 6.8,
      vote_count: 12000,
      popularity: 35.2,
    },
    {
      id: 3,
      original_title: 'No Time to Die',
      vote_average: 7.3,
      vote_count: 10000,
      popularity: 55.8,
    },
  ]

  it('should render the page title', () => {
    render(<Infographics movies={mockMovies} />)
    expect(screen.getByText('007 INFOGRAPHICS')).toBeInTheDocument()
  })

  it('should render Navbar component', () => {
    render(<Infographics movies={mockMovies} />)
    expect(screen.getByTestId('navbar')).toBeInTheDocument()
  })

  it('should render Footer component', () => {
    render(<Infographics movies={mockMovies} />)
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })

  it('should render three bar charts', () => {
    render(<Infographics movies={mockMovies} />)
    const charts = screen.getAllByTestId('bar-chart')
    expect(charts).toHaveLength(3)
  })

  it('should render ratings chart with correct title', () => {
    render(<Infographics movies={mockMovies} />)
    const titles = screen.getAllByTestId('chart-title')
    expect(titles[0]).toHaveTextContent('007 Reviews by Movie')
  })

  it('should render votes chart with correct title', () => {
    render(<Infographics movies={mockMovies} />)
    const titles = screen.getAllByTestId('chart-title')
    expect(titles[1]).toHaveTextContent('007 Votes by Movie (TMDB)')
  })

  it('should render popularity chart with correct title', () => {
    render(<Infographics movies={mockMovies} />)
    const titles = screen.getAllByTestId('chart-title')
    expect(titles[2]).toHaveTextContent('007 Trending Score (TMDB) by Movie')
  })

  it('should use movie titles as chart labels', () => {
    render(<Infographics movies={mockMovies} />)
    const labels = screen.getAllByTestId('chart-labels')
    const parsedLabels = JSON.parse(labels[0].textContent)
    expect(parsedLabels).toContain('Skyfall')
    expect(parsedLabels).toContain('Spectre')
    expect(parsedLabels).toContain('No Time to Die')
  })

  it('should display landscape hint for smaller devices', () => {
    render(<Infographics movies={mockMovies} />)
    expect(screen.getByText('Use Landscape On Smaller Devices')).toBeInTheDocument()
  })

  it('should display hover instruction', () => {
    render(<Infographics movies={mockMovies} />)
    expect(screen.getByText('Hover/Touch Graphs For Details')).toBeInTheDocument()
  })

  it('should have dark background', () => {
    const { container } = render(<Infographics movies={mockMovies} />)
    const mainDiv = container.querySelector('.bg-\\[\\#161616\\]')
    expect(mainDiv).toBeInTheDocument()
  })

  it('should format vote averages to one decimal place', () => {
    render(<Infographics movies={mockMovies} />)
    const dataElements = screen.getAllByTestId('chart-data')
    const ratingsData = JSON.parse(dataElements[0].textContent)
    expect(ratingsData).toContain('7.8')
    expect(ratingsData).toContain('6.8')
    expect(ratingsData).toContain('7.3')
  })

  it('should display vote counts in votes chart', () => {
    render(<Infographics movies={mockMovies} />)
    const dataElements = screen.getAllByTestId('chart-data')
    const votesData = JSON.parse(dataElements[1].textContent)
    expect(votesData).toContain(15000)
    expect(votesData).toContain(12000)
    expect(votesData).toContain(10000)
  })
})
