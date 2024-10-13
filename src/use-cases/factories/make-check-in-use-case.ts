import { PrismaGymsRepository } from '@/repositories/prisma/prima-gyms.repository'
import { CheckInUseCase } from '../check-in.usecase'
import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-ins.repository'

export function MaKeCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInRepository()
  const gymsRepository = new PrismaGymsRepository()
  const UseCase = new CheckInUseCase(checkInsRepository, gymsRepository)

  return UseCase
}
