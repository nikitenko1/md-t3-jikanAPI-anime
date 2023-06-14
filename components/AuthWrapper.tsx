import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ProtectedRoute from "./ProtectedPage";

const authRoutes = ["/user/watchLater", "/user/favourites"];

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();
  const router = useRouter();

  if (session.status === "loading") return null;

  return (
    <>
      {authRoutes.includes(router.pathname) ? (
        <ProtectedRoute>{children}</ProtectedRoute>
      ) : (
        children
      )}
    </>
  );
};

export default AuthWrapper;
