import { Gym } from '@prisma/client'
import { GymRepository } from '@/interface/gym.interface'

interface CreateGymUseCaseRequest {
  title: string
  description: string | null
  phone: string | null
  latitude: string
  longitude: string
}

interface CreateGymUseCaseResponse {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private gymsRepository: GymRepository) {}

  async create({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    })

    return {
      gym,
    }
  }
}
