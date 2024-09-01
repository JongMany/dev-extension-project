
import { auth } from "@/auth";

import SessionProvider from "@/components/providers/SessionProvider";
import PrivacyInformation from "@components/profile/profileView/PrivacyInformation";
import LineDivider from "@components/shared/line-divider/LineDivider";

type Props = { email: string };

export default async function ProfileView({ email }: Props) {
  const session = await auth();
  let UserInfoComponent;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/nickname/${email}`
    );
    const data = await response.json();

    UserInfoComponent = (
      <div className="w-[100%] pb-4">
        {data.statusCode === 404 ||
        data.statusCode === 500 ||
        data.statusCode === 400 ||
        "error" in data ? (
          <>
            <h2 className="text-sm font-bold mt-2 mb-2">
              유저가 존재하지 않습니다
            </h2>
          </>
        ) : (
          <>
            <h2 className="text-lg font-bold">{data.nickname}</h2>
            <p className="text-sm">{email}</p>
          </>
        )}
      </div>
    );
  } catch (error) {
    UserInfoComponent = <div>유저가 존재하지 않습니다</div>;
  }

  return (
    <>
      {UserInfoComponent}
      <LineDivider />
      {/* <PrivacyInformationProvider></PrivacyInformationProvider> */}
      <SessionProvider>
        <PrivacyInformation email={email} />
      </SessionProvider>
    </>
  );
}
