import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms.usecase'
import { PrismaGymsRepository } from '@/repositories/prisma/prima-gyms.repository'

export function MakeFetchNearbyGymsUseCase() {
  const gymRepository = new PrismaGymsRepository()
  const UseCase = new FetchNearbyGymsUseCase(gymRepository)

  return UseCase
}
