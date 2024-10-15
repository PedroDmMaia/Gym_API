import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { MakeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-in-use-case'

export async function validate(req: FastifyRequest, reply: FastifyReply) {
  const ValidateCheckInsParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = ValidateCheckInsParamsSchema.parse(req.params)

  const validateCheckInUseCase = MakeValidateCheckInUseCase()

  await validateCheckInUseCase.validate({
    checkInId,
  })

  return reply.status(204).send()
}
