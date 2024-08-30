"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignoutButton() {
  const router = useRouter();
  const signoutHandler = () => {
    const URL =
      process.env.NODE_ENV === "production"
        ? "https:/www.study-log.net/signin"
        : "http://localhost:3000/signin"

    signOut({
      callbackUrl: URL,
      redirect: false,
    }).then(() => {
      const URL = process.env.NODE_ENV === "production"
        ? "https:/www.study-log.net/signin"
        : "http://localhost:3000/signin"
      router.replace(URL);
      // router.replace(process.env.NEXTAUTH_URL || "http://43.203.55.144/signin");
    });

    // localStorage.removeItem("email");
    // localStorage.removeItem("accessToken");
  };

  return (
    <button
      className="transition duration-200 border-black border-solid border-4 px-2 py-1 rounded-md shadow-md hover:shadow-xl hover:font-bold text-xl"
      onClick={signoutHandler}
    >
      로그아웃
    </button>
  );
}
