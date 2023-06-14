import { trpc } from "utils/trpc";
import { v4 } from "uuid";
import { animeTypes, bookTypes } from "pages/api/anime";
import Loader from "components/Loader";
import Saved from "components/Saved";
import UserProfile from "components/UserProfile";
import { ISavedResp } from "interface";

const FavouritePage = () => {
  const { data: favourites } = trpc.favourite.getUserFavourites.useQuery();

  return (
    <main className="flex min-h-[90vh] items-center justify-center p-4">
      {!favourites ? (
        <Loader />
      ) : (
        <div className="flex flex-col items-center">
          <UserProfile />
          <div className="mt-4 justify-self-start">
            <>
              {favourites?.length !== 0 ? (
                <>
                  <h1 className="text-xl font-bold text-primary">
                    Favourite Anime
                  </h1>
                  {favourites
                    ?.filter((item: ISavedResp) =>
                      animeTypes.includes(item.type.toLowerCase())
                    )
                    .map((item: ISavedResp) => (
                      <Saved item={item} key={v4()} />
                    ))}
                  <h1 className="mt-4 text-xl font-bold text-primary">
                    Favourite Books
                  </h1>
                  {favourites
                    ?.filter((item: ISavedResp) =>
                      bookTypes.includes(item.type.toLowerCase())
                    )
                    .map((item: ISavedResp) => (
                      <Saved item={item} key={v4()} />
                    ))}
                </>
              ) : (
                <p>No anime saved yet</p>
              )}
            </>
          </div>
        </div>
      )}
    </main>
  );
};

export default FavouritePage;
