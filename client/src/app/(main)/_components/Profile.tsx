"use client";

import React from "react";
import { useSession } from "next-auth/react";

export const Profile = () => {
  const { data: session } = useSession();

  return (
    <div className="text-lg">
      <span className="font-bold text-2xl">{session?.user.name}</span>님
      안녕하세요
    </div>
  );
};
