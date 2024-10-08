import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register.usecase'
import { compare } from 'bcryptjs'
import { InMemoryDatabase } from '@/repositories/in-memory/in-memory-users.repository'
import { UserAlreadyExistsError } from './errors/user-already-exists.error'

describe('Register Use Case', () => {
  it('should be able to register', async () => {
    const usersRepository = new InMemoryDatabase()
    const sut = new RegisterUseCase(usersRepository)

    const { user } = await sut.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryDatabase()
    const sut = new RegisterUseCase(usersRepository)

    const { user } = await sut.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const usersRepository = new InMemoryDatabase()
    const sut = new RegisterUseCase(usersRepository)

    const email = 'john.doe@example.com'

    await sut.create({
      name: 'John Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.create({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
