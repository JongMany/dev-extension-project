

import SessionProvider from "@/components/providers/SessionProvider";
import { auth } from "@/auth";

import {
  ProfileView,
  TimeHeatmapContainer,
  CalendarContainer,
  SharedCalendarContainer,
  EditProfileLink
} from "@components/profile";


type Props = { params: { email: string } };

export default async function ProfilePage({ params }: Props) {
  const { email } = params;
  const session = await auth();
  const decodedEmail = decodeURIComponent(email);
  return (
    <main className="flex flex-1 min-h-[90vh] justify-between">
      <nav className="flex flex-col w-[250px] items-center px-4 mb-4 border-r-[1px]">
        <h1 className="text-2xl font-bold mb-6">Profile</h1>
        <ProfileView email={decodedEmail} />
        {session?.user?.email === decodedEmail ? <EditProfileLink /> : null}
      </nav>
      <section className="min-w-[700px] flex-1 px-4 py-2">
        <TimeHeatmapContainer email={decodedEmail} />
        <SessionProvider>
          {session?.user?.email === decodedEmail ? (
            <CalendarContainer />
          ) : (
            <SharedCalendarContainer email={decodedEmail} />
          )}
        </SessionProvider>
      </section>
      <section className="w-[250px] px-2 py-2">
        {/* 광고 문의? */}
        <div className="min-h-[300px] border-2 rounded-xl px-2 py-2 text-lg flex flex-col items-center">광고 문의</div>
      </section>
    </main>
  );
}
