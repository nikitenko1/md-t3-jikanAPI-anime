import { Anime, ISavedResp } from "../interface";
import { trpc } from "utils/trpc";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";

const useFavourites = (anime: Anime) => {
  const router = useRouter();
  const utils = trpc.useContext();

  const { status } = useSession();
  const [favorited, setFavorited] = useState(false);

  const { data: favourites } = trpc.favourite.getUserFavourites.useQuery();
  const { mutateAsync: addFavorite } = trpc.favourite.addFavorite.useMutation({
    onSettled: async () => {
      await utils.favourite.getUserFavourites.invalidate();
    },
  });
  const { mutateAsync: deleteFavorite } =
    trpc.favourite.deleteFavourite.useMutation({
      onSettled: async () => {
        await utils.favourite.getUserFavourites.invalidate();
      },
    });

  const addedToFavourites = favourites?.find(
    (favourite: ISavedResp) => favourite.malId === anime?.mal_id
  );

  const handleAddFavourite = async () => {
    if (status === "authenticated") {
      setFavorited(true);
      await toast.promise(
        addFavorite({
          title: anime.title,
          malId: anime.mal_id,
          imageUrl: anime.images.jpg.large_image_url,
          type: anime.type,
        }),
        {
          loading: "Adding to favorites",
          success: "Added to favorites",
          error: (err) => "Ooops somethin went wrong..." + err,
        }
      );
      router.push("/user/favourites", undefined, { shallow: true });
    } else {
      signIn("github");
    }
  };

  const handleDeleteFavourite = async () => {
    if (status === "authenticated") {
      setFavorited(false);
      await toast.promise(
        deleteFavorite({ malId: addedToFavourites?.malId as number }),
        {
          loading: "Deleting from favorites",
          success: "Deleted from favorites",
          error: (err) => "Ooops somethin went wrong..." + err,
        }
      );
    } else {
      signIn("github");
    }
  };

  return {
    favorited,
    handleAddFavourite,
    handleDeleteFavourite,
    addedToFavourites,
  };
};

export default useFavourites;
