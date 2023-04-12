import bcrypt from "bcrypt";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const AuthRouter = createTRPCRouter({
  registerUser: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(8),
        name: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { email, password, name } = input;

      // Check if the user already exists
      const existingUser = await ctx.prisma.user.findFirst({
        where: {
          OR: [
            {
              email: email,
            },
            {
              name: name,
            },
          ],
        },
      });
      if (existingUser) {
        throw new Error("A user with this email/name already exists");
      }

      // Salt and hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create the user
      const newUser = await ctx.prisma.user.create({
        data: { email, password: hashedPassword, name },
      });

      return {
        message: "User registered successfully",
        success: true,
        userId: newUser.id,
      };
    }),
});
