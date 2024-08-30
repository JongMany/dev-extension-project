import { useFetch } from "@/lib/extendedFetch";
import { useQuery } from "@tanstack/react-query";

export const useGetProfile = (email: string) => {
  const { fetch } = useFetch();
  const queryKey = ["profile", email];

  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["profile", email],
    queryFn: async () => {
      const response = await fetch(`api/v1/profile/${email}`, {
        credentials: "include",
        method: "GET",
        cache: "default",
        next: {
          tags: queryKey,
        },
      });
      console.log(email, response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    initialData: {
      profile: {
        email: "",
        link: [""],
      },
    },
  });

  return {
    profile: data.profile,
    isFetching,
    isError,
    error,
  };
};
