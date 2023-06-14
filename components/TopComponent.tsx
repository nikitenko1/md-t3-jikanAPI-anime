import React from "react";
import { v4 } from "uuid";
import TopAnimeRow from "./TopAnimeRow";
import TopNav from "./TopNav";
import { Anime } from "interface";

interface IProps {
  isManga: boolean;
  item: Anime[];
  setFilter: (value: string) => void;
  filter: string;
  page: number;
  setPage: (value: number) => void;
}
const TopComponent = ({
  isManga,
  item,
  setFilter,
  filter,
  page,
  setPage,
}: IProps) => {
  return (
    <>
      <h1 className="text-2xl font-bold ">Top {isManga ? "Manga" : "Anime"}</h1>

      <TopNav filter={filter} setFilter={setFilter} />
      <div className="my-4  flex justify-end gap-x-2 pr-2 font-bold text-primary">
        {page > 1 && (
          <button
            onClick={() => setPage(page - 1)}
            className="hover:text-primary-focus"
          >
            Previous
          </button>
        )}

        <button
          onClick={() => setPage(page + 1)}
          className="hover:text-primary-focus"
        >
          Next
        </button>
      </div>

      <table className="mt-2 w-full border ">
        <thead>
          <tr className="bg-primary text-xs text-white sm:text-sm md:text-base">
            <th>Rank</th>
            <th className="w-[70%]">Title</th>
            <th>Score</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {item?.map((_item, i) => (
            <TopAnimeRow page={page} i={i} key={v4()} item={_item} />
          ))}
        </tbody>
      </table>
      <div className="my-4 flex justify-center gap-x-2  font-bold text-blue-500">
        {page > 1 && (
          <button
            onClick={() => setPage(page - 1)}
            className="hover:text-blue-400"
          >
            Previous
          </button>
        )}

        <button
          onClick={() => setPage(page + 1)}
          className="hover:text-blue-400"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default TopComponent;
