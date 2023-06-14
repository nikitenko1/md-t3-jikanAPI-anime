import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/legacy/image";
import { IoPeople, IoPlay, IoStar } from "react-icons/io5";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import moment from "moment";
import { v4 } from "uuid";
import { AnimeDetailsProps } from "interface";
import truncate from "helper/truncate";
import useWatchLater from "hooks/useWatchLater";
import LineOverlay from "./LineOverlay";

interface IProps {
  anime: AnimeDetailsProps;
}

const CardInfo = ({ anime }: IProps) => {
  const [expand, setExpand] = useState<boolean>(false);
  const router = useRouter();

  const {
    handleAddWatchLater,
    watchLaterClicked,
    addedToWatchLater,
    handleDeleteWatchLater,
  } = useWatchLater(anime);

  return (
    <article className="border p-2">
      <p
        className="grid h-[80px] cursor-pointer place-items-center py-2 text-sm text-primary transition-all
       duration-300 ease-in hover:font-bold md:text-base"
      >
        <Link
          href={`${
            // "mal_id": 0
            router.pathname.includes("/anime")
              ? `/anime/${anime.mal_id}`
              : `/manga/${anime.mal_id}`
          }/characters`}
        >
          {/* "title": "string" */}
          {anime.title}
        </Link>
      </p>
      <LineOverlay />
      <div className=" flex items-center gap-x-3 px-4 py-3 sm:gap-x-4 md:gap-x-8">
        {router.pathname.includes("/manga") ? (
          <div
            className="flex w-full items-center justify-center gap-x-2 text-[10px] 
          font-semibold text-gray-400 sm:text-xs "
          >
            <p>
              {/* "type": "TV" "year": 0 */}
              {anime.type}, {anime.published.prop.from.year}
            </p>
            {/* "status": "Finished" */}
            <p>{anime.status}</p>
            <p>
              {/* "volumes": 0 "chapters": 0 */}
              {anime.volumes ?? "?"} vols, {anime.chapters ?? "?"} chp
            </p>
          </div>
        ) : null}
        {router.pathname.includes("/anime") ? (
          <div
            className="grid h-6 w-6 place-items-center rounded-full bg-primary text-xs
           text-white xs:text-sm"
          >
            <a
              rel="noopener noreferrer"
              // "url": "string"
              href={anime.trailer.url}
              target="_blank"
            >
              <IoPlay className="cursor-pointer" />
            </a>
          </div>
        ) : null}
        {router.pathname.includes("/anime") ? (
          <div className="flex gap-x-2 divide-x-2 text-sm text-gray-400">
            {/* "from": "string" */}
            <span>{moment(anime.aired.from).format("ll")}</span>
            {/* "rating": "G - All Ages" */}
            <span className="pl-2">{anime.rating}</span>
          </div>
        ) : null}
      </div>
      <LineOverlay />
      <div className=" flex justify-center gap-x-2 p-2 text-xs text-primary">
        {anime.genres.slice(0, 3).map((genre) => (
          <p key={v4()} className="cursor-pointer hover:text-primary-focus">
            {/* "name": "string" */}
            {genre.name}
          </p>
        ))}
      </div>
      <div
        className="relative flex h-[200px] w-full gap-x-2 overflow-x-hidden scrollbar-thin
       scrollbar-thumb-gray-800"
      >
        <div className="relative h-full w-1/2">
          <Image
            // "image_url": "string"
            src={anime.images.jpg.image_url}
            layout="fill"
            objectFit="cover"
            alt={anime.title}
          />
        </div>
        <div className="w-1/2">
          <p className="text-ellipsis text-xs md:text-sm">
            {/* "synopsis": "string" */}
            {expand ? anime.synopsis : truncate(anime.synopsis, 250)}
          </p>
          <div className="grid place-items-center text-2xl">
            {!expand ? (
              <IoMdArrowDropdown
                className="animate-bounce cursor-pointer"
                onClick={() => setExpand(true)}
              />
            ) : (
              <IoMdArrowDropup
                className="animate-bounce cursor-pointer"
                onClick={() => setExpand(false)}
              />
            )}
          </div>
        </div>
      </div>
      <div
        className="mt-2 flex items-center justify-between text-xs text-primary xs:text-sm
       [&>*]:flex [&>*]:items-center [&>*]:gap-x-2"
      >
        <div>
          <IoStar />
          {/* "score": 0 */}
          {anime.score}
        </div>
        <div>
          <IoPeople />
          {/* "members": 0 */}
          {anime.members}
        </div>
        <button
          onClick={() => {
            addedToWatchLater
              ? handleDeleteWatchLater()
              : handleAddWatchLater();
          }}
          className="rounded-lg bg-primary px-4 py-2 font-bold text-white hover:bg-primary-focus"
        >
          {addedToWatchLater || watchLaterClicked
            ? "Remove from list"
            : "Add to list"}
        </button>
      </div>
    </article>
  );
};

export default CardInfo;
