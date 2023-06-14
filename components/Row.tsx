import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation } from "swiper";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Poster from "./Poster";
import { IRow } from "interface";
import { v4 } from "uuid";

const NavButtons = () => {
  const swiper = useSwiper();
  return (
    <div className="flex items-center">
      {/* Run transition to previous slide. */}
      <button onClick={() => swiper.slidePrev()}>
        <IoIosArrowBack />
      </button>
      {/* Run transition to next slide. */}
      <button onClick={() => swiper.slideNext()}>
        <IoIosArrowForward />
      </button>
    </div>
  );
};

const Row = ({ items, title }: IRow) => {
  //view all state to view all of the anime
  const [viewAll, setViewAll] = useState<boolean>(false);

  {
    /* Allows to set different parameter for different responsive breakpoints (screen sizes) */
  }
  const rowBreakpoints = {
    0: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    375: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    480: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
    640: {
      slidesPerView: 5,
      spaceBetween: 15,
    },
    768: {
      slidesPerView: 6,
      spaceBetween: 15,
    },
    1024: {
      slidesPerView: 6,
      spaceBetween: 20,
    },
  };

  return (
    <section className="space-y-4">
      <div className="whitespace-nowrap text-xl font-black capitalize text-white">
        <h1 className="whitespace-nowrap text-xl font-black capitalize text-white">
          {title}
        </h1>
        <div className="borderOverlay h-[1px] w-full"></div>
        <button
          onClick={() => setViewAll(!viewAll)}
          className="whitespace-nowrap rounded-sm border border-gray-500 px-2 py-1 text-xs font-black 
          uppercase tracking-wide text-gray-500 transition-all ease-linear hover:border-white hover:text-white"
        >
          {viewAll ? "View Less" : "View All"}
        </button>
      </div>
      <div className="relative flex items-center gap-x-4 text-white">
        <Swiper loop modules={[Navigation]} breakpoints={rowBreakpoints}>
          <NavButtons />
          {items?.slice(0, viewAll ? items.length : 8).map((anime) => (
            <SwiperSlide key={v4()}>
              <Poster anime={anime} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
export default Row;
