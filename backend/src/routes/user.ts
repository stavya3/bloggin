import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { signupInput } from "@powerfulquarter/medium-blog";
import { signinInput } from "@powerfulquarter/medium-blog";

export const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string
        jwt_password: string
    }
}>();


userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json();


    const { success } = signupInput.safeParse(body);

    if (!success){
      c.status(403);
      return c.json({
        message:"Inputs not correct"
      })
    }


    try {
      const user = await prisma.user.create({
        data: {
          email: body.email,
          password: body.password
        },
      })
      const token = await sign({id: user.id}, "mysecretpassword")
      return c.json({token});
    } catch(e){
      c.status(403);
      return c.json({error:"error while signing up!"})
    }
  })
  
userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if (!success){
      c.status(411);
      return c.json({
        message:"Inputs not correct"
      })
    }
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: body.email,
          password: body.password
        }
      });
      if (!user){
        c.status(403);
        return c.json({error: "User not found"})
      }
      const jwt = await sign({ id:user.id }, c.env.jwt_password);
      return c.json({ jwt });
    } catch (e) {
      c.status(403);
      return c.json({error: "Error while signing in!"})
    }
  })