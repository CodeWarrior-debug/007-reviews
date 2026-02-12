import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useContext, useState } from 'react'
import { AuthContext } from '../../lib/context'

describe('AuthContext', () => {
  it('should have correct default values', () => {
    const { result } = renderHook(() => useContext(AuthContext))

    expect(result.current.authEmail).toBe('')
    expect(typeof result.current.setAuthEmail).toBe('function')
  })

  it('should return undefined when calling default setAuthEmail', () => {
    const { result } = renderHook(() => useContext(AuthContext))

    const returnValue = result.current.setAuthEmail('test@example.com')
    expect(returnValue).toBeUndefined()
  })

  it('should be usable with a custom provider', () => {
    const wrapper = ({ children }) => {
      const [authEmail, setAuthEmail] = useState('custom@test.com')
      return (
        <AuthContext.Provider value={{ authEmail, setAuthEmail }}>
          {children}
        </AuthContext.Provider>
      )
    }

    const { result } = renderHook(() => useContext(AuthContext), { wrapper })

    expect(result.current.authEmail).toBe('custom@test.com')
  })

  it('should allow updating authEmail through provider', () => {
    const wrapper = ({ children }) => {
      const [authEmail, setAuthEmail] = useState('')
      return (
        <AuthContext.Provider value={{ authEmail, setAuthEmail }}>
          {children}
        </AuthContext.Provider>
      )
    }

    const { result } = renderHook(() => useContext(AuthContext), { wrapper })

    expect(result.current.authEmail).toBe('')

    act(() => {
      result.current.setAuthEmail('updated@test.com')
    })

    expect(result.current.authEmail).toBe('updated@test.com')
  })
})
