import Link from "next/link";
import { IRow } from "interface";
import Skeleton from "react-loading-skeleton";
import { v4 } from "uuid";
import SidebarAnime from "./SidebarAnime";

interface IProps extends IRow {
  limit: number;
  loading: boolean;
}

const SidebarRow = ({ items, title, limit, loading }: IProps) => {
  return (
    <>
      {loading ? (
        <Skeleton count={limit} height={"50px"} style={{ margin: "8px 0" }} />
      ) : (
        <section>
          <div className="flex items-center justify-between p-2 text-white">
            <h1 className="text-lg font-bold">{title}</h1>
            <span className="font-bold text-primary">
              <Link href="/">More</Link>
            </span>
          </div>
          <div className="rounded-sm border border-primary p-4">
            {items?.slice(0, limit).map((anime, i) => (
              <SidebarAnime anime={anime} key={v4()} i={i} />
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default SidebarRow;
