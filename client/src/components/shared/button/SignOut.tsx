"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();

  const signOutHandler = () => {
    const URL = `${
      process.env.NEXTAUTH_URL || "https://www.study-log.net/api/auth"
    }/signin`;
    console.log("URL", URL);
    signOut({
      callbackUrl: URL,
      redirect: false,
    }).then(() => {
      // router.replace(`${process.env.NEXT_PUBLIC_MY_URL}/signin`);
      router.replace(`/signin`);
    });
  };

  return (
    <button
      className="transition duration-200 border-black border-solid border-4 px-2 py-1 rounded-md shadow-md hover:shadow-xl hover:font-bold text-xl"
      onClick={signOutHandler}
    >
      로그아웃
    </button>
  );
}
