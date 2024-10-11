import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym.repository'
import { CreateGymUseCase } from './create-gym.usecase'
import { Prisma } from '@prisma/client'

let gymRepository: InMemoryGymRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymRepository()
    sut = new CreateGymUseCase(gymRepository)
  })

  it('should be able to create gym', async () => {
    const { gym } = await sut.create({
      title: 'Javascript Gym',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
