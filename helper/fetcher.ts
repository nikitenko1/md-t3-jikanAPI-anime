// https://swr.vercel.app/docs/getting-started
// const fetcher = (...args) => fetch(...args).then(res => res.json())
const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = res.json();
  return data;
};

export default fetcher;
