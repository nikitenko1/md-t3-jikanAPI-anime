import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Anime, ISavedResp } from "interface";
import { trpc } from "utils/trpc";
import { toast } from "react-hot-toast";

const useWatchLater = (anime: Anime) => {
  const { status } = useSession();
  const [watchLaterClicked, setWatchLaterClicked] = useState<boolean>(false);

  const utils = trpc.useContext();
  const router = useRouter();

  const { data: watchLater } = trpc.watchLater.getWatchLater.useQuery();
  const addedToWatchLater = watchLater?.find(
    (watchLater: ISavedResp) => watchLater.malId === anime?.mal_id
  );

  const { mutateAsync: addWatchLater } =
    trpc.watchLater.addWatchLater.useMutation({
      // Always refetch after error or success:
      onSettled: async () => {
        await utils.watchLater.getWatchLater.invalidate();
      },
    });

  const { mutateAsync: deleteWatchLater } =
    trpc.watchLater.deleteWatchLater.useMutation({
      // Always refetch after error or success:
      onSettled: async () => {
        await utils.watchLater.getWatchLater.invalidate();
      },
    });

  const handleAddWatchLater = async () => {
    if (status === "authenticated") {
      setWatchLaterClicked(true);

      //   z.object({
      //     type: z.string(),
      //     title: z.string(),
      //     imageUrl: z.string(),
      //     malId: z.number(),
      //   })
      await toast.promise(
        addWatchLater({
          type: anime.type,
          title: anime.title,
          imageUrl: anime.images.jpg.large_image_url,
          malId: anime.mal_id,
        }),
        {
          loading: "Adding to watch later",
          success: "Added to watch later",
          error: (err) => "Ooops somethin went wrong..." + err,
        }
      );

      router.push("/user/watchLater", undefined, { shallow: true });
    } else {
      signIn("github");
    }
  };

  const handleDeleteWatchLater = async () => {
    if (status === "authenticated") {
      setWatchLaterClicked(false);

      await toast.promise(
        deleteWatchLater({ malId: addedToWatchLater?.malId as number }),
        {
          loading: "Deleting from watch later",
          success: "Deleted from watch later",
          error: (err) => "Ooops somethin went wrong..." + err,
        }
      );
    } else {
      signIn("github");
    }
  };

  return {
    watchLaterClicked,
    handleDeleteWatchLater,
    handleAddWatchLater,
    addedToWatchLater,
  };
};

export default useWatchLater;
