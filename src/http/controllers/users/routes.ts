import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { authenticate } from './authenticate.controller'
import { profile } from './profile.controller'
import { register } from './register.controller'
import { FastifyInstance } from 'fastify'
import { refresh } from './refresh.controller'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
