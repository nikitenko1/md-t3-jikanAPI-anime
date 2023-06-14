import React from "react";
import { useRouter } from "next/router";
import { v4 } from "uuid";

type Link = {
  name: string;
  slug: string;
};

interface IProps {
  filter: string;
  setFilter: (values: string) => void;
}

const TopNav = ({ filter, setFilter }: IProps) => {
  const router = useRouter();

  const links: Link[] = [
    {
      name: `${router.pathname === "/top-anime" ? "All anime" : "All manga"}`,
      slug: "",
    },
    {
      name: `${
        router.pathname === "/top-anime" ? "Top airing" : "Top publishing"
      }`,
      slug: `${router.pathname === "/top-anime" ? "airing" : "publishing"}`,
    },
    {
      name: "Top upcoming",
      slug: "upcoming",
    },
    {
      name: "Most Popular",
      slug: "bypopularity",
    },
    {
      name: "Most Favorited",
      slug: "favorite",
    },
  ];

  return (
    <ul
      className="my-4 grid grid-cols-1 gap-x-1 gap-y-2 xs:grid-cols-2 min-[500px]:grid-cols-3 
    sm:grid-cols-4 sm:gap-x-2 md:grid-cols-6 lg:grid-cols-8"
    >
      {links.map((link: Link) => (
        <li
          className={`${
            link.slug === filter
              ? "bg-primary px-2 py-1 text-white"
              : "text-primary"
          } cursor-pointer whitespace-nowrap text-xs sm:text-sm md:text-base`}
          onClick={() => setFilter(link.slug)}
          key={v4()}
        >
          {link.name}
        </li>
      ))}
    </ul>
  );
};

export default TopNav;
