"use client";

import {ButtonHTMLAttributes, PropsWithChildren} from "react";

type Props = {} & ButtonHTMLAttributes<HTMLButtonElement>;
export default function Button({
                                 children,
                                 onClick,
                                 className="",
                                 ...props
                               }: PropsWithChildren<Props>) {
  return (
      <button
          type="button"
          {...props}
          className={`border-2 border-black px-4 py-1 rounded-lg shadow-md hover:font-bold hover:shadow-xl ${className}`}
          onClick={onClick}

      >
        {children}
      </button>
  );
}
