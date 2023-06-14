import React from "react";
import { useRouter } from "next/router";
import Image from "next/legacy/image";
import useSWR from "swr";
import { v4 } from "uuid";
import { API_ENDPOINT } from "pages/api/anime";
import fetcher from "helper/fetcher";
import AnimeDetailsComponent from "components/AnimeDetailsComponent";
import Container from "components/Container";

const EpisodePage = () => {
  const router = useRouter();
  const { animeId } = router.query;
  // https://api.jikan.moe/v4/anime/{id} -->// {"data": [{...}]}
  const { data } = useSWR(`${API_ENDPOINT}anime/${animeId}`, fetcher);

  const { data: animeVideos } = useSWR(
    `${API_ENDPOINT}anime/${animeId}/videos`,
    fetcher
  );
  // https://api.jikan.moe/v4/anime/{id}/videos  -->// {"data": [{...}]}
  const { data: videos } = animeVideos || {};
  const { data: anime } = data || {};

  return (
    <div>
      <AnimeDetailsComponent anime={anime} />
      <Container>
        {videos ? (
          <>
            {videos?.episodes.length === 0 ? (
              <h1 className="text-lg font-semibold">No episodes added</h1>
            ) : (
              <>
                <h1 className="mb-4 text-2xl font-bold">Episode Lists</h1>
                <div className=" grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* "episodes": [{...}], */}
                  {videos?.episodes?.map((_episode: any) => (
                    <div
                      key={v4()}
                      className="flex items-start gap-x-2 rounded-sm border-b-2 border-primary p-2"
                    >
                      <Image
                        // "image_url": "string"
                        src={_episode.images.jpg.image_url || "/no-image.png"}
                        width={100}
                        height={100}
                        alt={_episode.title}
                        className="rounded-lg"
                      />
                      <div>
                        <h1 className="text-base font-bold sm:text-lg">
                          {/* "episode": "string" */}
                          {_episode.episode}
                        </h1>
                        {/* "title": "string" */}
                        <p className="text-xs sm:text-sm">{_episode.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <p>Theres an error</p>
        )}
      </Container>
    </div>
  );
};

export default EpisodePage;
