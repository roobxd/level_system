import { PrismaClient } from "@prisma/client";

// One single prisma client
const prismaClient = new PrismaClient();

export default prismaClient;