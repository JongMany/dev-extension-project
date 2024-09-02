import { useMutation, useQueryClient } from "@tanstack/react-query";
import {useFetch} from "@utils/shared/fetch/extendedFetch";


const useDeleteTask = (taskId: string) => {
  const { fetch } = useFetch();
  const queryClient = useQueryClient();

  const deleteTask = async () => {
    return fetch(`api/v1/goal/${taskId}`, {
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
