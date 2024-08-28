import {InputHTMLAttributes} from "react";

type Props = {} & InputHTMLAttributes<HTMLInputElement>;

export default function Input({className = "", ...props}: Props) {
  return (
      <input
          className={`px-2 py-1 border-black border-2 rounded-lg w-[80%] ${className}`}
          {...props}
      />
  );
}
