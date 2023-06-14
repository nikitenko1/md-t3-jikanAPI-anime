import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import useSWR from "swr";
import { v4 } from "uuid";
import fetcher from "helper/fetcher";
import { API_ENDPOINT } from "pages/api/anime";

interface ISeason {
  seasons: string[];
  year: number;
}

const SeasonalNav = () => {
  const [index, setIndex] = useState<number>(0);

  //   const { data, error, isLoading } = useSWR('/api/user', fetcher)
  const { data } = useSWR(`${API_ENDPOINT}seasons`, fetcher);

  const router = useRouter();
  const { year: yearId, season: seasonId } = router.query;
  const { data: items }: { data: ISeason[] } = data || {};

  return (
    <header>
      <h1 className="text-2xl font-bold ">Seasonal Anime</h1>
      {items ? (
        <nav className="p-2">
          <ul className="flex flex-wrap items-center gap-2 space-x-4  text-sm text-primary md:text-base"></ul>
          <AiOutlineMinusCircle
            onClick={() => setIndex((prev) => prev + 1)}
            className="cursor-pointer p-1 text-3xl duration-100 ease-in hover:bg-primary hover:text-primary"
          />

          {/* year: 2023,
            seasons: [
            "winter",
            "spring",
            "summer",
            "fall",
            ], */}
          {items[1]?.seasons?.map((season) => (
            <Link
              key={v4()}
              href={`/anime/season/${items[index].year}/${season}`}
            >
              <span
                className={`${
                  Number(yearId) === items[index].year && seasonId === season
                    ? "bg-primary text-white"
                    : ""
                }  cursor-pointer whitespace-nowrap p-1 capitalize duration-100 ease-in 
                hover:bg-primary hover:text-white`}
              >
                {season} {items[index]?.year}
              </span>
            </Link>
          ))}
          {index === 0 ? (
            <></>
          ) : (
            <AiOutlinePlusCircle
              onClick={() => setIndex((prev) => prev - 1)}
              className="cursor-pointer p-1 text-3xl duration-100 ease-in hover:bg-primary hover:text-primary"
            />
          )}

          {/* <IoEllipsisHorizontal
            onClick={() => setIndex(index === 0 ? index : index - 1)}
            className="cursor-pointer p-1 text-3xl duration-100 ease-in hover:bg-primary-focus
             hover:text-white"
          /> */}
        </nav>
      ) : (
        <></>
      )}
    </header>
  );
};

export default SeasonalNav;
