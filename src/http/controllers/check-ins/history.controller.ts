import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { MakeFetchMembersCheckInHistoryUseCase } from '@/use-cases/factories/make-fetch-member-check-ins-history-use-case'

export async function history(req: FastifyRequest, reply: FastifyReply) {
  const ckeckInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = ckeckInHistoryQuerySchema.parse(req.query)

  const fetchMembersChckInsHistory = MakeFetchMembersCheckInHistoryUseCase()

  const { checkIns } = await fetchMembersChckInsHistory.execute({
    user_id: req.user.sub,
    page,
  })

  return reply.status(200).send({
    checkIns,
  })
}
