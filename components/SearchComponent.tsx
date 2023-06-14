import Image from "next/legacy/image";
import Link from "next/link";
import { useRouter } from "next/router";
import useFavourites from "hooks/useFavourites";
import { v4 } from "uuid";
import { useSession } from "next-auth/react";
import { Anime } from "interface";
import LineOverlay from "./LineOverlay";
import { trpc } from "utils/trpc";

const SearchComponent = ({ anime }: { anime: Anime }) => {
  const router = useRouter();
  const { handleAddFavourite, addedToFavourites, favorited } =
    useFavourites(anime);
  const utils = trpc.useContext();
  const { q: term, cat } = router.query;
  const { status } = useSession();

  const { mutate: deleteFavourite } =
    trpc.favourite.deleteFavourite.useMutation({
      onSettled: () => {
        // Always refetch after error or success:
        utils.favourite.getUserFavourites.invalidate();
      },
    });

  return (
    <>
      <div key={v4()} className="flex gap-x-2 py-2">
        <Image
          objectFit="cover"
          alt={anime.title}
          width={60}
          height={80}
          src={anime.images.jpg.image_url}
        />
        <div>
          <span className="mb-3 flex items-center gap-x-2 text-sm font-bold md:text-base">
            <Link href={`/${cat}/${anime.mal_id}/characters`}>
              {anime.title}
            </Link>
            <button
              className="cursor-pointer text-sm font-normal text-primary"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                addedToFavourites
                  ? deleteFavourite({ malId: anime.mal_id })
                  : handleAddFavourite();
              }}
            >
              {status === "authenticated" ? (
                <>{addedToFavourites || favorited ? "added" : "add"}</>
              ) : (
                "add"
              )}
            </button>
          </span>
          <p className="text-xs text-gray-500 md:text-sm">
            <span className=" font-bold">{anime.type}</span> ({anime.episodes}{" "}
            eps)
          </p>
          <p className="text-xs font-semibold text-gray-500">
            Scored {anime.score}
          </p>
          <p className="text-xs font-semibold text-gray-500">
            {anime.members.toLocaleString()} members
          </p>
        </div>
      </div>
      <LineOverlay />
    </>
  );
};

export default SearchComponent;
