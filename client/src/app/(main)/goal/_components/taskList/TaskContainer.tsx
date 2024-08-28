"use client";

import TaskProvider from "@/app/(main)/goal/_components/taskList/TaskProvider";
import { useSession } from "next-auth/react";

export default function TaskContainer() {
  const { data: session } = useSession();
  if (!session?.user.accessToken) return null;
  return (
    <TaskProvider>
      <TaskProvider.List />
    </TaskProvider>
  );
}
