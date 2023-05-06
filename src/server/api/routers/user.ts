import _ from "lodash";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const UserRouter = createTRPCRouter({
  listUser: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany({
      select: {
        display_name: true,
        id: true,
        tag_name: true,
        email: true,
        image: true,
        created_at: true,
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
            {
              email: {
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
  // Return user's basic info if the tag_name is found
  findUser: publicProcedure
    .input(
      z.object({
        tag_name: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { tag_name } = input;
      const target = await ctx.prisma.user.findUnique({
        select: {
          display_name: true,
          id: true,
          tag_name: true,
          email: true,
          image: true,
        },
        where: {
          tag_name: tag_name,
        },
      });
      return target;
    }),

  // Return user's basic info if the email is found
  findEmail: publicProcedure
    .input(
      z.object({
        email: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { email } = input;
      const target = await ctx.prisma.user.findUnique({
        select: {
          id: true,
        },
        where: {
          email: email,
        },
      });
      return target;
    }),

  getMyInfo: protectedProcedure.query(({ ctx }) => {
    const user = ctx.user;
    _.omit(user, ["password"]);
    return user;
  }),

  getFollowing: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.following.findMany({
        where: {
          doing_following_ID: input.id,
        },
      });
    }),

  // Update user display name by searching their unique id in the db
  updateName: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      const { id, name } = input;
      console.log("New Name:" + id);
      if (id !== null) {
        return ctx.prisma.user.update({
          where: {
            id: id,
          },
          data: {
            display_name: name,
          },
        });
      }
    }),

  // Update user tag name by searching their unique id in the db
  updateTagName: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        tag_name: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      const { id, tag_name } = input;
      console.log("New Name:" + id);
      if (id !== null) {
        return ctx.prisma.user.update({
          where: {
            id: id,
          },
          data: {
            tag_name: tag_name,
          },
        });
      }
    }),

  // Update user display name by searching their unique id in the db
  updateEmail: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        email: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      const { id, email } = input;
      console.log("New Name:" + id);
      if (id !== null) {
        return ctx.prisma.user.update({
          where: {
            id: id,
          },
          data: {
            email: email,
          },
        });
      }
    }),

  // Update user password (need to be hashed first) by searching their unique id in the db
  updatePassword: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        password: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      const { id, password } = input;
      console.log("New Name:" + id);
      if (id !== null) {
        return ctx.prisma.user.update({
          where: {
            id: id,
          },
          data: {
            password: password,
          },
        });
      }
    }),

  // Prerequisites for deleting a user (need to delete sequentially to prevent errors)
  // Delete a user's all related tweets
  deleteRelatedTweet: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      return await ctx.prisma.tweet.deleteMany({
        where: {
          user_id: id,
        },
      });
    }),

  // Delete a user's session
  deleteUserSession: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      const { id } = input;
      console.log("Target: " + id);
      if (id !== null) {
        return ctx.prisma.user.delete({
          where: {
            id: id,
          },
        });
      }
    }),

  // Delete a user
  deleteUser: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      const { id } = input;
      console.log("Target: " + id);
      if (id !== null) {
        return ctx.prisma.user.delete({
          where: {
            id: id,
          },
        });
      }
    }),
  // End of delete operation

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
        profile_desc: z.string(),
        image: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.user;
      user.display_name = input.display_name;
      user.tag_name = input.tag_name;
      user.emailVisibility = input.emailVisibility;
      user.profile_desc = input.profile_desc;
      user.image = input.image || "";
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
        profile_picture: z.string(),
        image: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.user;
      user.display_name = input.display_name || user.display_name;
      user.emailVisibility = input.emailVisibility || user.emailVisibility;
      user.email = input.email || user.email;
      user.profile_desc = input.profile_desc || user.profile_desc;
      user.profile_picture = input.profile_picture || "";
      user.image = input.image || "";
      const updateUser = await ctx.prisma.user.update({
        where: {
          id: user.id,
        },
        data: user,
      });
      return updateUser;
    }),
});
