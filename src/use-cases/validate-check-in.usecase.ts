import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/interface/check-ins.interface'
import { ResourceNotFound } from './errors/resource-not-found.error'
import dayjs from 'dayjs'
import { LateCheckInValidationError } from './errors/late-check-in-validate.error'

interface ValidateCheckInUseCaseRequest {
  checkInId: string
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(private checkInRepository: CheckInsRepository) {}

  async validate({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFound()
    }

    const distanceInMinutesFomCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if (distanceInMinutesFomCheckInCreation > 20) {
      throw new LateCheckInValidationError()
    }

    checkIn.validate_at = new Date()

    await this.checkInRepository.save(checkIn)

    return { checkIn }
  }
}
