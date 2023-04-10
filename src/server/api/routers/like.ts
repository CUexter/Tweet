import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const LikeRouter = createTRPCRouter({
  like: publicProcedure
    .input(
      z.object({
        user_id: z.string(),
        tweet_id: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const result = await ctx.prisma.like.create({
        data: {
          user_id: input.user_id,
          tweet_id: input.tweet_id,
        },
      });
      return result;
    }),
  checkLike: publicProcedure
    .input(
      z.object({
        user_id: z.string(),
        tweet_id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const obj = await ctx.prisma.like.findFirst({
        where: {
          user_id: input.user_id,
          tweet_id: input.tweet_id,
        },
      });
      return obj;
    }),
  unLike: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id } = input;

      const result = await ctx.prisma.like.delete({
        where: { id: id },
      });
      return result;
    }),
});
