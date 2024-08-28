import { Task } from "@/entities/task";
import { useFetch } from "@/lib/extendedFetch";
import { useQuery } from "@tanstack/react-query";

export default function useGetOthersTask(email: string) {
  const { fetch } = useFetch();
  const fetchOtherTask = async (email: string) => {
    try {
      const response = await fetch(`/goal/${email}`, {
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
        tasks: data.tasks || ([] as Task[]),
      } as { tasks: Task[] };
    } catch (error) {
      console.error(error);
    }
  };
  return useQuery({
    queryKey: ["tasks", email],
    queryFn: () => fetchOtherTask(email),
  });
}
