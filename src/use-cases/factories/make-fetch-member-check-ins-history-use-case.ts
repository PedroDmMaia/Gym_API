import { FetchUsersCheckInsHistoryUseCase } from '../fetch-member-check-ins-history.usecase'
import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-ins.repository'

export function MakeFetchMembersCheckInHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInRepository()
  const UseCase = new FetchUsersCheckInsHistoryUseCase(checkInsRepository)

  return UseCase
}
