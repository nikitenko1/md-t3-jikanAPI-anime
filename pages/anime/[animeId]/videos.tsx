import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { v4 } from "uuid";
import { API_ENDPOINT } from "pages/api/anime";
import AnimeDetailsComponent from "components/AnimeDetailsComponent";
import fetcher from "helper/fetcher";
import { IMusicVideo, IPromo } from "interface";
// import { useMediaQuery } from "usehooks-ts";

const VideoPage = () => {
  const router = useRouter();
  const { animeId } = router.query;
  // const phone = useMediaQuery("(min-width: 400px)");
  // const small = useMediaQuery("(min-width: 640px)");
  // const tablet = useMediaQuery("(min-width: 768px)");
  // const desktop = useMediaQuery("(min-width: 1024px)");

  // const widthMediaQuery = () => {
  //   if (phone) {
  //     return 220;
  //   } else if (small) {
  //     return 250;
  //   } else if (tablet) {
  //     return 280;
  //   } else {
  //     return 300;
  //   }
  // };
  // const heightMediaQuery = () => {
  //   if (phone) {
  //     return 100;
  //   } else if (small) {
  //     return 150;
  //   } else if (tablet) {
  //     return 180;
  //   } else if (desktop) {
  //     return 200;
  //   }
  // };
  // https://api.jikan.moe/v4/anime/{id} -->// {"data": [{...}]}
  const { data } = useSWR(`${API_ENDPOINT}anime/${animeId}`, fetcher);
  // https://api.jikan.moe/v4/anime/{id}/videos -->// {"data": [{...}]}
  const { data: animeVideos } = useSWR(
    `${API_ENDPOINT}anime/${animeId}/videos`,
    fetcher
  );

  const { data: videos } = animeVideos || {};
  const { data: anime } = data || {};

  return (
    <div>
      <AnimeDetailsComponent anime={anime} />
      <div className="space-y-4 p-4">
        <div>
          <h1 className="text-2xl font-bold">Trailers</h1>
          <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {videos?.promo.map((promo: IPromo) => (
              <div className="h-44 w-56 " key={v4()}>
                <iframe
                  // "embed_url": "string"
                  src={promo.trailer.embed_url}
                  className="h-full w-full"
                ></iframe>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold">Music Videos</h1>
          <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {videos?.music_videos.map((video: IMusicVideo) => (
              <div className="h-44 w-56 " key={v4()}>
                <iframe
                  // "embed_url": "string"
                  src={video.video.embed_url}
                  className="h-full w-full"
                ></iframe>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
