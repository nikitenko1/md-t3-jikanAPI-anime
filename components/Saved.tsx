import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/legacy/image";
import Link from "next/link";
import { BsFillTrashFill } from "react-icons/bs";
import { motion } from "framer-motion";
import { trpc } from "utils/trpc";
import { ISavedResp } from "interface";

const Saved = ({ item }: { item: ISavedResp }) => {
  const [showTrash, setShowTrash] = useState<boolean>(false);

  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath, undefined, { scroll: false });
  };

  const utils = trpc.useContext();

  const { mutate: deleteFavourite } =
    trpc.favourite.deleteFavourite.useMutation({
      onSettled: () => {
        // Always refetch after error or success:
        utils.favourite.getUserFavourites.invalidate();
      },
    });

  const { mutate: deleteWatchLater } =
    trpc.watchLater.deleteWatchLater.useMutation({
      onSettled: () => {
        // Always refetch after error or success:
        utils.watchLater.getWatchLater.invalidate();
      },
    });

  return (
    <div
      className="relative flex cursor-pointer flex-col space-y-2 font-bold"
      onMouseEnter={() => setShowTrash(true)}
      onMouseLeave={() => setShowTrash(false)}
    >
      <div className="relative h-72 w-64">
        <Image
          src={item.imageUrl}
          layout="fill"
          className="rounded-lg"
          objectFit={"cover"}
          alt={item.title}
        />
        <div
          className="absolute bottom-0 left-0 right-0 top-0 overflow-hidden
        rounded-lg bg-[#00000073]"
        ></div>
      </div>
      <Link href={`/anime/${item.malId}`} className="text-primary">
        {item.title}
      </Link>
      {showTrash && (
        <motion.button
          className="absolute left-2 self-center text-gray-300"
          onClick={(e) => {
            e.stopPropagation();
            router.pathname === "/user/favourites"
              ? deleteFavourite({ malId: item.malId })
              : deleteWatchLater({ malId: item.malId });
            refreshData();
          }}
        >
          <BsFillTrashFill className="text-2xl" />
        </motion.button>
      )}
    </div>
  );
};

export default Saved;
