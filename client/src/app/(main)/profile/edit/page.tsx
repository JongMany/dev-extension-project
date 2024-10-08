import {dehydrate, HydrationBoundary} from "@tanstack/react-query";

import {auth} from "@/auth";
import {ProfileEditor} from "@components/profile";
import getQueryClient from "@utils/shared/query-client/getQueryClient";
import {fetchServer} from "@utils/shared/fetch/fetchServer";

async function EditProfilePage() {
  const session = await auth();
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["profile", session?.user.email],
    queryFn: async () => {
      const response = await fetchServer(`/v1/profile/${session?.user.email}`, {});
      const data = await response?.json();
      return data;
    },
  });

  const dehydratedState = dehydrate(queryClient);

  return <main>
    <h2 className="font-bold text-xl">프로필 편집</h2>
    <HydrationBoundary state={dehydratedState}>
      <ProfileEditor />
    </HydrationBoundary>
  </main>;
}

export default EditProfilePage;
