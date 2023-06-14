import { AnimatePresence, motion } from "framer-motion";
import useFavourites from "hooks/useFavourites";
import useWatchLater from "hooks/useWatchLater";
import { Author, Manga } from "interface";
import { useSetBodyScroll } from "lib/zustand";
import { useRouter } from "next/router";
import React, { useState } from "react";
import SynopsisModal from "./SynopsisModal";
import Image from "next/legacy/image";
import { useMediaQuery } from "usehooks-ts";
import {
  IoAddCircleOutline,
  IoCheckmarkCircleOutline,
  IoHeartCircle,
  IoHeartCircleOutline,
} from "react-icons/io5";
import Backdrop from "./Backdrop";
import MotionBtn from "./MotionBtn";
import { convertToDate } from "helper/functions";
import Link from "next/link";
import { v4 } from "uuid";

interface IProps {
  manga: Manga;
  children?: React.ReactNode;
}

const MangaDetailsComponent = ({ manga, children }: IProps) => {
  // Easily retrieve media dimensions with this Hook React which also works onResize.
  const matches = useMediaQuery("(min-width: 1024px)");

  const [showSynopsis, setShowSynopsis] = useState(false);
  const {
    handleAddWatchLater,
    watchLaterClicked,
    addedToWatchLater,
    handleDeleteWatchLater,
  } = useWatchLater(manga as any);

  const {
    handleDeleteFavourite,
    handleAddFavourite,
    addedToFavourites,
    favorited,
  } = useFavourites(manga as any);

  const tabLinks = ["reviews", "recommendations", "stats", "characters"];
  const [_link, setLink] = useState("videos");

  const router = useRouter();
  const { mangaId } = router.query;
  const { unsetScroll } = useSetBodyScroll();

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  const handleClose = () => {
    setShowSynopsis(false);
  };
  return (
    <div>
      {manga && (
        <div>
          <AnimatePresence
            initial={false}
            mode="wait"
            onExitComplete={() => null}
          >
            {showSynopsis && (
              <SynopsisModal text={manga.synopsis} handleClose={handleClose} />
            )}
          </AnimatePresence>

          <div className="relative">
            <div className="hidden h-96 w-full md:block">
              <Image
                alt={manga.title}
                src={manga.images.jpg.image_url}
                layout="fill"
                objectFit="cover"
              />
            </div>

            <div
              className="absolute left-0 z-50 flex w-full flex-col items-start gap-x-8 gap-y-2 
            px-8 pt-4 md:-bottom-36 md:flex-row md:pt-0 lg:-bottom-40"
            >
              <div className="relative h-44 w-1/2 sm:h-[300px] sm:w-[220px]">
                <Image
                  alt={manga.title}
                  src={manga.images.jpg.large_image_url}
                  width={matches ? 220 : 150}
                  height={matches ? 300 : 200}
                  className="z-[999] rounded-lg"
                  objectFit="cover"
                />
              </div>

              <div className=" md:pt-12  ">
                <div className=" max-w-[250px] md:max-w-full">
                  <h1 className="text-base font-bold text-white sm:text-lg md:text-xl lg:text-2xl">
                    {manga.title}
                  </h1>
                  <p className="text-sm font-thin text-white sm:text-sm md:text-base ">
                    {manga.title_japanese}
                  </p>
                </div>
              </div>
              <div className=" flex self-start text-4xl text-white md:ml-auto md:pt-12">
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
                    <IoCheckmarkCircleOutline className="cursor-pointer text-3xl lg:text-4xl" />
                  ) : (
                    <IoAddCircleOutline className="cursor-pointer text-3xl lg:text-4xl" />
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
                    <IoHeartCircle className="cursor-pointer text-3xl lg:text-4xl" />
                  ) : (
                    <IoHeartCircleOutline className="cursor-pointer text-3xl lg:text-4xl" />
                  )}
                </motion.button>
              </div>
            </div>
            <Backdrop color="#1085f1" />
          </div>
          <section className={`w-full bg-blue-500 py-4 pr-4 text-white`}>
            <div
              className="relative z-[999] ml-[150px] space-y-3 xxs:ml-[200px] xs:ml-[310px] sm:ml-[350px] 
            lg:ml-[300px]"
            >
              <header className="flex w-full flex-col items-center justify-between gap-x-4 md:flex-row">
                <h1 className="hidden text-base font-bold md:block lg:text-xl">
                  Synopsis
                </h1>

                <div className="flex flex-wrap gap-2 text-xs sm:text-sm md:text-base">
                  <p className=" font-semibold ">
                    Ranked:
                    <span className="font-normal">
                      {" "}
                      #{manga.rank?.toLocaleString() || "N/A"}
                    </span>
                  </p>
                  <p className="font-semibold  ">
                    Popularity:
                    <span className="font-normal">
                      {" "}
                      #{manga.popularity?.toLocaleString() || "N/A"}
                    </span>
                  </p>
                  <p className="font-semibold ">
                    Members:
                    <span className="font-normal">
                      {" "}
                      {manga.members?.toLocaleString() || "N/A"}
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
                {manga.synopsis}
              </p>
            </div>
            <div className="mt-44 flex gap-x-4 p-8 sm:mt-72  lg:mt-20">
              <div
                className="grid h-[50px]  w-[50px] place-items-center self-start rounded-full bg-[#FF9901]
              p-0 text-white md:flex md:h-auto md:w-auto md:flex-col md:items-center md:rounded-lg md:p-2"
              >
                <span className="hidden text-[8px]  text-xs font-bold md:block">
                  SCORE
                </span>
                <span className="text-[10px] text-base font-bold  xs:text-xs md:text-2xl">
                  {manga.score || "N/A"}
                </span>
                <span className="hidden text-xs font-normal md:block">
                  {manga.scored_by?.toLocaleString() || "N/A"} users
                </span>
              </div>
              <div
                className="flex flex-[1] flex-col space-y-2 rounded-lg border-2 border-gray-700 p-3 
              text-xs xs:text-sm md:text-base"
              >
                <div className="space-x-4">
                  <span className="font-semibold">
                    Type: <span className="font-normal">{manga.type}</span>
                  </span>
                  <span className="font-semibold">
                    Episodes:{" "}
                    <span className="font-normal">
                      {manga.volumes || "N/A"}
                    </span>
                  </span>
                  <span className="font-semibold">
                    Genres:
                    {manga.genres.map((genre: Author, i: any) => (
                      <span key={v4()} className="font-normal">{`${
                        i ? "," : ""
                      } ${genre.name}`}</span>
                    ))}
                  </span>
                  <span className="font-semibold">
                    Status: <span className="font-normal">{manga.status}</span>
                  </span>
                </div>
                <div className="space-x-4">
                  <span className="font-semibold">
                    Published:{" "}
                    <span className="font-normal">
                      from {convertToDate(manga.published.from)} to{" "}
                      {convertToDate(manga.published.to)}{" "}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </section>
          <section className="max-7xl mx-auto bg-white p-8">
            <nav>
              <ul className="flex flex-wrap justify-between gap-2">
                {tabLinks.map((link, i) => (
                  <Link
                    href={`/manga/${mangaId}/${link}`}
                    key={v4()}
                    scroll={false}
                  >
                    <li
                      className={`cursor-pointer pb-2 text-xs font-bold uppercase xs:text-sm ${
                        router.pathname.includes(link)
                          ? `border-b-4 border-blue-500`
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

export default MangaDetailsComponent;
