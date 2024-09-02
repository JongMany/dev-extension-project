
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {useFetch} from "@hooks/shared/useFetch";


type UpdateDateTask = {
  taskId: string;
  updatedDate: string;
};

export const useUpdateTaskDueDate = () => {
  const { fetch } = useFetch();
  const queryClient = useQueryClient();

  const updateFn = async (updatedDateTask: UpdateDateTask) => {
    return fetch(`api/v1/goal/${updatedDateTask.taskId}`, {
      method: "PATCH",
      body: JSON.stringify({
        dueDate: updatedDateTask.updatedDate,
      }),
    });
  };

  /* TODO: Optimistic update로 구현하기 */
  return useMutation({
    mutationFn: (updatedDateTask: UpdateDateTask) => updateFn(updatedDateTask),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });
};
