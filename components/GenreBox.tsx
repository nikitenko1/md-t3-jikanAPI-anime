import Link from "next/link";
import { useRouter } from "next/router";
import { IGenre } from "interface";

const GenreBox = ({ genre }: { genre: IGenre }) => {
  const router = useRouter();
  return (
    <Link
      href={`${
        router.pathname.includes("/anime")
          ? `/genres/anime/${genre.mal_id}`
          : `/genres/manga/${genre.mal_id}`
      }`}
    >
      <div
        className="flex cursor-pointer flex-col rounded-xl border border-primary p-4 text-primary
       hover:btnOverlay"
      >
        <p>{genre.name}</p>
        <p>{genre.count}</p>
      </div>
    </Link>
  );
};

export default GenreBox;
