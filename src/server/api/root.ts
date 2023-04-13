import { AuthRouter } from "./routers/auth";
import { exampleRouter } from "./routers/example";
import { FollowRouter } from "./routers/follow";
import { RetweetRouter } from "./routers/retweet";
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
  retweet: RetweetRouter,
  follow: FollowRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
