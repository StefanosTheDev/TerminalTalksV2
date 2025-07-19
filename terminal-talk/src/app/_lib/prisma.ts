// app/_lib/prisma.ts
import { config } from 'dotenv';
config();

import { PrismaClient } from '@prisma/client';

console.log('⛔️ [prisma] DATABASE_URL=', process.env.DATABASE_URL);

const globalForPrisma = global as unknown as { prisma?: PrismaClient };
export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
