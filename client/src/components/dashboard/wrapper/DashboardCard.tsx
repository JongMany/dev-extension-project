import { PropsWithChildren } from "react";

export default function DashboardCard({ children }: PropsWithChildren) {
  return (
    <article className="flex justify-center items-center rounded-lg min-h-[20vh]">
      {children}
    </article>
  );
}
