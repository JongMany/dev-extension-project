"use client";

import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

const liClassName =
  "transition-all duration-300 hover:font-bold hover:underline underline-offset-4 decoration-2 decoration-solid decoration-black text-xl";

type Props = {
  href: string;
};

export const MenuItem = ({ children, href }: PropsWithChildren<Props>) => {
  const pathname = usePathname();
  const isMatchPath = pathname.includes(href);

  return (
    <li
      className={`${liClassName} ${isMatchPath ? "underline font-bold" : ""}`}
    >
      {children}
    </li>
  );
};
