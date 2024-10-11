import { CheckInsRepository } from '@/interface/check-ins.interface'

interface GetUserMetricsUseCaseRequest {
  user_id: string
}

interface GetUserMetricsUseCaseResponse {
  checkInsCount: number
}

export class GetUserMetricsUseCase {
  constructor(private checkInRepository: CheckInsRepository) {}

  async execute({
    user_id,
  }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const checkInsCount = await this.checkInRepository.countByUserId(user_id)

    return { checkInsCount }
  }
}
