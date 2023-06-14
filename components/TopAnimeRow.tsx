import React from "react";
import useWatchLater from "hooks/useWatchLater";
import { useRouter } from "next/router";
import Image from "next/legacy/image";
import Link from "next/link";
import { v4 } from "uuid";
import moment from "moment";
import LineOverlay from "./LineOverlay";
import MotionBtn from "./MotionBtn";
import { Anime } from "interface";

const TopAnimeRow = ({
  item,
  i,
  page,
}: {
  item: Anime;
  i: number;
  page: number;
}) => {
  const {
    handleAddWatchLater,
    watchLaterClicked,
    addedToWatchLater,
    handleDeleteWatchLater,
  } = useWatchLater(item);

  const router = useRouter();

  return (
    <tr key={v4()} className="divide-x [&>*]:p-2 [&>*]:text-center">
      <td className="text-2xl font-bold text-gray-400 md:text-4xl">
        {page >= 2 ? i + 1 + 25 * (page - 1) : i + 1}
      </td>
      <td>
        <div className="flex flex-col items-center gap-x-2 px-2 py-4 xs:flex-row">
          <Image
            alt={item.title}
            src={item.images.jpg.image_url}
            width={60}
            height={80}
          />
          <div className="text-center xs:text-start [&>p]:text-xs [&>p]:text-gray-400">
            <Link
              href={`/${router.pathname === "/top-anime" ? "anime" : "manga"}/${
                item.mal_id
              }/characters`}
            >
              <span className="cursor-pointer text-xs font-bold text-primary hover:text-primary-focus ">
                {item.title}
              </span>
            </Link>
            <p>
              {item.type} ({item.episodes} eps)
            </p>
            <p>
              {router.pathname === "/top-anime" &&
                moment(item.aired.from).format("LL")}
              -{" "}
              {router.pathname === "/top-anime" &&
                moment(item.aired.to).format("LL")}
            </p>
            <p>{item.members.toLocaleString()} members</p>
          </div>
        </div>
        <LineOverlay />
      </td>
      <td className="text-sm">{item.score || "-"}</td>
      <td>
        <MotionBtn
          string={
            watchLaterClicked || addedToWatchLater
              ? "Remove from list"
              : "Add to list"
          }
          handleClick={() =>
            addedToWatchLater ? handleDeleteWatchLater() : handleAddWatchLater()
          }
        />
      </td>
    </tr>
  );
};

export default TopAnimeRow;
