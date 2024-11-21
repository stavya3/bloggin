import { Hono } from "hono";
import { Prisma, PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { createBlogInput } from "@powerfulquarter/medium-blog";
import { updateBlogInput } from "@powerfulquarter/medium-blog";

export const blogRouter = new Hono<{
    Bindings: {
        jwt_password: string
        DATABASE_URL: string
    }
    Variables: {
        userId: string
        
    }
}>();



blogRouter.use('/*', async (c, next) => {
    // get the header
    const header = c.req.header("authorization") || "";
    // const token = header.split(" ")[1];
    // verify the header
    
  
    // if the header is correct, we proceed
    try {
        const user = await verify(header, c.env.jwt_password);
        if (user){
            c.set("userId", String(user.id));
            await next();
        }
    } catch (e) {
        
      c.status(403);
      return c.json({ error:"You are not logged in" });
     
    }
     
    // if not we return the user a 403 status code
    
  
})

blogRouter.post('/', async (c) => {
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if (!success){
      c.status(411);
      return c.json({
        message:"Inputs not correct"
      })
    }
    const userId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

      const blog = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: userId
        },
      })
    return c.json({
        id: blog.id
    })
})
  
blogRouter.put('/', async (c) => {
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if (!success){
      c.status(411);
      return c.json({
        message:"Inputs not correct"
      })
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

      const blog = await prisma.post.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content,
             
        },
      })
    return c.json({
        id: blog.id
    })
    
})
  
blogRouter.get('/:id', async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

      try {
        const blog = await prisma.post.findFirst({
            where: {
                id: id
            }
    
          })
        return c.json({
            blog
        })
      } catch (e) {
         c.status(403);
         return c.json({
            message: "Error while fetching the blog post!"
         })
      }
      
})

blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,

    }).$extends(withAccelerate())

    
        const blogs = await prisma.post.findMany({
          select: {
            content: true,
            title: true,
            id: true,
            author: {
              select: {
                name: true
              }
            }
          }
        });
        return c.json({
            blogs 
        })
     
})