import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const RetweetRouter = createTRPCRouter({
  checkRetweet: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const tweet = await ctx.prisma.tweet.findFirst({
        where: {
          id: input.id,
          retweeted_by: {
            some: {
              id: ctx.user.id,
            },
          },
        },
      });
      return tweet ? true : false;
    }),
  retweet: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const tweet = await ctx.prisma.tweet.findFirst({
        where: {
          id: input.id,
          retweeted_by: {
            some: {
              id: ctx.user.id,
            },
          },
        },
      });

      const data = tweet
        ? { disconnect: [{ id: input.id }] }
        : { connect: [{ id: input.id }] };

      await ctx.prisma.user.update({
        where: {
          id: ctx.user.id,
        },
        data: {
          Retweet: data,
        },
      });
      const response = tweet ? "unretweet" : "retweet";
      return { uid: ctx.user.id, id: input.id, response };
    }),
});
