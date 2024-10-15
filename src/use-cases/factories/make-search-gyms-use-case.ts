import { SearchGymUseCase } from '../search-gyms.usecase'
import { PrismaGymsRepository } from '@/repositories/prisma/prima-gyms.repository'

export function MakeSearchGymsUseCase() {
  const gymRepository = new PrismaGymsRepository()
  const UseCase = new SearchGymUseCase(gymRepository)

  return UseCase
}
