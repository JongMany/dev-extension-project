import { MenuItem } from "@/app/(main)/_components/MenuItem";
import Link from "next/link";
import { auth } from "@/auth";

export const Menu = async () => {
  const session = await auth();
  console.log("session", session);
  const menuItems = [
    { text: "홈", href: "/main" },
    { text: "대시보드", href: "/dashboard" },
    { text: "목표", href: "/goal" },
    { text: "랭킹", href: "/rank" },
    { text: "프로필", href: `/profile/${session?.user?.email}` },
  ];

  return (
    <div className="flex-1">
      <ul className="flex justify-center gap-x-10 ">
        {menuItems.map((item) => (
          <MenuItem key={item.text} href={item.href}>
            <Link href={item.href}>{item.text}</Link>
          </MenuItem>
        ))}
      </ul>
    </div>
  );
};
