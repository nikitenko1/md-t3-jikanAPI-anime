import BackdropModal from "./BackdropModal";
import { motion } from "framer-motion";
import { useSearch, useSetBodyScroll } from "../lib/zustand";
import { IoFilter, IoSearchOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface IDropdown {
  setCategory: (item: string) => void;
  category: string;
}

const dropDown = {
  enter: {
    opacity: 1,
    y: 0,
    display: "block",
  },
  exit: {
    y: -5,
    opacity: 0,
    transition: {
      duration: 0.3,
      damping: 10,
      stiffness: 500,
    },
    transitionEnd: {
      display: "none",
    },
  },
};

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const dropdownItem = ["Anime", "Manga"];

const CategoryDropdown = ({ setCategory, category }: IDropdown) => {
  const [isDropped, setDropDown] = useState<boolean>(false);

  return (
    <>
      <div onClick={() => setDropDown(!isDropped)}>
        <div className="flex cursor-pointer items-center gap-x-1">
          <span className="capitalize">{category}</span>
          <IoFilter />
        </div>
        {isDropped && (
          <motion.ul
            className="absolute mt-1 rounded-sm bg-white text-black"
            variants={dropDown}
            initial="exit"
            animate={isDropped ? "enter" : "exit"}
            exit="exit"
          >
            {dropdownItem.map((item) => (
              <motion.li
                key={uuidv4()}
                whileHover={{
                  backgroundColor: "#2563EB",
                  color: "#fff",
                }}
                className="cursor-default px-2 py-1"
                onClick={() => setCategory(item.toLowerCase())}
              >
                {item}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </div>
    </>
  );
};

const Search = () => {
  const { setScroll } = useSetBodyScroll();
  const { close: closeSearch } = useSearch();
  const router = useRouter();
  const [term, setTerm] = useState<string>("");
  const [category, setCategory] = useState<string>("anime");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setScroll();

    closeSearch();
    router.push({
      pathname: "/search",
      query: {
        q: term,
        cat: category,
      },
    });
  };

  return (
    <BackdropModal
      onClick={() => {
        closeSearch();
        setScroll();
      }}
    >
      <motion.div
        className="relative max-w-[500px] rounded-lg bg-primary p-2 text-white xs:p-4"
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="flex w-full flex-col items-center space-x-2 xs:flex-row ">
          <CategoryDropdown setCategory={setCategory} category={category} />
          <div className="flex items-center gap-x-1">
            <IoSearchOutline />
            <form onSubmit={handleSubmit} className="relative">
              <input
                onChange={(e) => setTerm(e.target.value)}
                type="text"
                className="border-b bg-transparent p-2 outline-none  placeholder:text-gray-300"
                placeholder="Search anime, manga and more..."
              />
            </form>
          </div>
        </div>
      </motion.div>
    </BackdropModal>
  );
};

export default Search;
