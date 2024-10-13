import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-ins.repository'
import { ValidateCheckInUseCase } from '../validate-check-in.usecase'

export function MakeValidateCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInRepository()
  const UseCase = new ValidateCheckInUseCase(checkInsRepository)

  return UseCase
}
