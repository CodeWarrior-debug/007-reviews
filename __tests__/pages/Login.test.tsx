import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('next/router', () => ({
  useRouter: () => ({
    push: vi.fn(),
    pathname: '/login',
  }),
}))

vi.mock('next/font/google', () => ({
  Montserrat: () => ({ className: 'mock-montserrat-font' }),
}))

vi.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  onAuthStateChanged: vi.fn((auth: unknown, callback: (user: null) => void) => {
    callback(null)
    return vi.fn()
  }),
  signOut: vi.fn(),
}))

vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(() => ({})),
}))

vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(() => ({})),
  doc: vi.fn(),
  setDoc: vi.fn(),
  Timestamp: { fromDate: vi.fn(() => ({})) },
}))

vi.mock('../../lib/db', () => ({
  auth: {},
  firebaseConfig: {},
}))

vi.mock('../../components/Navbar', () => ({
  default: () => <nav data-testid="navbar">Navbar</nav>,
}))

import Login from '../../pages/login'

describe('Login Page', () => {
  it('should render SignIn and SignUp forms', () => {
    render(<Login />)
    expect(screen.getByText('Log In to your Account')).toBeInTheDocument()
    expect(screen.getByText('Create Account')).toBeInTheDocument()
  })

  it('should render the Navbar', () => {
    render(<Login />)
    expect(screen.getByTestId('navbar')).toBeInTheDocument()
  })

  it('should have dark background', () => {
    const { container } = render(<Login />)
    const darkDiv = container.querySelector('.bg-\\[\\#161616\\]')
    expect(darkDiv).toBeInTheDocument()
    expect(darkDiv).toHaveClass('text-white')
  })

  it('should wrap auth components in a card container', () => {
    const { container } = render(<Login />)
    const card = container.querySelector('.bg-\\[\\#1e1e1e\\]')
    expect(card).toBeInTheDocument()
    expect(card).toHaveClass('rounded-2xl')
    expect(card).toHaveClass('ring-1')
    expect(card).toHaveClass('ring-[#BF953F]/20')
  })

  it('should have gold-themed dividers between sections', () => {
    const { container } = render(<Login />)
    const dividers = container.querySelectorAll('hr')
    expect(dividers.length).toBeGreaterThanOrEqual(2)
    dividers.forEach((hr) => {
      expect(hr).toHaveClass('border-[#BF953F]/30')
    })
  })
})
