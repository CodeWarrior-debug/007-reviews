import React from 'react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

const mockSignOut = vi.fn(() => Promise.resolve())
const mockOnAuthStateChanged = vi.fn()

vi.mock('firebase/auth', () => ({
  onAuthStateChanged: (...args: unknown[]) => mockOnAuthStateChanged(...args),
  signOut: () => mockSignOut(),
}))

vi.mock('../../lib/db', () => ({
  auth: {},
}))

import AuthDetails from '../../components/AuthDetails'

describe('AuthDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('should show signed out state when no user', async () => {
    mockOnAuthStateChanged.mockImplementation((auth: unknown, callback: (user: null) => void) => {
      callback(null)
      return vi.fn()
    })

    render(<AuthDetails />)

    expect(screen.getByText('Currently Signed Out')).toBeInTheDocument()
  })

  it('should show user email when signed in', async () => {
    mockOnAuthStateChanged.mockImplementation((auth: unknown, callback: (user: { email: string }) => void) => {
      callback({ email: 'test@example.com' })
      return vi.fn()
    })

    render(<AuthDetails />)

    await waitFor(() => {
      expect(screen.getByText('Signed In as test@example.com')).toBeInTheDocument()
    })
  })

  it('should render sign out button when user is authenticated', async () => {
    mockOnAuthStateChanged.mockImplementation((auth: unknown, callback: (user: { email: string }) => void) => {
      callback({ email: 'test@example.com' })
      return vi.fn()
    })

    render(<AuthDetails />)

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Sign Out' })).toBeInTheDocument()
    })
  })

  it('should call signOut when sign out button is clicked', async () => {
    mockOnAuthStateChanged.mockImplementation((auth: unknown, callback: (user: { email: string }) => void) => {
      callback({ email: 'test@example.com' })
      return vi.fn()
    })

    render(<AuthDetails />)

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Sign Out' })).toBeInTheDocument()
    })

    fireEvent.click(screen.getByRole('button', { name: 'Sign Out' }))

    expect(mockSignOut).toHaveBeenCalled()
  })

  it('should not show sign out button when signed out', async () => {
    mockOnAuthStateChanged.mockImplementation((auth: unknown, callback: (user: null) => void) => {
      callback(null)
      return vi.fn()
    })

    render(<AuthDetails />)

    expect(screen.queryByRole('button', { name: 'Sign Out' })).not.toBeInTheDocument()
  })

  it('should cleanup auth listener on unmount', () => {
    const unsubscribe = vi.fn()
    mockOnAuthStateChanged.mockImplementation(() => unsubscribe)

    const { unmount } = render(<AuthDetails />)
    unmount()

    expect(unsubscribe).toHaveBeenCalled()
  })

  it('should use dark theme for signed-in status box', async () => {
    mockOnAuthStateChanged.mockImplementation((auth: unknown, callback: (user: { email: string }) => void) => {
      callback({ email: 'test@example.com' })
      return vi.fn()
    })

    render(<AuthDetails />)

    await waitFor(() => {
      const statusText = screen.getByText('Signed In as test@example.com')
      expect(statusText).toHaveClass('bg-[#252429]')
      expect(statusText).toHaveClass('text-white')
      expect(statusText).toHaveClass('ring-1')
    })
  })

  it('should use dark theme for signed-out status box', () => {
    mockOnAuthStateChanged.mockImplementation((auth: unknown, callback: (user: null) => void) => {
      callback(null)
      return vi.fn()
    })

    render(<AuthDetails />)

    const statusText = screen.getByText('Currently Signed Out')
    expect(statusText).toHaveClass('bg-[#252429]')
    expect(statusText).toHaveClass('text-white')
  })

  it('should use gold-themed sign out button', async () => {
    mockOnAuthStateChanged.mockImplementation((auth: unknown, callback: (user: { email: string }) => void) => {
      callback({ email: 'test@example.com' })
      return vi.fn()
    })

    render(<AuthDetails />)

    await waitFor(() => {
      const button = screen.getByRole('button', { name: 'Sign Out' })
      expect(button).toHaveClass('border-[#BF953F]')
      expect(button).toHaveClass('text-[#FCF6ba]')
      expect(button).toHaveClass('bg-transparent')
    })
  })
})
