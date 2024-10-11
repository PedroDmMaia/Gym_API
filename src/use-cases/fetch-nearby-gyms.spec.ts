import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym.repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms.usecase'

let gymsrepository: InMemoryGymRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsrepository = new InMemoryGymRepository()
    sut = new FetchNearbyGymsUseCase(gymsrepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsrepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    await gymsrepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -27.0610928,
      longitude: -49.5229501,
    })

    const { gyms } = await sut.execute({
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
