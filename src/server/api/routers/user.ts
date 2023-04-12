import * as _ from "lodash";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const UserRouter = createTRPCRouter({
  listUser: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany({
      select: {
        name: true,
        id: true,
        tag_name: true,
        email: true,
        profile_picture: true,
      },
    });
  }),

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
          name: true,
          id: true,
          tag_name: true,
          email: true,
          profile_picture: true,
        },
        where: {
          tag_name: tag_name,
        },
      });
      return target;
    }),

  deleteUser: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      const { id } = input;
      console.log("Target: " + id);
      if (id !== null) {
        return ctx.prisma.user.deleteMany({
          where: {
            id: id,
          },
        });
      }
    }),

  getMyInfo: protectedProcedure.query(({ ctx }) => {
    const user = ctx.user;
    _.omit(user, ["password"]);
    return user;
  }),

  getMyHeaderInfo: protectedProcedure.query(({ ctx }) => {
    const user = ctx.user;
    _.pick(user, ["image", "name", "display_name"]);
    return user;
  }),
});
