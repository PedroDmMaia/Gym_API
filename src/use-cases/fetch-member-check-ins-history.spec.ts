import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins.repository'
import { FetchUsersCheckInsHistoryUseCase } from './fetch-member-check-ins-history.usecase'

let checkInsRepository: InMemoryCheckInsRepository
let sut: FetchUsersCheckInsHistoryUseCase

describe('Fetch User Check-in History Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new FetchUsersCheckInsHistoryUseCase(checkInsRepository)
  })

  it('should be able to fetch check in history', async () => {
    await checkInsRepository.create({
      user_id: 'user-01',
      gymId: 'gym-01',
    })

    await checkInsRepository.create({
      user_id: 'user-01',
      gymId: 'gym-02',
    })

    const { checkIns } = await sut.execute({
      user_id: 'user-01',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gymId: 'gym-01' }),
      expect.objectContaining({ gymId: 'gym-02' }),
    ])
  })

  it('should be able to fetch paginated check-in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        gymId: `gym-${i}`,
        user_id: 'user-01',
      })
    }

    const { checkIns } = await sut.execute({
      user_id: 'user-01',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gymId: 'gym-21' }),
      expect.objectContaining({ gymId: 'gym-22' }),
    ])
  })
})
