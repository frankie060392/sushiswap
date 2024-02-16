import { PrismaClient } from '@prisma/client'
import { defaultPrismaClientOptions } from './common'

export { type DecimalToString } from './common.js'
export * from '@prisma/client'

export async function createClient(options = defaultPrismaClientOptions) {
  await import('dotenv/config')
  if (!process.env['DATABASE_URL']) throw new Error('DATABASE_URL is required')

  return new PrismaClient(options)
}
