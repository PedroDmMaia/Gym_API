import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { MaKeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const createCheckInsParamsSchema = z.object({
    gymId: z.string().uuid(),
  })

  const createCheckInBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = createCheckInBodySchema.parse(req.body)
  const { gymId } = createCheckInsParamsSchema.parse(req.params)

  const checkInUseCase = MaKeCheckInUseCase()

  await checkInUseCase.create({
    gymId,
    user_id: req.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(201).send()
}
