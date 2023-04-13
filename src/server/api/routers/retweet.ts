import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const RetweetRouter = createTRPCRouter({
  retweet: protectedProcedure
    .input(z.object({ tid: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const tweet = await ctx.prisma.tweet.findFirst({
        where: {
          id: input.tid,
          retweeted_by: {
            some: {
              id: ctx.user.id,
            },
          },
        },
      });

      const data = tweet
        ? { disconnect: [{ id: input.tid }] }
        : { connect: [{ id: input.tid }] };

      await ctx.prisma.user.update({
        where: {
          id: ctx.user.id,
        },
        data: {
          Retweet: data,
        },
      });
      const response = tweet ? "unretweet" : "retweet";
      return { uid: ctx.user.id, id: input.tid, response };
    }),
});
