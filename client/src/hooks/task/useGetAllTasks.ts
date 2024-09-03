import { useQuery } from "@tanstack/react-query";

import {TaskListEntity} from "@/models/task/entity/task.entity";
import {useFetch} from "@hooks/shared/useFetch";

export function useGetAllTasks() {
  const queryKey = ["tasks", "all"];
  const { fetch } = useFetch();

  return useQuery({
    queryKey,
    queryFn: async () => {
      const res = await fetch(`api/v1/goal/all`, {
        method: "GET",
        cache: "default",
        credentials: "include",
        next: {
          tags: queryKey,
        },
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data: TaskListEntity = await res.json();
      return {
        tasks: data.tasks || []
      };
    },
    staleTime: 1000 * 60 * 2,

  });
}

export const getTask = async () => {
  const res = await fetch(`api/v1/goal/all`, {
    method: "GET",
    cache: "default",
    credentials: "include",
    next: {
      // revalidate:
    },
  });

  return res.json();
};
