import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const ReplyRouter = createTRPCRouter({
  reply: publicProcedure
    .input(
      z.object({
        tweet_text: z.string(), //tweet text passed from client side
      })
    )
    .mutation(async ({ input, ctx }) => {
      const tweet = await ctx.prisma.tweet.create({
        data: {
          user_id: "123", //hardcode for now, the user who are doing retweeting action
          is_public: true, //simply set it as public
        },
      });
      const result = await ctx.prisma.tweetText.create({
        data: {
          tweet_text: input.tweet_text, //the reply text
          tweet_id: tweet.id, // where the text belongs to
        },
      });
      const result1 = await ctx.prisma.retweet.create({
        data: {
          retweet_id: result.tweet_id, //we also use retweet database to store reply
          original_tweet_id: "1234", //hardcode for now, don't know how to get
          on_profile: false, //indicating it is reply
        },
      });
      return result1; //return the reply relation created
    }),
});
