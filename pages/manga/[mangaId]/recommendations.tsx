import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { API_ENDPOINT } from "pages/api/anime";
import MangaDetailsComponent from "components/MangaDetailsComponent";
import RecommendationsList from "components/RecommendationsList";
import fetcher from "helper/fetcher";

const MangaRecommendations = () => {
  const { mangaId } = useRouter().query;
  // https://api.jikan.moe/v4/manga/{id} -->// {"data": [{...}]}
  const { data: manga } = useSWR(`${API_ENDPOINT}manga/${mangaId}`, fetcher);
  // https://api.jikan.moe/v4/manga/{id}/recommendations -->// {"data": [{...}]}
  const { data: mangaRecommendations } = useSWR(
    `${API_ENDPOINT}manga/${mangaId}/recommendations`,
    fetcher
  );
  return (
    <div>
      <MangaDetailsComponent manga={manga?.data} />
      <br />
      <RecommendationsList recommendations={mangaRecommendations?.data} />
    </div>
  );
};

export default MangaRecommendations;
