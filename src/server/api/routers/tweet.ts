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
  // API for posting tweets (both regular and reply)
  createTweet: protectedProcedure
    .input(
      z.object({
        user_id: z.string(),
        is_public: z.boolean(),
        TweetText: z.object({
          tweet_text: z.string(),
        }),
        original_id: z.string().optional(),
        images: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      let data: Prisma.TweetUncheckedCreateInput = {
        user_id: input.user_id,
        is_public: input.is_public,
        published_at: new Date(),
        TweetText: {
          create: {
            tweet_text: input.TweetText.tweet_text,
          },
        },
      };
      data =
        input.original_id === undefined
          ? data
          : { ...data, original_id: input.original_id };

      data =
        input.images && input.images.length > 0
          ? {
              ...data,
              TweetAttachments: {
                create: input.images.map((i) => ({
                  attachment_type: "image",
                  attachment_url: i,
                })),
              },
            }
          : data;
      const tweet = await ctx.prisma.tweet.create({
        data: data,
      });

      return {
        message: "Tweet created successfully",
        success: true,
        id: tweet.id,
      };
    }),
});
