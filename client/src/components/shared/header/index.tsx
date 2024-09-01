import React from "react";
import { StudyLogIcon } from "@/components/shared/icon/StudyLogIcon";

import { Profile } from "@/components/shared/header/profile/Profile";
import { Menu } from "@/components/shared/header/menu/Menu";
import SignOutButton from "@/components/shared/button/SignOut";

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
