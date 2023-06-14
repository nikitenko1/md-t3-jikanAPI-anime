import { useRouter } from "next/router";
import useSWR from "swr";
import { API_ENDPOINT } from "pages/api/anime";
import MangaDetailsComponent from "../../../components/MangaDetailsComponent";
import ReviewsList from "../../../components/ReviewsList";
import fetcher from "../../../helper/fetcher";

const ReviewManga = () => {
  const { mangaId } = useRouter().query;
  // https://api.jikan.moe/v4/manga/{id} -->// {"data": [{...}]}
  const { data: manga } = useSWR(`${API_ENDPOINT}manga/${mangaId}`, fetcher);
  // https://api.jikan.moe/v4/manga/{id}/reviews -->// {"data": [{...}]}
  const { data: mangaReviews } = useSWR(
    `${API_ENDPOINT}manga/${mangaId}/reviews`,
    fetcher
  );
  return (
    <div>
      <MangaDetailsComponent manga={manga?.data} />
      <br />
      <ReviewsList reviews={mangaReviews?.data} />
    </div>
  );
};

export default ReviewManga;
