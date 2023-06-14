import React from "react";

const Overlay = () => {
  return (
    <div className="radialOverlayGradient fixed bottom-0 h-full w-full text-white" />
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative z-50 min-h-[450vh] bg-black">
      <div className="relative z-20 mx-auto max-w-7xl">{children}</div>
      <Overlay />
    </main>
  );
};

export default Layout;
