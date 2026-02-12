import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

const mockPush = vi.fn()
const mockSignInWithEmailAndPassword = vi.fn()

vi.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: (...args: unknown[]) => mockSignInWithEmailAndPassword(...args),
}))

vi.mock('../../lib/db', () => ({
  auth: {},
}))

vi.mock('next/router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

import SignIn from '../../components/SignIn'

describe('SignIn', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  it('should render sign in form', () => {
    render(<SignIn />)

    expect(screen.getByText('Log In to your Account')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Email...')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Password...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Log In' })).toBeInTheDocument()
  })

  it('should update email field on input', () => {
    render(<SignIn />)

    const emailInput = screen.getByPlaceholderText('Email...') as HTMLInputElement
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })

    expect(emailInput.value).toBe('test@example.com')
  })

  it('should update password field on input', () => {
    render(<SignIn />)

    const passwordInput = screen.getByPlaceholderText('Password...') as HTMLInputElement
    fireEvent.change(passwordInput, { target: { value: 'password123' } })

    expect(passwordInput.value).toBe('password123')
  })

  it('should have email input type', () => {
    render(<SignIn />)

    const emailInput = screen.getByPlaceholderText('Email...')
    expect(emailInput).toHaveAttribute('type', 'email')
  })

  it('should have password input type', () => {
    render(<SignIn />)

    const passwordInput = screen.getByPlaceholderText('Password...')
    expect(passwordInput).toHaveAttribute('type', 'password')
  })

  it('should call signInWithEmailAndPassword on form submit', async () => {
    mockSignInWithEmailAndPassword.mockResolvedValue({ user: {} })

    render(<SignIn />)

    fireEvent.change(screen.getByPlaceholderText('Email...'), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('Password...'), {
      target: { value: 'password123' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Log In' }))

    await waitFor(() => {
      expect(mockSignInWithEmailAndPassword).toHaveBeenCalledWith(
        {},
        'test@example.com',
        'password123'
      )
    })
  })

  it('should redirect to filmography after successful login', async () => {
    mockSignInWithEmailAndPassword.mockResolvedValue({ user: {} })

    render(<SignIn />)

    fireEvent.change(screen.getByPlaceholderText('Email...'), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('Password...'), {
      target: { value: 'password123' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Log In' }))

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/filmography')
    })
  })

  it('should store email in localStorage on successful login', async () => {
    mockSignInWithEmailAndPassword.mockResolvedValue({ user: {} })

    render(<SignIn />)

    fireEvent.change(screen.getByPlaceholderText('Email...'), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('Password...'), {
      target: { value: 'password123' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Log In' }))

    await waitFor(() => {
      expect(localStorage.getItem('userEmail')).toBe('test@example.com')
    })
  })

  it('should handle login error gracefully', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    mockSignInWithEmailAndPassword.mockRejectedValue(new Error('Invalid credentials'))

    render(<SignIn />)

    fireEvent.change(screen.getByPlaceholderText('Email...'), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('Password...'), {
      target: { value: 'wrongpassword' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Log In' }))

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled()
    })

    consoleSpy.mockRestore()
  })
})
