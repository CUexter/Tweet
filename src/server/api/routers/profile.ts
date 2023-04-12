import { prisma } from "@/server/db";
import { z } from "zod";

import { ProfileInfo } from "../../../components/profile/ProfileInfoClass";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const ProfileRouter = createTRPCRouter({
  getProfile: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const profile = await prisma.user.findUnique({
        where: {
          id: input.id,
        },
        include: {
          following: true,
          being_followed: true,
          Tweet: true,
        },
      });
      if (!profile) {
        return null;
      }
      if (profile.display_name == null) profile.display_name = "";
      if (profile.tag_name == null) profile.tag_name = "";
      if (profile.profile_desc == null) profile.profile_desc = "";
      if (profile.profile_picture == null) profile.profile_picture = "";
      if (profile.image == null) profile.image = "";
      const follow = profile.following.length;
      const beingFollow = profile.being_followed.length;
      const tweet = profile.Tweet.length;
      return new ProfileInfo(
        profile.image,
        profile.profile_picture,
        profile.profile_desc,
        profile.tag_name,
        profile.display_name,
        follow,
        beingFollow,
        tweet
      );
    }),
  getEmail: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const profile = await prisma.user.findUnique({
        where: {
          id: input.id,
        },
      });
      if (profile == null || !profile.emailVisbility) return null;
      else return profile.email;
    }),
  setProfile: publicProcedure
    .input(
      z.object({
        displayName: z.string(),
        image: z.string(),
        tagName: z.string(),
        profileDesc: z.string(),
        profilePicture: z.string(),
      })
    )
    .mutation(async ({ input }) => {}),
});
