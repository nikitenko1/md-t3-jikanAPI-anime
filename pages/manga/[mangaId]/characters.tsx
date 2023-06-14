import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { API_ENDPOINT } from "pages/api/anime";
import CharactersList from "components/CharactersList";
import MangaDetailsComponent from "components/MangaDetailsComponent";
import Loader from "components/Loader";
import fetcher from "helper/fetcher";
import { Character } from "interface";

const MangaCharacter = () => {
  const { mangaId } = useRouter().query;
  // https://api.jikan.moe/v4/manga/{id} -->// {"data": [{...}]}
  const { data: manga } = useSWR(`${API_ENDPOINT}manga/${mangaId}`, fetcher);
  // https://api.jikan.moe/v4/manga/{id}/characters -->// {"data": [{...}]}
  const { data: mangaCharacters } = useSWR(
    `${API_ENDPOINT}manga/${mangaId}/characters`,
    fetcher
  );

  return (
    <div>
      <MangaDetailsComponent manga={manga?.data} />
      <br />
      {mangaCharacters ? (
        <div className="px-4 pb-4">
          <CharactersList characters={mangaCharacters?.data as Character[]} />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default MangaCharacter;
