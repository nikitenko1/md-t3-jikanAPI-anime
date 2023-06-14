import React from "react";
import { motion } from "framer-motion";

interface IBtn {
  handleClick: () => void;
  string: string;
  scrollToTop?: () => void;
  unsetScroll?: () => void;
}

const MotionBtn = (props: IBtn) => {
  return (
    <motion.button
      className="z-50 mt-2 whitespace-nowrap rounded-lg bg-primary px-2 py-1
       text-xs font-bold text-white shadow-md sm:text-sm md:px-4 md:py-2 md:text-base"
      onClick={() => {
        props.handleClick();
        props.unsetScroll?.();
        props.scrollToTop?.();
      }}
      whileHover={{
        scale: 1.1,
      }}
      whileTap={{ scale: 0.9 }}
    >
      {props.string}
    </motion.button>
  );
};

export default MotionBtn;
