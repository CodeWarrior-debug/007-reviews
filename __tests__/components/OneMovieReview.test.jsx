import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('react-chartjs-2', () => ({
  Bar: ({ data, options, id }) => (
    <div data-testid="bar-chart" data-id={id}>
      <span data-testid="chart-labels">{JSON.stringify(data.labels)}</span>
      <span data-testid="chart-data">{JSON.stringify(data.datasets[0].data)}</span>
      <span data-testid="chart-label">{data.datasets[0].label}</span>
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

import OneMovieReview from '../../components/OneMovieReview'

describe('OneMovieReview', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render a bar chart', () => {
    render(<OneMovieReview userReview={7.5} audienceReview={8.0} />)
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument()
  })

  it('should have chart id', () => {
    render(<OneMovieReview userReview={7.5} audienceReview={8.0} />)
    expect(screen.getByTestId('bar-chart')).toHaveAttribute('data-id', 'chart')
  })

  it('should display correct labels', () => {
    render(<OneMovieReview userReview={7.5} audienceReview={8.0} />)
    const labels = JSON.parse(screen.getByTestId('chart-labels').textContent)
    expect(labels).toEqual(['Me', 'TMDB Audience', 'Differential'])
  })

  it('should display dataset label', () => {
    render(<OneMovieReview userReview={7.5} audienceReview={8.0} />)
    expect(screen.getByTestId('chart-label')).toHaveTextContent('Rating (out of 10)')
  })

  it('should calculate differential correctly', () => {
    render(<OneMovieReview userReview={6.0} audienceReview={8.0} />)
    const data = JSON.parse(screen.getByTestId('chart-data').textContent)
    expect(parseFloat(data[2])).toBe(2.0) // |6.0 - 8.0| = 2.0
  })

  it('should handle equal reviews with zero differential', () => {
    render(<OneMovieReview userReview={7.5} audienceReview={7.5} />)
    const data = JSON.parse(screen.getByTestId('chart-data').textContent)
    expect(parseFloat(data[2])).toBe(0.0)
  })

  it('should format values to one decimal place', () => {
    render(<OneMovieReview userReview={7.333} audienceReview={8.666} />)
    const data = JSON.parse(screen.getByTestId('chart-data').textContent)
    expect(data[0]).toBe('7.3')
    expect(data[1]).toBe('8.7')
  })

  it('should handle user review higher than audience', () => {
    render(<OneMovieReview userReview={9.0} audienceReview={7.0} />)
    const data = JSON.parse(screen.getByTestId('chart-data').textContent)
    expect(parseFloat(data[2])).toBe(2.0) // absolute value
  })
})
