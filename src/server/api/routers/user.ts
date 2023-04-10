import * as _ from "lodash";
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
    _.pick(user, ["image", "name", "display_name"]);
    return user;
  }),
});
