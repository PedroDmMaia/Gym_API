import 'dotenv/config'
import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'
import { Environment } from 'vitest'

function generateDataBaseUrl(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('please provider a DATABASE_URL environment variable')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  async setup() {
    const schema = randomUUID()
    const database = generateDataBaseUrl(schema)

    process.env.DATABASE_URL = database

    execSync('npx prisma migrate deploy')

    return {
      async teardown() {
        console.log('Teardown')
      },
    }
  },
}
