import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users.repository'
import bcrypt from 'bcryptjs'
import { GetUserProfileUseCase } from './get-user-profile.usecase'
import { ResourceNotFound } from './errors/resource-not-found.error'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password_hash: await bcrypt.hash('123456', 6),
    })

    const { user } = await sut.authenticate({
      userId: createdUser.id,
    })

    expect(user.name).toEqual('John Doe')
  })

  it('should be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.authenticate({
        userId: 'wrong-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFound)
  })
})
