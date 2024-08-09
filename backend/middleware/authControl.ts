import { verify } from "hono/jwt";
import { HttpStatus } from "@finish66/medium-common";
import { createMiddleware } from "hono/factory";

export const authControl = createMiddleware(async (c, next) => {
  try {
    console.log("AuthControl Middleware");
    const authorizationHeader = c.req.header("Authorization");
    if (!authorizationHeader) {
      return c.json(
        { success: false, error: "Authorization header missing" },
        HttpStatus.UNAUTHORIZED
      );
    }

    const token = authorizationHeader.split(" ")[1];
    if (!token) {
      return c.json(
        { success: false, error: "Token missing" },
        HttpStatus.UNAUTHORIZED
      );
    }

    try {
      const payload = await verify(token, c.env.JWT_SECRET);
      c.set("userId", payload.userId);
      await next();
    } catch (error) {
      console.log("Error AuthMiddleware: ", error);
      return c.json(
        { success: false, error: "Invalid token provided or Token expired" },
        HttpStatus.UNAUTHORIZED
      );
    }
  } catch (error) {
    console.error("Error in authControl middleware:", error);
    return c.json(
      { success: false, error: "Internal Server Error" },
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
});
