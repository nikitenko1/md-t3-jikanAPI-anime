import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { API_ENDPOINT } from "pages/api/anime";
import AnimeDetailsComponent from "components/AnimeDetailsComponent";
import ReviewsList from "components/ReviewsList";
import fetcher from "helper/fetcher";
import { Review } from "interface";

const ReviewPage = () => {
  const router = useRouter();
  const { animeId } = router.query;
  // https://api.jikan.moe/v4/anime/{id} -->// {"data": [{...}]}
  const { data } = useSWR(`${API_ENDPOINT}anime/${animeId}`, fetcher);
  // https://api.jikan.moe/v4/anime/{id}/reviews -->// {"data": [{...}]}
  const { data: animeReviews } = useSWR(
    `${API_ENDPOINT}anime/${animeId}/reviews`,
    fetcher
  );

  const { data: reviews }: { data: Review[] } = animeReviews || {};
  const { data: anime } = data || {};

  return (
    <div>
      <AnimeDetailsComponent anime={anime} />
      <ReviewsList reviews={reviews} />
    </div>
  );
};

export default ReviewPage;
