import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/interface/check-ins.interface'

interface FetchUsersCheckInsHistoryUseCaseRequest {
  user_id: string
  page: number
}

interface FetchUsersCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchUsersCheckInsHistoryUseCase {
  constructor(private checkInRepository: CheckInsRepository) {}

  async execute({
    user_id,
    page,
  }: FetchUsersCheckInsHistoryUseCaseRequest): Promise<FetchUsersCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInRepository.findManyByUserId(
      user_id,
      page,
    )

    return { checkIns }
  }
}
