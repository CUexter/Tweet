import { TweetInfoIncludes } from "@/utils/queryData";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const TweetRouter = createTRPCRouter({
  getTweet: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const post = await ctx.prisma.tweet.findUnique({
        where: {
          id: input.id,
        },
        include: TweetInfoIncludes,
      });

      if (!post) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      if (!post.is_public) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      return post;
    }),

  getPrivateTweet: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const post = await ctx.prisma.tweet.findUnique({
        where: {
          id: input.id,
        },
        include: TweetInfoIncludes,
      });

      if (!post) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      return post;
    }),
});
