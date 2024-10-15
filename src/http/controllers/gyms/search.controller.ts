import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { MakeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case'

export async function search(req: FastifyRequest, reply: FastifyReply) {
  const searchGymsQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { q, page } = searchGymsQuerySchema.parse(req.query)

  const createGymUseCase = MakeSearchGymsUseCase()

  const { gyms } = await createGymUseCase.search({
    query: q,
    page,
  })

  return reply.status(200).send({
    gyms,
  })
}
