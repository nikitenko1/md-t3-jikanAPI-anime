import React, { useState } from "react";
import { useRouter } from "next/router";
import { v4 } from "uuid";
import useSWR from "swr";
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
  //  https://api.jikan.moe/v4/manga -->// {"data": [{...}]}
  const { data } = useSWR(
    `${API_ENDPOINT}manga?genres=${genreId}&page=${page}`,
    fetcher
  );
  const { data: manga }: { data: AnimeDetailsProps[] } = data || {};

  const genre = genres?.find(
    (genre) => genre?.mal_id === parseInt(genreId as string)
  )?.name;

  return (
    <Container>
      {manga ? (
        <>
          <h1 className="text-xl font-bold text-blue-500">{genre}</h1>
          <div className="my-4 flex justify-end gap-x-2 font-bold text-blue-500">
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
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {manga.map((item) => (
              <CardInfo key={v4()} anime={item} />
            ))}
          </div>
          <div className="my-4 flex justify-center gap-x-2 font-bold text-blue-500">
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
      ) : (
        <Loader />
      )}
    </Container>
  );
};

export default GenreDetails;
