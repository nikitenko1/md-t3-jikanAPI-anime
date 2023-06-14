import React, { useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { v4 } from "uuid";
import { API_ENDPOINT } from "pages/api/anime";
import Loader from "components/Loader";
import Container from "components/Container";
import CardInfo from "components/CardInfo";
import fetcher from "helper/fetcher";
import { genres } from "helper/genres";
import { AnimeDetailsProps } from "interface";

const GenreDetails = () => {
  const router = useRouter();
  const { genreId } = router.query;
  const [page, setPage] = useState(1);
  //  https://api.jikan.moe/v4/anime -->// {"data": [{...}]}
  const { data } = useSWR(
    `${API_ENDPOINT}anime?genres=${genreId}&page=${page}`,
    fetcher
  );
  const { data: anime }: { data: AnimeDetailsProps[] } = data || {};

  // "mal_id": 0
  const genre = genres?.find(
    (genre) => genre?.mal_id === parseInt(genreId as string)
  )?.name;

  return (
    <Container>
      {anime ? (
        <>
          <h1 className="text-xl font-bold text-primary">{genre}</h1>
          <div className="my-4 flex justify-end gap-x-2 font-bold text-primary">
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
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {anime.map((item) => (
              <CardInfo key={v4()} anime={item} />
            ))}
          </div>
          <div className="my-4 flex justify-center gap-x-2 font-bold text-primary">
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
        </>
      ) : (
        <Loader />
      )}
    </Container>
  );
};

export default GenreDetails;
