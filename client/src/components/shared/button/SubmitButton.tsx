"use client";

import { PropsWithChildren } from "react";

export default function SubmitButton({ children }: PropsWithChildren) {
  return (
    <button
      type="submit"
      className="border-2 border-black px-4 py-1 rounded-lg shadow-md hover:font-bold hover:shadow-xl"
    >
      {children}
    </button>
  );
}
