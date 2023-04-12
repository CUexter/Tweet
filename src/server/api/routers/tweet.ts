import type { Prisma } from "@prisma/client";

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

  getLotTweets: publicProcedure
    .input(z.object({ filter: z.unknown() }))
    .query(async ({ ctx, input }) => {
      const filter = input.filter as Prisma.TweetWhereInput;
      const Ts = await ctx.prisma.tweet.findMany({
        where: filter,
        select: {
          id: true,
        },
      });

      return Ts;
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

  createTweet: protectedProcedure
    .input(
      z.object({
        user_id: z.string(),
        is_public: z.boolean(),
        TweetText: z.object({
          tweet_text: z.string(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const tweet = await ctx.prisma.tweet.create({
        data: {
          user_id: input.user_id,
          is_public: input.is_public,
          published_at: new Date(),
          TweetText: {
            create: {
              tweet_text: input.TweetText.tweet_text,
            },
          },
        },
      });
      return {
        message: "Tweet created successfully",
        success: true,
        id: tweet.id,
      };
    }),
});
