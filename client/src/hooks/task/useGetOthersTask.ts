import { useQuery } from "@tanstack/react-query";

import {TaskEntity} from "@/models/task/entity/task.entity";
import {useFetch} from "@hooks/shared/useFetch";

export default function useGetOthersTask(email: string) {
  const { fetch } = useFetch();
  const fetchOtherTask = async (email: string) => {
    try {
      const response = await fetch(`api/v1/goal/${email}`, {
        method: "GET",
        cache: "default",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      // return data;
      return {
        tasks: data.tasks || ([] as TaskEntity[]),
      } as { tasks: TaskEntity[] };
    } catch (error) {
      console.error(error);
    }
  };
  return useQuery({
    queryKey: ["tasks", email],
    queryFn: () => fetchOtherTask(email),
  });
}
