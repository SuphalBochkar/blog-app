import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

// Use a different approach to access environment variables
// Assuming you are using Wrangler’s env binding

export function createPrismaClient(url: string) {
  return new PrismaClient({
    datasources: {
      db: {
        url: url,
      },
    },
  }).$extends(withAccelerate());
}
