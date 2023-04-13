import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const FollowRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  handleFollow: protectedProcedure
    .input(z.object({ followee_id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { followee_id } = input;
      const { id: follower_id } = ctx.session.user;

      const existingInfo = await ctx.prisma.following.findFirst({
        where: {
          doing_following_ID: follower_id,
          being_followed_ID: followee_id,
        },
      });

      if (existingInfo !== null) {
        const unfollow = await ctx.prisma.following.delete({
          where: {
            id: existingInfo.id,
          },
        });
        return unfollow;
      } else {
        const follow = await ctx.prisma.following.create({
          data: {
            doing_following_ID: follower_id,
            being_followed_ID: followee_id,
          },
        });
        return follow;
      }
    }),
});
