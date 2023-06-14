import React from "react";
import useSWR from "swr";
import fetcher from "helper/fetcher";
import { Character, Staff } from "interface";
import { useRouter } from "next/router";
import { API_ENDPOINT } from "pages/api/anime";
import Loader from "components/Loader";
import AnimeDetailsComponent from "components/AnimeDetailsComponent";
import CharactersList from "components/CharactersList";
import StaffList from "components/StaffList";

const CharactersPage = () => {
  const router = useRouter();
  const { animeId } = router.query;

  const { data } = useSWR(`${API_ENDPOINT}anime/${animeId}`, fetcher);

  const { data: animeCharacters } = useSWR(
    `${API_ENDPOINT}anime/${animeId}/characters`,
    fetcher
  );

  const { data: animeStaff } = useSWR(
    `${API_ENDPOINT}anime/${animeId}/staff`,
    fetcher
  );
  // https://api.jikan.moe/v4/anime/{id} -->// {"data": [{...}]}
  const { data: anime } = data || {};
  // https://api.jikan.moe/v4/anime/{id}/characters -->// {"data": [{...}]}
  const { data: characters }: { data: Character[] } = animeCharacters || {};
  // https://api.jikan.moe/v4/anime/{id}/staff -->// {"data": [{...}]}
  const { data: staff }: { data: Staff[] } = animeStaff || {};

  return (
    <div>
      <AnimeDetailsComponent anime={anime} />
      {characters && staff ? (
        <div className="px-4 pb-4">
          <CharactersList characters={characters} />
          <StaffList staff={staff} />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default CharactersPage;
