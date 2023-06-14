import { motion } from "framer-motion";
import { dropIn } from "lib/animationProperties";
import { IoClose } from "react-icons/io5";
import { useSetBodyScroll } from "lib/zustand";

const SynopsisModal = ({
  text,
  handleClose,
}: {
  text: string;
  handleClose: () => void;
}) => {
  const { setScroll } = useSetBodyScroll();

  return (
    <motion.div
      onClick={(e) => e.stopPropagation()}
      variants={dropIn}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <h1 className="text-2xl font-bold">Synopsis</h1>
      <p className="text-xs xs:text-sm md:text-base">{text}</p>
      <IoClose
        className="absolute right-2 top-2 cursor-pointer text-2xl"
        onClick={handleClose}
      />
    </motion.div>
  );
};

export default SynopsisModal;
