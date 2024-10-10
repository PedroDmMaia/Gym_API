import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/interface/check-ins.interface'
import { GymRepository } from '@/interface/gym.interface'
import { ResourceNotFound } from './errors/resource-not-found.error'
import { getDistanceBetweenCoordinates } from '@/utils/get-distances-between-coordirnates'

interface CheckInUseCaseRequest {
  user_id: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(
    private checkInRepository: CheckInsRepository,
    private gymsRepository: GymRepository,
  ) {}

  async create({
    user_id,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFound()
    }

    const distances = getDistanceBetweenCoordinates(
      {
        latitude: userLatitude,
        longitude: userLongitude,
      },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    )

    const MAX_DISTANCE_IN_KILOMETERS = 0.1

    if (distances > MAX_DISTANCE_IN_KILOMETERS) {
      throw new Error()
    }

    const checkInOnSameDate = await this.checkInRepository.findByUserIdOnDay(
      user_id,
      new Date(),
    )

    if (checkInOnSameDate) {
      throw new Error()
    }

    const checkIn = await this.checkInRepository.create({
      user_id,
      gymId,
    })

    return { checkIn }
  }
}
