import Link from "next/link";
import Image from "next/image";
import { signOut, signIn, useSession } from "next-auth/react";
import { IoMenu, IoSearch } from "react-icons/io5";
import { useSearch, useSetBodyScroll, useToggle } from "lib/zustand";
import Dropdown from "./Dropdown";
import ThemeTooltip from "./ThemeTooltip";
import { getSeason } from "helper/functions";

const Header = () => {
  const { open: openSearch } = useSearch();
  const { unsetScroll } = useSetBodyScroll();
  const { toggleNav } = useToggle();

  //get current season and  year
  const d = new Date();
  let month = d.getMonth();
  const currentYear = d.getFullYear();
  const currentSeason = getSeason((month += 1));

  const animeItems = [
    {
      text: "Top Anime",
      link: "/top-anime",
    },
    {
      text: "Seasonal Anime",
      link: `/anime/season/${currentYear}/${currentSeason}`,
    },
    {
      text: "Anime Genres",
      link: "/genres/anime",
    },
  ];
  const mangaItems = [
    {
      text: "Top Manga",
      link: "/top-manga",
    },
    {
      text: "Manga Genres",
      link: "/genres/manga",
    },
  ];

  const { data: session, status } = useSession();

  return (
    <header className="z-999 mb-6 bg-transparent p-2 text-white  md:p-4">
      <nav className="flex items-center justify-between">
        <span className="whitespace-nowrap text-2xl font-bold">
          <Link href="/">Aniworld</Link>
        </span>
        <ul className="ml-auto hidden items-center space-x-2 font-semibold md:flex">
          <Dropdown title="ANIME" items={animeItems} />
          <Dropdown title="MANGA" items={mangaItems} />
          <div className="text-sm font-thin tracking-wide">
            {status === "authenticated" ? (
              <button
                onClick={() => signOut()}
                className="rounded-full  bg-primary px-2 py-1 uppercase"
              >
                Sign out
              </button>
            ) : (
              <button
                onClick={() => signIn("github")}
                className="rounded-full bg-primary px-2 py-1 uppercase"
              >
                Sign in
              </button>
            )}
          </div>
          <div className="grid place-items-center rounded-full bg-primary p-1">
            <IoSearch
              className="cursor-pointer text-xl text-white "
              onClick={() => {
                openSearch();
                unsetScroll();
                window.scrollTo(0, 0);
              }}
            />
          </div>

          {status === "authenticated" && (
            <Link href="/user/favourites">
              <Image
                alt={"profile"}
                src={session?.user?.image || ""}
                width={30}
                height={30}
                className="ml-2 cursor-pointer rounded-full"
              />
            </Link>
          )}
          <ThemeTooltip />
        </ul>
        <IoMenu
          className="ml-2 cursor-pointer text-xl md:hidden"
          onClick={() => {
            toggleNav();
            unsetScroll();
          }}
        />
      </nav>
    </header>
  );
};

export default Header;
