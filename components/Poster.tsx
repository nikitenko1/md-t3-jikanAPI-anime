import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/legacy/image";
import Link from "next/link";
import { Anime } from "interface";
import useWatchLater from "hooks/useWatchLater";

interface IProps {
  anime: Anime;
}

const Poster = ({ anime }: IProps) => {
  const [showTitle, setShowTitle] = useState<boolean>(false);

  const router = useRouter();

  const { handleAddWatchLater, addedToWatchLater, handleDeleteWatchLater } =
    useWatchLater(anime);

  const handleWatchLater = () => {
    addedToWatchLater ? handleDeleteWatchLater() : handleAddWatchLater();
  };

  return (
    <Link
      href={`${
        // "mal_id": 0
        router.pathname.includes("/manga")
          ? `/manga/${anime.mal_id}/characters`
          : `/anime/${anime.mal_id}/videos`
      }`}
    >
      <div className="overflow-hidden  rounded-br-[30px] rounded-tl-[30px]">
        {/* tailwindcss Styling based on parent state (group-{modifier}) */}
        <article
          className="group relative h-[150px] w-[120px] cursor-pointer "
          onMouseEnter={() => setShowTitle(true)}
          onMouseLeave={() => setShowTitle(false)}
        >
          <Image
            // "title": "string"
            alt={anime.title}
            // "image_url": "string"
            src={anime.images.jpg.image_url}
            layout="fill"
            objectFit="cover"
            className=" rounded-br-[30px] rounded-tl-[30px]  transition-all duration-150 ease-in-out 
            group-hover:scale-105 "
          />

          <div className={`z-50  text-xs  `}>
            <h1
              className=" absolute left-4  top-2 w-24 truncate bg-[#00000056] text-xs font-bold text-white 
            opacity-0 transition-all  delay-150 ease-linear group-hover:opacity-100"
            >
              {anime.title}
            </h1>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleWatchLater();
                e.preventDefault();
              }}
              className="btnOverlay  absolute bottom-2 left-2 z-50 rounded-sm border border-primary px-2 py-1
               text-primary opacity-0 delay-300  group-hover:opacity-100"
            >
              {addedToWatchLater ? "remove" : "add"}
            </button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-full w-full bg-gradient-to-t from-[#100014]"></div>
        </article>
      </div>
    </Link>
  );
};

export default Poster;
