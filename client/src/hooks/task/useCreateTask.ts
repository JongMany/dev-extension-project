
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {useFetch} from "@hooks/shared/useFetch";
import {CreateTaskFormRequestDTO} from "@/models/task/dto/request/createTaskForm.dto";

const useCreateTask = () => {
  const { fetch } = useFetch();
  const queryClient = useQueryClient();
  const router = useRouter();

  const createTask = async (createTaskFormRequestDTO: CreateTaskFormRequestDTO) => {
    
    const response = await fetch(`api/v1/goal`, {
      method: "POST",
      body: JSON.stringify({ ...createTaskFormRequestDTO }),
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
