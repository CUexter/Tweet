import { prisma } from "@/server/db";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const ProfileRouter = createTRPCRouter({
  getProfile: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const profile = await prisma.user.findUnique({
        where: {
          id: input.id,
        },
        //include: {}
      });

      if (!profile) {
        return null;
      }
      return profile.email;
    }),

  getPrivateTweet: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const post = await ctx.prisma.tweet.findUnique({
        where: {
          id: input.id,
        },
        include: {},
      });

      if (!post) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      return post;
    }),
});
