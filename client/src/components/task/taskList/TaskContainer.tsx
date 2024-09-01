"use client";


import { useSession } from "next-auth/react";
import TaskProvider from "@components/task/taskList/TaskProvider";

export default function TaskContainer() {
  const { data: session } = useSession();
  if (!session?.user.accessToken) return null;
  return (
    <TaskProvider>
      <TaskProvider.List />
    </TaskProvider>
  );
}
