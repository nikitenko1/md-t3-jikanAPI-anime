import React from "react";
import { useMediaQuery } from "usehooks-ts";
import Row from "./Row";
import Sidebar from "./Sidebar";
import { IMain } from "interface";

const HomeFeed = ({ seasonsNow, seasonYear, seasonsUpcoming }: IMain) => {
  // Easily retrieve media dimensions with this Hook React which also works onResize.
  const matches = useMediaQuery("(min-width: 1024px)");

  return (
    <section className="relative mx-auto mt-5 flex max-w-7xl p-2 md:p-4">
      <div className="z-40 w-full space-y-8 px-3 lg:max-w-[60%]">
        <Row
          items={seasonsNow}
          title={`${seasonsNow[0]?.season}, ${seasonsNow[0]?.year}`}
        />
        <Row items={seasonYear} title={`Top Anime`} />
        <Row items={seasonsUpcoming} title="Upcoming Season" />
      </div>
      {matches ? <Sidebar /> : null}
    </section>
  );
};

export default HomeFeed;
