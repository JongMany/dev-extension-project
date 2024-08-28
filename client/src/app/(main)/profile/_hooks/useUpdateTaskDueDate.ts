import { useFetch } from "@/lib/extendedFetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UpdateDateTask = {
  taskId: string;
  updatedDate: string;
};

export const useUpdateTaskDueDate = () => {
  const { fetch } = useFetch();
  const queryClient = useQueryClient();

  const updateFn = async (updatedDateTask: UpdateDateTask) => {
    return fetch(`/goal/${updatedDateTask.taskId}`, {
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
