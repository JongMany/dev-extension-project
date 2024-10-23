"use client";
import { ReactTyped } from "react-typed";

type Props = {
  id: string;
  textArray: string[];
};
export default function TypingCarousel({ textArray }: Props) {
  return (
    <ReactTyped
      strings={textArray}
      typeSpeed={40}
      backSpeed={50}
      backDelay={1000}
      loop
    />
  );
}
