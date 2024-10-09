import { Prisma, User } from '@prisma/client'
import { usersRepository } from '../../interface/users.interface'

export class InMemoryUsersRepository implements usersRepository {
  public items: User[] = []

  async findByUserId(userId: string) {
    const user = this.items.find((item) => item.id === userId)

    if (user) {
      return user
    }

    return null
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (user) {
      return user
    }

    return null
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.items.push(user)

    return user
  }
}
