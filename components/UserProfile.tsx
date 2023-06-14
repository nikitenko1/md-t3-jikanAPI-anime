import { useSession } from "next-auth/react";
import Image from "next/legacy/image";
import Link from "next/link";
import { useRouter } from "next/router";

const UserProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <div className="flex flex-col items-center">
      <Image
        src={session?.user?.image || ""}
        alt="profile-picture"
        width={100}
        height={100}
        className="rounded-full"
        objectFit="cover"
      />
      <div className="mt-2 space-y-2 text-center">
        <p className="text-lg font-semibold">{session?.user?.name}</p>
        <p className="text-sm text-gray-500">{session?.user?.email}</p>
      </div>
      <nav className="t mt-4 flex list-none items-center gap-x-2 font-bold">
        <li
          className={`${
            router.pathname === "/user/favourites"
              ? "border-b-2 border-primary text-primary"
              : ""
          } `}
        >
          <Link href="/user/favourites">Favourites</Link>
        </li>
        <li
          className={
            router.pathname === "/user/watchLater"
              ? "border-b-2 border-primary text-primary"
              : ""
          }
        >
          <Link href="/user/watchLater">Watch later</Link>
        </li>
      </nav>
    </div>
  );
};

export default UserProfile;
