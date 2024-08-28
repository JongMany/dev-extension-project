import { useFetch } from "@/lib/extendedFetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface Task {
  projectName: string;
  task: string;
  owner: string;
  dueDate: string;
  createdAt: string;
}

const useCreateTask = () => {
  const { fetch } = useFetch();
  const queryClient = useQueryClient();
  const router = useRouter();

  const createTask = async (task: Task) => {
    console.log(task, "task");
    const response = await fetch(`/goal`, {
      method: "POST",
      body: JSON.stringify({ ...task }),
      // credentials: "include",
      cache: "no-cache",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  };

  const { mutate } = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      router.back();
    },
  });
  return mutate;
};

export default useCreateTask;
