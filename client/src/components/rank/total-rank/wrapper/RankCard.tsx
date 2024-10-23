import { PropsWithChildren } from "react";

type Props = {};
export default function RankCard({ children }: PropsWithChildren<Props>) {
  return (
    <article className="flex-1 min-h-[500px] rounded-md border-4 py-6 bg-white animate-floating delay-[3000ms]">
      {children}
    </article>
  );
}
