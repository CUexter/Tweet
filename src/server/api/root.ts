import { exampleRouter } from "./routers/example";
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
});

// export type definition of API
export type AppRouter = typeof appRouter;
