import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const FollowRouter = createTRPCRouter({
  isFollowing: protectedProcedure
    .input(z.object({ followee_id: z.string() }))
    .query(({ ctx, input }) => {
      const { followee_id } = input;
      const { id: follower_id } = ctx.session.user;
      return ctx.prisma.following.findFirst({
        where: {
          doing_following_ID: follower_id,
          being_followed_ID: followee_id,
        },
      });
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

        if (!unfollow) {
          throw new Error("Something went wrong");
        }
        return { action: "unfollow" };
      } else {
        const follow = await ctx.prisma.following.create({
          data: {
            doing_following_ID: follower_id,
            being_followed_ID: followee_id,
          },
        });

        if (!follow) {
          throw new Error("Something went wrong");
        }
        return { action: "follow" };
      }
    }),
});
