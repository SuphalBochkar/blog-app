import { Hono } from "hono";
import { sign } from "hono/jwt";
import {
  HttpStatus,
  userZodSignupT,
  userZodSignup,
} from "@finish66/medium-common";
import { signinMiddleware, signupMiddleware } from "../middleware/user";
import { PrismaClient } from "@prisma/client/extension";

const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    prisma: PrismaClient;
    body: userZodSignupT;
  };
}>();

userRouter.post("/signup", signupMiddleware, async (c) => {
  try {
    const secret = c.env.JWT_SECRET;
    const prisma = c.get("prisma") as PrismaClient;
    let body: userZodSignupT = c.get("body");
    console.log("Body:", body);
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body?.name,
      },
    });
    const token = await sign({ userId: user.id }, secret);
    return c.json(
      {
        success: true,
        data: { token },
        message: "User Signed Up Successfully",
      },
      HttpStatus.OK
    );
  } catch (error) {
    console.error("Error Signup:", error);
    return c.json(
      {
        success: false,
        error: "Internal Server Error",
      },
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
});

userRouter.post("/signin", signinMiddleware, async (c) => {
  try {
    const secret = c.env.JWT_SECRET;
    const prisma = c.get("prisma") as PrismaClient;
    let body: userZodSignupT = c.get("body");
    console.log("Body:", body);
    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });
    if (!user) {
      return c.json(
        {
          success: false,
          error: "User with this email does not exist. Please signup instead.",
        },
        HttpStatus.NOT_FOUND
      );
    }
    if (user.password !== body.password) {
      return c.json(
        {
          success: false,
          error: "Invalid Password",
        },
        HttpStatus.UNAUTHORIZED
      );
    }
    const token = await sign({ userId: user.id }, secret);
    return c.json(
      {
        success: true,
        data: { token },
        message: "User Signed In Successfully",
      },
      HttpStatus.OK
    );
  } catch (error) {
    console.error("Error Signin:", error);
    return c.json(
      {
        success: false,
        error: "Internal Server Error",
      },
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
});

export { userRouter };
