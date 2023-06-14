import React from "react";

const Backdrop = ({ color }: { color?: string }) => {
  return <div className={`backdrop bg-${color}-500 z-[40] opacity-50`}></div>;
};

export default Backdrop;
