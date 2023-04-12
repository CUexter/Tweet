import _ from "lodash";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const UserRouter = createTRPCRouter({
  listUser: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany({
      select: {
        display_name: true,
        id: true,
        profile_picture: true,
      },
    });
  }),
  searchUser: publicProcedure
    .input(z.object({ searchTerm: z.string() }))
    .query(({ ctx, input }) => {
      const searchTerm = input.searchTerm;
      return ctx.prisma.user.findMany({
        where: {
          OR: [
            {
              display_name: {
                contains: searchTerm,
              },
            },
            {
              name: {
                contains: searchTerm,
              },
            },

            {
              tag_name: {
                contains: searchTerm,
              },
            },
            {
              id: {
                contains: searchTerm,
              },
            },
          ],
        },
        select: {
          display_name: true,
          tag_name: true,
          name: true,
          image: true,
          profile_desc: true,
          id: true,
        },
      });
    }),

  getMyInfo: protectedProcedure.query(({ ctx }) => {
    const user = ctx.user;
    _.omit(user, ["password"]);
    return user;
  }),

  getMyHeaderInfo: protectedProcedure.query(({ ctx }) => {
    const user = ctx.user;
    _.pick(user, ["image", "name", "display_name", "is_admin"]);
    return user;
  }),

  checkDuplicateTag: publicProcedure
    .input(z.object({ tag_name: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          tag_name: input.tag_name,
        },
      });
      return user ? true : false;
    }),

  checkNewUser: protectedProcedure.query(({ ctx }) => {
    return ctx.user.tag_name ? true : false;
  }),

  getUserInfo: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findUnique({
        where: {
          id: input.id,
        },
        select: {
          profile_desc: true,
          profile_picture: true,
          is_admin: true,
          display_name: true,
          tag_name: true,
          image: true,
          emailVisibility: true,
          email: true,
          _count: {
            select: {
              following: true,
              being_followed: true,
              Tweet: { where: { original_tweet: null } },
            },
          },
        },
      });
    }),

  createNewUserInfo: protectedProcedure
    .input(
      z.object({
        display_name: z.string().min(2).max(30),
        tag_name: z.string(),
        emailVisibility: z.boolean(),
        email: z.string().email(),
        profile_desc: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.user;
      user.display_name = input.display_name;
      user.tag_name = input.tag_name;
      user.emailVisibility = input.emailVisibility;
      user.email = input.email;
      user.profile_desc = input.profile_desc;
      const updateUser = await ctx.prisma.user.update({
        where: {
          id: user.id,
        },
        data: user,
      });
      return updateUser;
    }),

  updateUserInfo: protectedProcedure
    .input(
      z.object({
        display_name: z.string().min(2).max(30),
        emailVisibility: z.boolean(),
        email: z.string().email(),
        profile_desc: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.user;
      user.display_name = input.display_name;
      user.emailVisibility = input.emailVisibility;
      user.email = input.email;
      user.profile_desc = input.profile_desc;
      const updateUser = await ctx.prisma.user.update({
        where: {
          id: user.id,
        },
        data: user,
      });
      return updateUser;
    }),
});
