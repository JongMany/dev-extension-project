import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFetch } from "@/lib/extendedFetch";
import {IEditTaskForm} from "@/models/task/taskForm.dto";

const useUpdateTask = (taskId: string) => {
  const { fetch } = useFetch();
  const queryClient = useQueryClient();

  const updateFn = async (taskForm: IEditTaskForm) => {
    console.log(taskForm);
    return fetch(`api/v1/goal/${taskId}`, {
      method: "PATCH",
      body: JSON.stringify(taskForm),
    });
  };

  const { mutate } = useMutation({
    mutationFn: (taskForm: IEditTaskForm) => updateFn(taskForm),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });

  return mutate;
};

export default useUpdateTask;
