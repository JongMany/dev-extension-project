
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {useFetch} from "@hooks/shared/useFetch";
import {ProfileFormRequestDTO} from "@/models/profile/dto/request/profile.dto";


export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data } = useSession();
  const { fetch } = useFetch();

  const { mutate } = useMutation({
    mutationFn: async (updatedProfileData: ProfileFormRequestDTO) => {
      const updatedForm = sanitizeProfileFormRequestDTO(updatedProfileData);
      const response = await fetch(`api/v1/profile`, {
        method: "POST",
        body: JSON.stringify(updatedForm),
      });
      const data = await response.json();
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

function sanitizeProfileFormRequestDTO(profileFormDto: ProfileFormRequestDTO) {
  return {
    address: profileFormDto.address,
    company: profileFormDto.company,
    instaId: profileFormDto.instagramId,
    introduction: profileFormDto.introduction,
    link: profileFormDto.link.filter((data) => data),
  };
}
