import { z } from "zod";
import { router, protectedProcedure, publicProcedure } from "../trpc";

export const favouriteRouter = router({
  addFavorite: protectedProcedure
    .input(
      z.object({
        type: z.string(),
        title: z.string(),
        imageUrl: z.string(),
        malId: z.number(),
      })
    )
    .mutation(({ ctx, input }) => {
      const userId = ctx.session?.user.id;
      const { type, title, imageUrl, malId } = input;

      return ctx.prisma.favourite.create({
        data: {
          type: type as string,
          title: title as string,
          imageUrl: imageUrl as string,
          malId: malId as number,
          user: {
            connect: {
              id: userId as string,
            },
          },
        },
      });
    }),

  getUserFavourites: publicProcedure.query(({ ctx }) => {
    const userId = ctx?.session?.user?.id;

    return ctx.prisma.favourite.findMany({
      where: {
        userId: userId as string,
      },
    });
  }),

  deleteFavourite: protectedProcedure

    .input(z.object({ malId: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.favourite.delete({
        where: {
          malId_userId: {
            userId: ctx.session?.user?.id as string,
            malId: input?.malId,
          },
        },
      });
    }),
});
