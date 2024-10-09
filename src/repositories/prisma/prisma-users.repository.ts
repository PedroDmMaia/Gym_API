import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { usersRepository } from '../../interface/users.interface'

export class PrismaUsersRepository implements usersRepository {
  async findByUserId(userId: string) {
    const user = prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (user) {
      return user
    }

    return null
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }
}
