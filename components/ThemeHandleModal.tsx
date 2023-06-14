import React from "react";
import { useSetBodyScroll, useThemeModal } from "lib/zustand";
import { useLocalStorage } from "usehooks-ts";
import BackdropModal from "./BackdropModal";
import { motion } from "framer-motion";
import { dropIn } from "lib/animationProperties";

const ColorTheme = ({ color, value }: { color: string; value: string }) => {
  // Persist the state with local storage so that it remains after a page refresh.
  // This can be useful for a dark theme
  const [theme, setTheme] = useLocalStorage<string>("theme", "pinkTheme");
  const { close: closeThemeModal } = useThemeModal();

  const handleTheme = (value: string) => {
    setTheme(value);
  };

  return (
    <button
      className={`${color} h-8 w-8 cursor-pointer rounded-full`}
      onClick={() => {
        handleTheme(value);
        closeThemeModal();
      }}
    ></button>
  );
};

const ThemeHandleModal = () => {
  const { setScroll } = useSetBodyScroll();
  const { close: closeThemeModal } = useThemeModal();

  return (
    <BackdropModal
      onClick={() => {
        setScroll();
        closeThemeModal();
      }}
    >
      <motion.div
        className="relative max-w-[500px] rounded-lg bg-neutral-900 p-2 text-white xs:p-4"
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h1 className="text-center text-2xl font-bold text-white">
          Change color theme
        </h1>
        <div className="mt-4 flex items-center gap-2">
          <ColorTheme color="bg-[#FF0077]" value="pinkTheme" />

          <ColorTheme color="bg-[#8A33E1]" value="purpleTheme" />
        </div>
      </motion.div>
    </BackdropModal>
  );
};

export default ThemeHandleModal;
