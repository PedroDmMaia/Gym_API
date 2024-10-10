import { usersRepository } from '@/interface/users.interface'
import { UserAlreadyExistsError } from './errors/user-already-exists.error'
import { Gym } from '@prisma/client'
import bcrypt from 'bcryptjs'

interface CreateGymUseCaseRequest {
  titles: string
  descriptions: string | null
}

interface CreateGymUseCaseResponse {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private usersRepository: usersRepository) {}

  async create({
    name,
    email,
    password,
  }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
    const password_hash = await bcrypt.hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })

    return {
      user,
    }
  }
}
