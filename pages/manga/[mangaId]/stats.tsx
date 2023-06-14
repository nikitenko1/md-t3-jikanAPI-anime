import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { API_ENDPOINT } from "pages/api/anime";
import MangaDetailsComponent from "components/MangaDetailsComponent";
import Loader from "components/Loader";
import StatsComponent from "components/StatsComponent";
import fetcher from "helper/fetcher";

const MangaStats = () => {
  const { mangaId } = useRouter().query;
  // https://api.jikan.moe/v4/manga/{id} -->// {"data": [{...}]}
  const { data: manga } = useSWR(`${API_ENDPOINT}manga/${mangaId}`, fetcher);
  // https://api.jikan.moe/v4/manga/{id}/statistics -->// {"data": [{...}]}
  const { data: mangaStats } = useSWR(
    `${API_ENDPOINT}manga/${mangaId}/statistics`,
    fetcher
  );

  return (
    <div>
      <MangaDetailsComponent manga={manga?.data} />
      <br />
      {mangaStats ? (
        <div className="px-4 pb-4">
          <StatsComponent stats={mangaStats?.data} />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default MangaStats;
