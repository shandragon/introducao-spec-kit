import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:5432/${process.env.POSTGRES_DB}?schema=public`;

console.log("Usando DATABASE_URL:", connectionString);

const adapter = new PrismaPg({ connectionString: connectionString });

const prisma = new PrismaClient({ adapter });

export default prisma;
