import { useQuery } from "@tanstack/react-query";
import {useFetch} from "@utils/shared/fetch/extendedFetch";
import {Task} from "@/models/task/entity/task.entity";

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
      const data = await res.json();
      return {
        tasks: data.tasks || ([] as Task[]),
      } as { tasks: Task[] };
    },
    staleTime: 1000 * 60 * 2,
    // retry: 1,
    // retry: false,
    // initialData: { goals: [] },
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
