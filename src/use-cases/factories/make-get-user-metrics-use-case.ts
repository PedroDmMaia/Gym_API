import { GetUserMetricsUseCase } from '../get-users-metrics.usecase'
import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-ins.repository'

export function MakeGetUserMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInRepository()
  const UseCase = new GetUserMetricsUseCase(checkInsRepository)

  return UseCase
}
