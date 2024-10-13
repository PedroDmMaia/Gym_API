import { CreateGymUseCase } from '../create-gym.usecase'
import { PrismaGymsRepository } from '@/repositories/prisma/prima-gyms.repository'

export function MakeCreateGymUseCase() {
  const gymRepository = new PrismaGymsRepository()
  const UseCase = new CreateGymUseCase(gymRepository)

  return UseCase
}
