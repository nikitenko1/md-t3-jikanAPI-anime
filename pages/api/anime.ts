export const API_ENDPOINT = "https://api.jikan.moe/v4/";

export const getSeasonNowAnime = async () => {
  try {
    const res = await fetch(`${API_ENDPOINT}seasons/now`);
    const data = await res.json();
    return data?.data;
  } catch (err) {
    console.log(err);
  }
};

export const getSeasonYearAnime = async (year: number, season: string) => {
  try {
    const res = await fetch(`${API_ENDPOINT}seasons/${year}/${season}`);
    const data = await res.json();
    return data?.data;
  } catch (err) {
    console.log(err);
  }
};

export const getTopFavoritedAnime = async () => {
  try {
    const res = await fetch(`${API_ENDPOINT}top/anime?filter=favorite`);
    const data = await res.json();
    return data?.data;
  } catch (err) {
    console.log(err);
  }
};

export const getSeasonUpcomingAnime = async () => {
  try {
    const res = await fetch(`${API_ENDPOINT}seasons/upcoming`);
    const data = await res.json();
    return data?.data;
  } catch (err) {
    console.log(err);
  }
};

export const getAnimeByFilter = async (filter: string) => {
  try {
    const res = await fetch(`${API_ENDPOINT}top/anime?filter=${filter}`);
    const data = await res.json();
    return data?.data;
  } catch (err) {
    console.log(err);
  }
};

export const getAnimeNews = async () => {
  try {
    const res = await fetch(`${API_ENDPOINT}anime/1/news`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const animeTypes = ["tv", "movie", "ova", "special", "ona", "music"];

export const bookTypes = [
  "manga",
  "novel",
  "lightnovel",
  "oneshot",
  "doujin",
  "manhwa",
  "manhua",
];
