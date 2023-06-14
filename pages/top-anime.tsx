import React, { useState } from "react";
import useSWR from "swr";
import { v4 } from "uuid";
import { useLocalStorage } from "usehooks-ts";
import { API_ENDPOINT } from "./api/anime";
import Container from "components/Container";
import TopNav from "components/TopNav";
import TopAnimeRow from "components/TopAnimeRow";
import fetcher from "helper/fetcher";
import { Anime } from "interface";

const TopAnimePage = () => {
  // Persist the state with local storage so that it remains after a page refresh.
  const [page, setPage] = useLocalStorage("page", 1);

  const [filter, setFilter] = useState("");

  const { data: topAnime } = useSWR(
    `${API_ENDPOINT}top/anime?page=${page}&${filter}?{filter=${filter}`,
    fetcher
  );

  const { data: anime }: { data: Anime[] } = topAnime || {};

  return (
    <Container>
      <h1 className="text-2xl font-bold">Top Anime</h1>

      <TopNav setFilter={setFilter} filter={filter} />
      <div className="my-4 flex justify-end gap-x-2 pr-2 font-bold text-primary hover:text-primary-focus">
        {page > 1 && (
          <button onClick={() => setPage(page - 1)} className="">
            Previous
          </button>
        )}
        <button onClick={() => setPage(page + 1)} className="">
          Next
        </button>
      </div>
      <table className="mt-2 w-full border">
        <tbody>
          <tr className="bg-primary text-xs text-white sm:text-sm md:text-base">
            <th>Rank</th>
            <th className="w-[70%]">Title</th>
            <th>Score</th>
            <th>Status</th>
          </tr>
          {anime?.map((item, i) => (
            <TopAnimeRow page={page} i={i} key={v4()} item={item} />
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default TopAnimePage;
