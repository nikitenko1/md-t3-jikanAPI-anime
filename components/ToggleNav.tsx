import React from "react";
import { IoClose, IoLogOutOutline } from "react-icons/io5";
import { useSearch, useSetBodyScroll, useToggle } from "lib/zustand";
import { motion } from "framer-motion";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { getSeason } from "helper/functions";
import BackdropModal from "./BackdropModal";

const ToggleNav = () => {
  const { open } = useSearch();
  const { untoggleNav } = useToggle();
  const { setScroll, unsetScroll } = useSetBodyScroll();
  const handleClose = () => {
    untoggleNav();
    setScroll();
  };

  const showIn = {
    show: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 40,
        stiffness: 300,
      },
    },
    hidden: {
      x: "-100%",
      opacity: 0,
    },
  };

  const { status } = useSession();
  const d = new Date();
  let month = d.getMonth();
  const currentYear = d.getFullYear();
  const currentSeason = getSeason((month += 1));

  return (
    <BackdropModal onClick={handleClose}>
      <motion.section
        onClick={(e) => e.stopPropagation()}
        variants={showIn}
        initial="hidden"
        exit="hidden"
        animate="show"
        className="fixed left-0 top-0 z-[999] flex min-h-screen min-w-[40vw] flex-col bg-black p-4"
      >
        <IoClose
          className="mb-4 cursor-pointer self-end text-2xl"
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
        />
        <ul className="menu ">
          <li tabIndex={0}>
            <span>Anime</span>
            <ul className="rounded-sm bg-base-200 text-sm">
              <li>
                <Link href="/top-anime">Top Anime</Link>
              </li>
              <li>
                <Link href={`/anime/season/${currentYear}/${currentSeason}`}>
                  Seasonal Anime
                </Link>
              </li>
              <li>
                <Link href="/genres/anime">Anime Genres</Link>
              </li>
            </ul>
          </li>
          <li tabIndex={1}>
            <span>Manga</span>
            <ul className="rounded-sm bg-base-200 text-sm">
              <li>
                <Link href="/top-manga">Top Manga</Link>
              </li>
              <li>
                <Link href="/genres/manga">Manga Genres</Link>
              </li>
            </ul>
          </li>
          <li
            tabIndex={2}
            className="cursor-pointer"
            onClick={() => {
              unsetScroll();
              open();
              untoggleNav();
            }}
          >
            <span>Search</span>
          </li>
        </ul>
        {status === "authenticated" ? (
          <li tabIndex={3}>
            <button onClick={() => signOut()}>
              <span className="flex cursor-pointer items-center gap-x-2 font-semibold">
                <IoLogOutOutline />
                Sign out
              </span>
            </button>
          </li>
        ) : null}
      </motion.section>
    </BackdropModal>
  );
};

export default ToggleNav;
