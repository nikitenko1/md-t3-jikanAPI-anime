import Container from "components/Container";
import SeasonalNav from "components/SeasonalNav";
import fetcher from "helper/fetcher";
import { AnimeDetailsProps } from "interface";
import { useRouter } from "next/router";
import { API_ENDPOINT } from "pages/api/anime";
import React, { useState } from "react";
import useSWR from "swr";
import Loader from "components/Loader";
import { v4 } from "uuid";
import CardInfo from "components/CardInfo";

const SeasonalPage = () => {
  const router = useRouter();
  const { year: yearId, season: seasonId } = router.query;
  const [page, setPage] = useState(1);
  // https://api.jikan.moe/v4/seasons/{year}/{season} -->// {"data": [{...}]}
  const { data } = useSWR(
    `${API_ENDPOINT}seasons/${yearId}/${seasonId}?page=${page}`,
    fetcher
  );
  const { data: anime }: { data: AnimeDetailsProps[] } = data || {};

  return (
    <Container>
      <SeasonalNav />
      {anime ? (
        <>
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

export default SeasonalPage;
