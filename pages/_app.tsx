import "../styles/globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect } from "react";
import {
  useSearch,
  useSetBodyScroll,
  useThemeModal,
  useToggle,
} from "../lib/zustand";
import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import AuthWrapper from "components/AuthWrapper";
import Header from "components/Header";
import Search from "components/Search";
import ToggleNav from "components/ToggleNav";
import Layout from "components/Layout";
import ThemeHandleModal from "components/ThemeHandleModal";
import { trpc } from "utils/trpc";

import { useReadLocalStorage } from "usehooks-ts";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const { scrollSet } = useSetBodyScroll();
  const { isOpen: isOpenSearch } = useSearch();
  const { isOpen: isOpenThemeModal } = useThemeModal();
  const { isToggle } = useToggle();

  const theme = useReadLocalStorage("theme");

  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = scrollSet ? "visible" : "hidden";
  }, [scrollSet]);

  if (typeof window !== "undefined") {
    if (router.pathname !== "/top-anime") {
      window.localStorage.setItem("page", JSON.stringify(1));
    }
  }

  return (
    <div data-theme={theme}>
      <SessionProvider session={session}>
        <AuthWrapper>
          <AnimatePresence
            initial={false}
            mode="wait"
            onExitComplete={() => null}
          >
            {isOpenSearch && <Search />}
          </AnimatePresence>
          <AnimatePresence
            initial={false}
            mode="wait"
            onExitComplete={() => null}
          >
            {isOpenThemeModal && <ThemeHandleModal />}
          </AnimatePresence>
          <AnimatePresence
            initial={false}
            mode="wait"
            onExitComplete={() => null}
          >
            {isToggle && <ToggleNav />}
          </AnimatePresence>
          <Layout>
            <Header />
            <Toaster />
            <Component {...pageProps} />
          </Layout>
        </AuthWrapper>
      </SessionProvider>
    </div>
  );
};

export default trpc.withTRPC(MyApp);
