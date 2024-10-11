import { Gym, Prisma } from '@prisma/client'
import { FindManyNearby, GymRepository } from '@/interface/gym.interface'
import { randomUUID } from 'node:crypto'
import { getDistanceBetweenCoordinates } from '@/utils/get-distances-between-coordirnates'

export class InMemoryGymRepository implements GymRepository {
  public items: Gym[] = []

  async findById(gymId: string) {
    const gym = this.items.find((item) => item.id === gymId)

    if (!gym) {
      return null
    }

    return gym
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
    }

    this.items.push(gym)

    return gym
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    return this.items
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  async findManyNearby(data: FindManyNearby): Promise<Gym[]> {
    return this.items.filter((items) => {
      const distance = getDistanceBetweenCoordinates(
        {
          latitude: data.latitude,
          longitude: data.longitude,
        },
        {
          latitude: items.latitude.toNumber(),
          longitude: items.longitude.toNumber(),
        },
      )

      return distance < 10
    })
  }
}
