"use client";
import { useSession } from "next-auth/react";
import { type PropsWithChildren } from "react";
type Props = {
  fallback?: React.ReactNode;
};

function SessionProvider({
  children,
  fallback = null,
}: PropsWithChildren<Props>) {
  const { data: sesssion } = useSession();

  if (!sesssion?.user.accessToken) {
    return fallback;
  }
  return <>{children}</>;
}

export default SessionProvider;
