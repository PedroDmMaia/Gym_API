import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { MakeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case'

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { title, phone, description, latitude, longitude } =
    createGymBodySchema.parse(req.body)

  const createGymUseCase = MakeCreateGymUseCase()

  await createGymUseCase.create({
    title,
    phone,
    description,
    latitude,
    longitude,
  })

  return reply.status(201).send()
}
