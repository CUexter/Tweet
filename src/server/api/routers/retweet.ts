import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const RetweetRouter = createTRPCRouter({
  retweet: publicProcedure
    .input(
      z.object({
        original_tweet_id: z.string(), //in following.page.tsx, original tweet id is passed here
      })
    )
    .mutation(async ({ input, ctx }) => {
      const retweet = await ctx.prisma.tweet.create({
        data: {
          user_id: "123", //the user who are doing retweeting action
          is_public: true, //simply set it as public
        },
      });
      const result = await ctx.prisma.retweet.create({
        data: {
          original_tweet_id: input.original_tweet_id, //we get original tweet id from the following.page.tsx?
          retweet_id: retweet.id, //getting the id of the tweet created above
          on_profile: true, //as it is a retweet not reply
        },
      });
      return result; //return the retweet relation created
    }),
  checkRetweet: publicProcedure
    .input(
      z.object({
        original_tweet_id: z.string(),
        user_id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { original_tweet_id, user_id } = input;
      const obj = await ctx.prisma.tweet.findFirst({
        //find if there exist a tweet that is retweeting to the original tweet id
        where: {
          Retweeting_to: {
            some: {
              original_tweet_id: original_tweet_id,
              on_profile: true,
            },
          },
          user_id,
        },
      });
      return obj;
    }),
  deleteRetweet: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id } = input;
      await ctx.prisma.retweet.deleteMany({
        where: {
          retweet_id: id, //deleting the retweet relation when retweet_id matches with the id of the retweet in tweet database
          on_profile: true, //make sure it is a retweet
        },
      });
      const result = await ctx.prisma.tweet.delete({
        where: { id: id }, //deleting that retweet in tweet database
      });
      return result;
    }),
});
