import { describe, it, expect } from 'vitest'
import { UserData } from '../../lib/data'

interface UserDataEntry {
  id: number
  year: number
  userGain: number
  userLoss: number
}

describe('UserData', () => {
  it('should be an array', () => {
    expect(Array.isArray(UserData)).toBe(true)
  })

  it('should have 4 entries', () => {
    expect(UserData).toHaveLength(4)
  })

  it('should have correct structure for each entry', () => {
    UserData.forEach((entry: UserDataEntry) => {
      expect(entry).toHaveProperty('id')
      expect(entry).toHaveProperty('year')
      expect(entry).toHaveProperty('userGain')
      expect(entry).toHaveProperty('userLoss')
    })
  })

  it('should have numeric values for all properties', () => {
    UserData.forEach((entry: UserDataEntry) => {
      expect(typeof entry.id).toBe('number')
      expect(typeof entry.year).toBe('number')
      expect(typeof entry.userGain).toBe('number')
      expect(typeof entry.userLoss).toBe('number')
    })
  })

  it('should have sequential IDs from 1 to 4', () => {
    const ids = UserData.map((entry: UserDataEntry) => entry.id)
    expect(ids).toEqual([1, 2, 3, 4])
  })

  it('should have years from 2016 to 2019', () => {
    const years = UserData.map((entry: UserDataEntry) => entry.year)
    expect(years).toEqual([2016, 2017, 2018, 2019])
  })

  it('should have positive userGain values', () => {
    UserData.forEach((entry: UserDataEntry) => {
      expect(entry.userGain).toBeGreaterThan(0)
    })
  })

  it('should have positive userLoss values', () => {
    UserData.forEach((entry: UserDataEntry) => {
      expect(entry.userLoss).toBeGreaterThan(0)
    })
  })
})
