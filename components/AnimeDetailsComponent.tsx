import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/legacy/image";
import Link from "next/link";
import { v4 } from "uuid";
import { AnimeDetailsProps, Genre } from "interface";
import { AiFillHeart, AiOutlineCheck, AiOutlineHeart } from "react-icons/ai";
import { useMediaQuery } from "usehooks-ts";
import { AnimatePresence, motion } from "framer-motion";
import { useSetBodyScroll } from "lib/zustand";
import useWatchLater from "hooks/useWatchLater";
import useFavourites from "hooks/useFavourites";
import { convertToDate } from "helper/functions";
import SynopsisModal from "./SynopsisModal";
import MotionBtn from "./MotionBtn";

interface IDetails {
  anime: AnimeDetailsProps;
  children?: React.ReactNode;
}

const AnimeDetailsComponent = ({ anime, children }: IDetails) => {
  // Easily retrieve media dimensions with this Hook React which also works onResize.
  const matches = useMediaQuery("(min-width: 1024px)");

  const tabLinks = [
    "videos",
    "episodes",
    "reviews",
    "recommendations",
    "stats",
    "characters",
  ];
  const { unsetScroll } = useSetBodyScroll();

  const [_link, setLink] = useState("videos");
  const router = useRouter();
  //localhost:3000/anime/51009/characters
  const { animeId } = router.query;

  const [showSynopsis, setShowSynopsis] = useState(false);

  const handleClose = () => {
    setShowSynopsis(false);
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const {
    handleAddWatchLater,
    watchLaterClicked,
    addedToWatchLater,
    handleDeleteWatchLater,
  } = useWatchLater(anime);

  const {
    handleDeleteFavourite,
    handleAddFavourite,
    addedToFavourites,
    favorited,
  } = useFavourites(anime);

  return (
    <div>
      {anime && (
        <div>
          <AnimatePresence
            initial={false}
            mode="wait"
            onExitComplete={() => null}
          >
            {showSynopsis && (
              // "synopsis": "string"
              <SynopsisModal text={anime.synopsis} handleClose={handleClose} />
            )}
          </AnimatePresence>

          <div className="relative p-4">
            <div className=" flex items-center gap-x-4">
              <div className="flex flex-[0.25] flex-col gap-y-4">
                <div className="relative  h-44 sm:h-[300px] ">
                  <Image
                    // "title": "string"
                    alt={anime.title}
                    // "large_image_url": "string"
                    src={anime.images.jpg.large_image_url}
                    layout="fill"
                    width={matches ? 220 : 150}
                    height={matches ? 300 : 200}
                    className="z-[999] rounded-lg"
                    objectFit="cover"
                  />
                </div>
                <div className="flex gap-x-2 self-start text-white">
                  <motion.button
                    onClick={() => {
                      addedToWatchLater
                        ? handleDeleteWatchLater()
                        : handleAddWatchLater();
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {addedToWatchLater || watchLaterClicked ? (
                      <AiOutlineCheck className="cursor-pointer text-xl text-primary" />
                    ) : (
                      <AiOutlineCheck className="cursor-pointer text-xl hover:text-primary" />
                    )}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      addedToFavourites
                        ? handleDeleteFavourite()
                        : handleAddFavourite();
                    }}
                  >
                    {addedToFavourites || favorited ? (
                      <AiFillHeart className="cursor-pointer text-xl text-primary" />
                    ) : (
                      <AiOutlineHeart className="cursor-pointer text-xl hover:text-primary" />
                    )}
                  </motion.button>
                </div>
              </div>

              <div className="flex flex-[0.75] flex-col">
                <div className="md:pt-12">
                  <div className="max-w-[250px] md:max-w-full">
                    <h1 className="text-base font-bold text-white sm:text-lg md:text-xl lg:text-2xl">
                      {anime.title}
                    </h1>
                    <p className="text-sm font-thin text-white sm:text-sm md:text-base ">
                      {/* "title_japanese": "string" */}
                      {anime.title_japanese}
                    </p>
                  </div>
                </div>

                <div className="relative z-[999] space-y-3">
                  <header
                    className="my-4 flex w-full flex-col justify-between gap-x-4 
                  md:flex-row md:items-center"
                  >
                    <h1 className="hidden text-base font-bold md:block lg:text-xl">
                      Synopsis
                    </h1>

                    <div className="flex flex-wrap gap-2 text-xs sm:text-sm md:text-base">
                      <p className=" font-semibold ">
                        Ranked:
                        <span className="font-normal">
                          {" "}
                          #{anime.rank?.toLocaleString() || "N/A"}
                        </span>
                      </p>
                      <p className="font-semibold  ">
                        Popularity:
                        <span className="font-normal">
                          {" "}
                          #{anime.popularity?.toLocaleString() || "N/A"}
                        </span>
                      </p>
                      <p className="font-semibold ">
                        Members:
                        <span className="font-normal">
                          {" "}
                          {anime.members?.toLocaleString() || "N/A"}
                        </span>
                      </p>
                    </div>
                  </header>
                  <div className="md:hidden">
                    <MotionBtn
                      handleClick={() => {
                        setShowSynopsis(true);
                      }}
                      unsetScroll={unsetScroll}
                      string="Read Synopsis"
                      scrollToTop={scrollToTop}
                    />
                  </div>

                  <p className="hidden text-sm md:block lg:text-base">
                    {anime.synopsis}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <section className="w-full py-8  text-white">
            <div className="flex items-center gap-x-4  ">
              <div
                className="grid h-[50px]  w-[50px] place-items-center self-start rounded-full bg-primary
              p-0 text-white md:flex md:h-auto md:w-auto md:flex-col md:items-center md:rounded-lg md:p-2"
              >
                <span className="hidden text-[8px] text-xs font-bold md:block">
                  SCORE
                </span>
                <span className="text-[10px] text-base font-bold  xs:text-xs md:text-2xl">
                  {/* "score": 0 */}
                  {anime.score || "N/A"}
                </span>
                <span className="hidden text-xs font-normal md:block">
                  {/* "scored_by": 0 */}
                  {anime.scored_by?.toLocaleString() || "N/A"} users
                </span>
              </div>
              <div
                className="flex flex-[1] flex-col space-y-2 rounded-lg border-2 border-primary 
              p-3 text-xs xs:text-sm md:text-base"
              >
                <div className="space-x-4">
                  <span className="font-semibold">
                    {/* "type": "TV" */}
                    Type: <span className="font-normal">{anime.type}</span>
                  </span>
                  <span className="font-semibold">
                    Episodes:{" "}
                    <span className="font-normal">
                      {/* "episodes": 0 */}
                      {anime.episodes || "N/A"}
                    </span>
                  </span>
                  <span className="font-semibold">
                    Genres:
                    {/* "genres": [{}] */}
                    {anime.genres.map((genre: Genre, i: any) => (
                      <span key={v4()} className="font-normal">{`${
                        i ? "," : ""
                      } ${genre.name}`}</span>
                    ))}
                  </span>
                  <span className="font-semibold">
                    {/* "status": "Finished Airing" */}
                    Status: <span className="font-normal">{anime.status}</span>
                  </span>
                </div>
                <div className="space-x-4">
                  <span className="font-semibold">
                    Aired:{" "}
                    <span className="font-normal">
                      {/* "aired": {...} */}
                      from {convertToDate(anime.aired.from)} to{" "}
                      {convertToDate(anime.aired.to)}{" "}
                    </span>
                  </span>
                  <span className="font-semibold">
                    <span className="font-normal">
                      Broadcast: {anime.broadcast.string}
                    </span>
                  </span>
                  <span className="font-semibold">
                    Studios:
                    {anime.studios.map((studio: Genre, i: any) => (
                      <span key={v4()} className="font-normal">{`${
                        i ? "," : ""
                      } ${studio.name}`}</span>
                    ))}
                  </span>
                </div>
                <div className="space-x-4">
                  <span className="font-semibold">
                    Duration: {/* "duration": "string" */}
                    <span className="font-normal">{anime.duration}</span>
                  </span>
                  <span className="font-semibold">
                    {/* "rating": "G - All Ages" */}
                    Rating: <span className="font-normal">{anime.rating}</span>
                  </span>
                  <span className="font-semibold">
                    {/* "source": "string" */}
                    Source: <span className="font-normal">{anime.source}</span>
                  </span>
                </div>
              </div>
            </div>
          </section>
          <section className=" max-7xl mx-auto p-8">
            <nav>
              <ul className="flex flex-wrap justify-between gap-2">
                {tabLinks.map((link) => (
                  <Link
                    href={`/anime/${animeId}/${link}`}
                    key={v4()}
                    scroll={false}
                  >
                    <li
                      className={`cursor-pointer pb-2 text-xs font-bold uppercase xs:text-sm ${
                        router.pathname.includes(link)
                          ? `border-b-4 border-primary`
                          : ""
                      }`}
                      onClick={() => setLink(link)}
                    >
                      {link}
                    </li>
                  </Link>
                ))}
              </ul>
            </nav>
            {children}
          </section>
        </div>
      )}
    </div>
  );
};

export default AnimeDetailsComponent;
