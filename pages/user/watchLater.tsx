import { trpc } from "utils/trpc";
import { v4 } from "uuid";
import { animeTypes, bookTypes } from "pages/api/anime";
import Loader from "components/Loader";
import Saved from "components/Saved";
import UserProfile from "components/UserProfile";
import { ISavedResp } from "interface";

const WatchLaterPage = () => {
  const { data: watchLater } = trpc.watchLater.getWatchLater.useQuery();
  return (
    <main className="flex min-h-[90vh] items-center justify-center">
      {!watchLater ? (
        <Loader />
      ) : (
        <div className="flex flex-col items-center">
          <UserProfile />

          <div className="mt-4 justify-self-center">
            <>
              {watchLater?.length !== 0 ? (
                <>
                  <h1 className="text-xl font-bold text-primary">
                    Watch Later
                  </h1>
                  <div
                    className="grid grid-cols-1 gap-4 sm:grid-cols-2
                    md:grid-cols-3 lg:grid-cols-4 "
                  >
                    {watchLater
                      ?.filter((item: ISavedResp) =>
                        animeTypes.includes(item.type.toLowerCase())
                      )
                      .map((item: ISavedResp) => (
                        <Saved item={item} key={v4()} />
                      ))}
                  </div>
                  <h1 className="mt-4 text-xl font-bold text-primary ">
                    Read Later
                  </h1>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {watchLater
                      ?.filter((item: ISavedResp) =>
                        bookTypes.includes(item.type.toLowerCase())
                      )
                      .map((item: ISavedResp) => (
                        <Saved item={item} key={v4()} />
                      ))}
                  </div>
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

export default WatchLaterPage;
