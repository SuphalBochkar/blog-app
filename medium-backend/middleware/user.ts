import {
  HttpStatus,
  signInBody,
  userZodSignupT,
  userZodSignup,
} from "@finish66/medium-common";
import { createMiddleware } from "hono/factory";

export const signupMiddleware = createMiddleware(async (c, next) => {
  try {
    const dbUrl = c.env.DATABASE_URL;
    const secret = c.env.JWT_SECRET;

    if (!dbUrl || !secret) {
      return c.json(
        { success: false, error: "Configuration error" },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    let body: userZodSignupT;
    try {
      body = await c.req.json();
    } catch {
      return c.json(
        { success: false, error: "Invalid JSON body" },
        HttpStatus.BAD_REQUEST
      );
    }

    const parsedBody = userZodSignup.safeParse(body);
    if (!parsedBody.success) {
      return c.json(
        {
          success: false,
          error: `${parsedBody.error.issues[0].path[0]}: ${parsedBody.error.issues[0].message}`,
        },
        HttpStatus.BAD_REQUEST
      );
    }

    const prisma = c.get("prisma");
    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (existingUser) {
      prisma.$disconnect();
      return c.json(
        {
          success: false,
          error: "User with this email already exists. Please login instead.",
        },
        HttpStatus.CONFLICT
      );
    }
    c.set("body", body);
    await next();
  } catch (error) {
    console.error("Error Signup Middleware:", error);
    return c.json(
      {
        success: false,
        error: "Internal Server Error",
      },
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
});

export const signinMiddleware = createMiddleware(async (c, next) => {
  try {
    const dbUrl = c.env.DATABASE_URL;
    const secret = c.env.JWT_SECRET;
    if (!dbUrl || !secret) {
      return c.json(
        { success: false, error: "Configuration error" },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    let body: signInBody;
    try {
      body = await c.req.json();
    } catch {
      return c.json(
        { success: false, error: "Invalid JSON body" },
        HttpStatus.BAD_REQUEST
      );
    }
    c.set("body", body);
    await next();
  } catch (error) {
    console.error("Error Signin Middleware:", error);
    return c.json(
      {
        success: false,
        error: "Internal Server Error",
      },
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
});
