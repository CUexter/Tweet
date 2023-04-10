import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const FollowingRouter = createTRPCRouter({
  following: publicProcedure
    .input(
      z.object({
        being_followed_ID: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const result = await ctx.prisma.following.create({
        data: {
          doing_following_ID: "123",
          being_followed_ID: "456",
        },
      });
      return result;
    }),
  checkFollowing: publicProcedure
    .input(
      z.object({
        doing_following_ID: z.string(),
        being_followed_ID: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { doing_following_ID, being_followed_ID } = input;
      const obj = await ctx.prisma.following.findFirst({
        where: {
          doing_following_ID: doing_following_ID,
          being_followed_ID: being_followed_ID,
        },
      });
      return obj;
    }),
  unFollowing: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id } = input;

      const result = await ctx.prisma.following.delete({
        where: { id: id },
      });
      return result;
    }),
});
