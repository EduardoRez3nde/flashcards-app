import { PrismaClient } from "@prisma/client";

export const prisma: PrismaClient = new PrismaClient({
    log: ["error", "info", "query", "warn"]
});