import { PrismaClient } from './prisma/generated'

// Add the prisma to the NodeJS global type
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

// Prevent multiple instances of Prisma Client in development
const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}

export default prisma 