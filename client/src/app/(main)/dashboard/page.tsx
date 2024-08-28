import DashboardContainer from "@/app/(main)/dashboard/_components/DashboardContainer";
import DashboardHeader from "@/app/(main)/dashboard/_components/DashboardHeader";
import SessionProvider from "@/components/providers/SessionProvider";

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
