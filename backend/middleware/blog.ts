import { PrismaClient } from "@prisma/client/extension";
import {
  blogPost,
  blogPostT,
  blogPut,
  blogPutT,
  HttpStatus,
} from "@finish66/medium-common";
import { createMiddleware } from "hono/factory";

export const blogPostMiddleware = createMiddleware(async (c, next) => {
  try {
    let body: blogPostT;
    try {
      body = await c.req.json();
    } catch {
      return c.json(
        { success: false, error: "Invalid JSON body" },
        HttpStatus.BAD_REQUEST
      );
    }

    const parsedBody = blogPost.safeParse(body);
    if (!parsedBody.success) {
      return c.json(
        {
          success: false,
          error: `${parsedBody.error.issues[0].path[0]}: ${parsedBody.error.issues[0].message}`,
        },
        HttpStatus.BAD_REQUEST
      );
    }
    c.set("body", body);
    await next();
  } catch (error) {
    console.log("Error in BlogRouter Post: ", error);
    return c.json(
      {
        success: false,
        error: "Internal Server Error",
      },
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
});

export const blogPutMiddleware = createMiddleware(async (c, next) => {
  try {
    const blogId = c.req.param("id");
    if (!blogId) {
      return c.json(
        { success: false, error: "Blog ID is missing" },
        HttpStatus.BAD_REQUEST
      );
    }

    let body: blogPutT;
    try {
      body = await c.req.json();
    } catch {
      return c.json(
        { success: false, error: "Invalid JSON body" },
        HttpStatus.BAD_REQUEST
      );
    }

    const parsedBody = blogPut.safeParse(body);
    if (!parsedBody.success) {
      return c.json(
        {
          success: false,
          error: `${parsedBody.error.issues[0].path[0]}: ${parsedBody.error.issues[0].message}`,
        },
        HttpStatus.BAD_REQUEST
      );
    }

    c.set("body", body);
    await next();
  } catch (error) {
    console.error("Error in blogPutMiddleware: ", error);
    return c.json(
      {
        success: false,
        error: "Internal Server Error",
      },
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
});
