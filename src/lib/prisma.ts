import { PrismaClient } from './prisma/generated'

// Add the prisma to the NodeJS global type
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

const prismaClientPropertyName = '__prevent_name_collision__prisma'
type GlobalThisWithPrisma = typeof globalThis & {
  [prismaClientPropertyName]: PrismaClient
}

const getPrismaClient = () => {
  if (process.env.NODE_ENV === 'production') {
    return new PrismaClient()
  } else {
    const globalThisWithPrisma = globalThis as GlobalThisWithPrisma
    if (!globalThisWithPrisma[prismaClientPropertyName]) {
      globalThisWithPrisma[prismaClientPropertyName] = new PrismaClient()
    }
    return globalThisWithPrisma[prismaClientPropertyName]
  }
}

const prisma = getPrismaClient()

export default prisma 