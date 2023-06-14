import React from "react";
import Image from "next/legacy/image";
import Link from "next/link";
import { Anime } from "interface";
import { useSession } from "next-auth/react";
import { v4 } from "uuid";
import useFavourites from "hooks/useFavourites";

const SidebarAnime = ({ anime, i }: { anime: Anime; i: number }) => {
  const { status } = useSession();

  const {
    handleDeleteFavourite,
    handleAddFavourite,
    addedToFavourites,
    favorited,
  } = useFavourites(anime);

  return (
    <Link key={v4()} href={`/anime/${anime.mal_id}/videos`}>
      <div className="mb-4 flex cursor-pointer gap-x-4">
        <span className="min-w-[6%] text-2xl font-bold text-gray-500">
          {i + 1}
        </span>
        <Image
          src={anime.images.jpg.image_url}
          width={80}
          height={90}
          alt={anime.title}
        />
        <div>
          <h1 className="font-bold text-white">{anime.title}</h1>
          <p className="text-sm text-gray-500">
            {anime.type}, {anime.episodes === null ? 0 : anime.episodes} eps,
            scored {anime.score === null ? "N/A" : anime.score}
          </p>
          <p className="text-sm text-gray-500">
            Members: {anime.members.toLocaleString()}
          </p>
        </div>
        <button
          className="ml-auto self-start justify-self-end font-semibold text-primary"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            addedToFavourites ? handleDeleteFavourite() : handleAddFavourite();
          }}
        >
          {status === "authenticated" ? (
            <>{addedToFavourites || favorited ? "added" : "add"}</>
          ) : (
            "add"
          )}
        </button>
      </div>
    </Link>
  );
};

export default SidebarAnime;
