import { usersRepository } from '@/repositories/users.respository'
import { User } from '@prisma/client'
import { ResourceNotFound } from './errors/resource-not-found.error'

interface GetUserProfileUseCaseRequest {
  userId: string
}

interface GetUserProfileUseCaseResponse {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: usersRepository) {}

  async authenticate({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findByUserId(userId)

    if (!user) {
      throw new ResourceNotFound()
    }

    return { user }
  }
}
