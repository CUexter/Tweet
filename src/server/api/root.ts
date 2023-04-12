import { AuthRouter } from "./routers/auth";
import { exampleRouter } from "./routers/example";
<<<<<<< HEAD
import { FollowRouter } from "./routers/follow";
import { RetweetRouter } from "./routers/retweet";
=======
import { LikeRouter } from "./routers/like";
>>>>>>> 1cd083e (test: dislike)
import { TweetRouter } from "./routers/tweet";
import { UserRouter } from "./routers/user";
import { createTRPCRouter } from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  user: UserRouter,
  tweet: TweetRouter,
  auth: AuthRouter,
<<<<<<< HEAD
  retweet: RetweetRouter,
  follow: FollowRouter,
=======
  like: LikeRouter,
>>>>>>> 1cd083e (test: dislike)
});

// export type definition of API
export type AppRouter = typeof appRouter;
