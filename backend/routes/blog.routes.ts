import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/extension";
import { authControl } from "../middleware/authControl";
import { blogPostT, HttpStatus } from "@finish66/medium-common";
import { blogPostMiddleware, blogPutMiddleware } from "../middleware/blog";
import { withAccelerate } from "@prisma/extension-accelerate";

const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    prisma: PrismaClient;
    body: blogPostT;
    userId: string;
  };
}>();

blogRouter.use(authControl);

blogRouter.post("/", blogPostMiddleware, async (c) => {
  try {
    const body = c.get("body");
    const userId = c.get("userId");
    const prisma = c.get("prisma") as PrismaClient;

    const blogResponse = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
        published: body.published,
      },
    });

    return c.json({
      success: true,
      data: blogResponse,
      message: "Blog Post Created Successfully",
    });
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

blogRouter.put("/:id", blogPutMiddleware, async (c) => {
  try {
    const body = c.get("body");
    const userId = c.get("userId");
    const blogId = c.req.param("id");
    const prisma: PrismaClient = c.get("prisma") as PrismaClient;

    const existingBlog = await prisma.blog.findUnique({
      where: {
        id: blogId,
      },
    });

    if (!existingBlog || existingBlog.authorId !== userId) {
      return c.json(
        {
          success: false,
          message: "Invalid Blog ID",
        },
        HttpStatus.NOT_FOUND
      );
    }

    const blogResponse = await prisma.blog.update({
      where: {
        id: existingBlog.id,
      },
      data: {
        title: body.title || existingBlog.title,
        content: body.content || existingBlog.content,
        published:
          body.published !== undefined
            ? body.published
            : existingBlog.published,
      },
    });

    return c.json({
      success: true,
      data: blogResponse,
      message: "Blog Post Updated Successfully",
    });
  } catch (error) {
    console.error("Error in BlogRouter PUT: ", error);
    return c.json(
      {
        success: false,
        error: "Internal Server Error",
      },
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
});

blogRouter.get("/bulk", async (c) => {
  try {
    const prisma = c.get("prisma");
    const take = parseInt(c.req.query("take") || "10", 10);
    const skip = parseInt(c.req.query("skip") || "0", 10);

    const blogResponse = await prisma.blog.findMany({
      take,
      skip,
      select: {
        id: true,
        title: true,
        content: true,
        published: true,
        publishedDate: true,
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return c.json({
      success: true,
      data: blogResponse,
    });
  } catch (error) {
    console.error("Error in BlogRouter GET /bulk: ", error);
    return c.json(
      {
        success: false,
        error: "Internal Server Error",
      },
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
});

blogRouter.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    if (!id) {
      return c.json(
        {
          success: false,
          error: "Provide Blog ID",
        },
        HttpStatus.NOT_FOUND
      );
    }

    const prisma: PrismaClient = c.get("prisma") as PrismaClient;
    const blogResponse = await prisma.blog.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        published: true,
        publishedDate: true,
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!blogResponse) {
      return c.json(
        {
          success: false,
          error: "Blog Not Found",
        },
        HttpStatus.NOT_FOUND
      );
    }

    return c.json({
      success: true,
      data: blogResponse,
    });
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

export { blogRouter };
