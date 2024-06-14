import { createPrismaClient } from "../database/db";
import { HttpStatus } from "@finish66/medium-common";
import { createMiddleware } from "hono/factory";

export const prismaConnectionMiddleware = createMiddleware(async (c, next) => {
  // console.log("Prisma Connection Middleware");
  const dbUrl = c.env.DATABASE_URL;
  if (!dbUrl) {
    console.log("Configuration Error: ");
    return c.json(
      { success: false, error: "Configuration error" },
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
  const prisma = createPrismaClient(dbUrl);
  c.set("prisma", prisma);
  try {
    await next();
  } finally {
    await prisma.$disconnect();
  }
});
