import { Menu } from "@/app/(main)/_components/Menu";
import { Profile } from "@/app/(main)/_components/Profile";
import { StudyLogIcon } from "@/app/(main)/_components/StudyLogIcon";
import SignOutButton from "@/components/shared/button/SignOut";

import React from "react";

export const Header = () => {
  return (
    <header className="flex justify-between h-[10vh] items-center border-b-2 border-black px-4 ">
      <StudyLogIcon />
      <Menu />
      <div className="flex gap-x-4 items-center">
        <Profile />
        <SignOutButton />
      </div>
    </header>
  );
};
