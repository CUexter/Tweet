import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const LikeRouter = createTRPCRouter({
  like: protectedProcedure
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
          is_liked: true,
        },
      });
      return result;
    }),
  checkLike: protectedProcedure
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
          is_liked: true,
        },
      });
      return obj;
    }),
  unLike: protectedProcedure
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
  dislike: protectedProcedure
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
          is_liked: false,
        },
      });
      return result;
    }),
  checkDislike: protectedProcedure
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
          is_liked: false,
        },
      });
      return obj;
    }),
  undislike: protectedProcedure
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
  checkCount: publicProcedure
    .input(
      z.object({
        tweet_id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const obj3 = await ctx.prisma.like.findMany({
        where: {
          tweet_id: input.tweet_id,
          is_liked: true,
        },
      });
      const obj4 = await ctx.prisma.like.findMany({
        where: {
          tweet_id: input.tweet_id,
          is_liked: false,
        },
      });

      return obj3.length - obj4.length;
    }),
});
