import { useMutation, useQueryClient } from "@tanstack/react-query";
import {useFetch} from "@hooks/shared/useFetch";
import { EditTaskFormRequestDTO} from "@/models/task/dto/request/editTaskForm.dto";

const useUpdateTask = (taskId: string) => {
  const { fetch } = useFetch();
  const queryClient = useQueryClient();

  const updateFn = async (taskForm: EditTaskFormRequestDTO) => {
    console.log(taskForm);
    return fetch(`api/v1/goal/${taskId}`, {
      method: "PATCH",
      body: JSON.stringify(taskForm),
    });
  };

  const { mutate } = useMutation({
    mutationFn: (taskForm: EditTaskFormRequestDTO) => updateFn(taskForm),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });

  return mutate;
};

export default useUpdateTask;
