import { hash } from 'bcryptjs'

interface RegisterUseCaserequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersRepository: any) {}

  async create({ name, email, password }: RegisterUseCaserequest) {

    const password_hash = await hash(password, 6)

    const userWithSameEmail = this.usersRepository.findUserByEmail(email)

    if (!userWithSameEmail) {
      throw new Error('E-mail already exists.')
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
