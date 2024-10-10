import { Gym, Prisma } from '@prisma/client'
import { GymRepository } from '@/interface/gym.interface'
import { Decimal } from '@prisma/client/runtime/library'

export class InMemoryGymRepository implements GymRepository {
  public items: Gym[] = []

  async findById(gymId: string) {
    const gym = this.items.find((item) => item.id === gymId)

    if (!gym) {
      return null
    }

    return gym
  }

  create(data: Prisma.GymCreateInput): Promise<Gym> {}
}
