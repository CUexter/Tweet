import { exampleRouter } from "./routers/example";
import { FollowingRouter } from "./routers/following";
import { LikeRouter } from "./routers/like";
import { ReplyRouter } from "./routers/reply";
import { RetweetRouter } from "./routers/retweet";
import { createTRPCRouter } from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  retweet: RetweetRouter,
  following: FollowingRouter,
  reply: ReplyRouter,
  like: LikeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
