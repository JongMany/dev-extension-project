
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {ProfileFormDto} from "@utils/profile/mapToProfileDto";
import {useFetch} from "@hooks/shared/useFetch";


export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data } = useSession();
  const { fetch } = useFetch();

  const { mutate } = useMutation({
    mutationFn: async (updatedProfileData: ProfileFormDto) => {
      const updatedForm = mapToProfileBody(updatedProfileData);
      const response = await fetch(`api/v1/profile`, {
        method: "POST",
        body: JSON.stringify(updatedForm),
      });
      const data = await response.json();
      console.log(data);
    },
    onSuccess: async () => {
      router.replace(`/profile/${data?.user?.email}`);
      await queryClient.invalidateQueries({
        queryKey: ["profile", data?.user?.email],
      });
    },
  });
  return { mutate };
}

function mapToProfileBody(profileFormDto: ProfileFormDto) {
  return {
    address: profileFormDto.address,
    company: profileFormDto.company,
    instaId: profileFormDto.instagramId,
    introduction: profileFormDto.introduction,
    link: profileFormDto.link.filter((data) => data),
  };
}
