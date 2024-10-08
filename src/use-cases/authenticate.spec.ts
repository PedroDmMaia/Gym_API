import { expect, describe, it } from 'vitest'
import { InMemoryDatabase } from '@/repositories/in-memory/in-memory-users.repository'
import { AuthenticateUseCase } from './authenticate.usecase'
import bcrypt from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials.error'

describe('Authenticate Use Case', () => {
  it('should be able to authenticate', async () => {
    const usersRepository = new InMemoryDatabase()
    const sut = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password_hash: await bcrypt.hash('123456', 6),
    })

    const { user } = await sut.authenticate({
      email: 'john.doe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    const usersRepository = new InMemoryDatabase()
    const sut = new AuthenticateUseCase(usersRepository)

    await expect(() =>
      sut.authenticate({
        email: 'john.doe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const usersRepository = new InMemoryDatabase()
    const sut = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password_hash: await bcrypt.hash('123456', 6),
    })

    await expect(() =>
      sut.authenticate({
        email: 'john.doe@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
