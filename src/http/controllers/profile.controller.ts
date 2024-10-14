import { MakeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function profile(req: FastifyRequest, reply: FastifyReply) {
  const getUserProfile = MakeGetUserProfileUseCase()

  const { user } = await getUserProfile.authenticate({
    userId: req.user.sub,
  })

  return reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  })
}
