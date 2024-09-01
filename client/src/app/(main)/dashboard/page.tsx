
import SessionProvider from "@/components/providers/SessionProvider";
import {DashboardContainer, DashboardHeader} from "@components/dashboard";

export default function DashboardPage() {
  // 대시보드
  // 필터링 - 기간별
  // 언어별 프로젝트별
  return (
    <main>
      <DashboardHeader />
      <SessionProvider>
        <DashboardContainer />
      </SessionProvider>
    </main>
  );
}
