import { FastifyRequest, FastifyReply } from 'fastify'
import { MakeGetUserMetricsUseCase } from '@/use-cases/factories/make-get-user-metrics-use-case'

export async function metrics(req: FastifyRequest, reply: FastifyReply) {
  const getUserMetricsUseCase = MakeGetUserMetricsUseCase()

  const { checkInsCount } = await getUserMetricsUseCase.execute({
    user_id: req.user.sub,
  })

  return reply.status(200).send({
    checkInsCount,
  })
}
