import { Hono } from "hono";
import { userRouter } from "../routes/user.routs";
import { blogRouter } from "../routes/blog.routes";
import { prismaConnectionMiddleware } from "../middleware/db";
import { cors } from "hono/cors";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: String;
    JWT_SECRET: String;
  };
}>();

app.use(cors());
app.use(prismaConnectionMiddleware);
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);
app.get("/", (c) => c.text("Hello Hono!"));

export default app;
