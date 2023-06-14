import { useRouter } from "next/router";
import useSWR from "swr";
import { v4 } from "uuid";
import { API_ENDPOINT } from "pages/api/anime";
import Container from "components/Container";
import Loader from "components/Loader";
import SearchComponent from "components/SearchComponent";
import fetcher from "helper/fetcher";
import { Anime } from "interface";

const SearchPage = () => {
  const router = useRouter();
  const { q: term, cat } = router.query;

  const { data: animeItem } = useSWR(
    `${API_ENDPOINT}${cat}?q=${term}`,
    fetcher
  );
  const { data: anime }: { data: Anime[] } = animeItem || {};

  return (
    <Container>
      <h1 className="my-2 text-center text-2xl font-bold">Search results</h1>
      {anime ? (
        <div className="mt-4 space-y-2 ">
          {anime.length === 0 ? (
            <h1 className="text-xl font-semibold">No anime found</h1>
          ) : (
            <>
              {anime.map((item) => (
                <SearchComponent key={v4()} anime={item} />
              ))}
            </>
          )}
        </div>
      ) : (
        <div className="grid h-full w-full place-items-center">
          <Loader />
        </div>
      )}
    </Container>
  );
};

export default SearchPage;
