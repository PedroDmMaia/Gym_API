import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository'
import { GetUserProfileUseCase } from '../get-user-profile.usecase'

export function MakeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const UseCase = new GetUserProfileUseCase(usersRepository)

  return UseCase
}
