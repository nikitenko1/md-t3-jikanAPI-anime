import { router } from "../trpc";
import { authRouter } from "./auth";
import { favouriteRouter } from "./favourite";
import { watchLaterRouter } from "./watchLater";
// import { exampleRouter } from "./example";

export const appRouter = router({
  // example: exampleRouter,
  auth: authRouter,
  favourite: favouriteRouter,
  watchLater: watchLaterRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
