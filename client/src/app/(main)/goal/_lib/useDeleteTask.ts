import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFetch } from "@/lib/extendedFetch";

const useDeleteTask = (taskId: string) => {
  const { fetch } = useFetch();
  const queryClient = useQueryClient();

  const deleteTask = async () => {
    return fetch(`api/goal/${taskId}`, {
      method: "DELETE",
    });
  };

  const { mutate } = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });

  return mutate;
};

export default useDeleteTask;
