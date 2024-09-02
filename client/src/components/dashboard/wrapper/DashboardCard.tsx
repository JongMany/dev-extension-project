import { PropsWithChildren } from "react";

export default function DashboardCard({ children }: PropsWithChildren) {
  return (
    <article className="flex justify-center items-center rounded-lg">
      {children}
    </article>
  );
}
