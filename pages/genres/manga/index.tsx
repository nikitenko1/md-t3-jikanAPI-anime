import React, { useState } from "react";
import useSWR from "swr";
import { v4 } from "uuid";
import { API_ENDPOINT } from "pages/api/anime";
import Container from "components/Container";
import GenreBox from "components/GenreBox";
import fetcher from "helper/fetcher";
import { IGenre } from "interface";

const MangaGenrePage = () => {
  // https://api.jikan.moe/v4/genres/manga -->// {"data": [{...}]}
  const { data: mangaGenres } = useSWR(`${API_ENDPOINT}genres/manga`, fetcher);

  const { data: genres }: { data: IGenre[] } = mangaGenres || {};
  const [filter, setFilter] = useState<string>("");

  return (
    <Container>
      <h1 className="py-4 text-xl font-bold">Manga Genres</h1>
      <input
        type="text"
        placeholder="Search genre"
        className="my-4 rounded-lg border  px-2 py-1 outline-none ring ring-secondary focus:ring-primary"
        onChange={(e) => setFilter(e.target.value)}
      />
      <div className="grid grid-cols-1 gap-2 min-[300px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {genres
          ?.filter((genre) =>
            genre.name.toLowerCase().includes(filter.toLowerCase())
          )
          .map((genre) => (
            <GenreBox genre={genre} key={v4()} />
          ))}
      </div>
    </Container>
  );
};

export default MangaGenrePage;
