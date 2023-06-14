import { useRouter } from "next/router";
import useSWR from "swr";
import { API_ENDPOINT } from "pages/api/anime";
import AnimeDetailsComponent from "components/AnimeDetailsComponent";
import RecommendationsList from "components/RecommendationsList";
import fetcher from "helper/fetcher";
import { Recommendation } from "interface";

const RecommendationsPage = () => {
  const router = useRouter();

  const { animeId } = router.query;
  // https://api.jikan.moe/v4/anime/{id} -->// {"data": [{...}]}
  const { data } = useSWR(`${API_ENDPOINT}anime/${animeId}`, fetcher);
  // https://api.jikan.moe/v4/anime/{id}/recommendations -->// {"data": [{...}]}
  const { data: animeRecommendations } = useSWR(
    `${API_ENDPOINT}anime/${animeId}/recommendations`,
    fetcher
  );

  const { data: anime } = data || {};
  const { data: recommendations }: { data: Recommendation[] } =
    animeRecommendations || {};

  return (
    <div>
      <AnimeDetailsComponent anime={anime} />
      <RecommendationsList recommendations={recommendations} />
    </div>
  );
};

export default RecommendationsPage;
