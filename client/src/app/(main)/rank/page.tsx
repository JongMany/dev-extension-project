import MyRank from "@/app/(main)/rank/_components/MyRank";
import RankContainer from "@/app/(main)/rank/_components/RankContainer";
import RankHeader from "@/app/(main)/rank/_components/RankHeader";
import SessionProvider from "@/components/providers/SessionProvider";

export default function RankPage() {
  return (
    <main className="pb-8">
      <RankHeader />
      <SessionProvider>
        <RankContainer />
        <MyRank />
      </SessionProvider>
    </main>
  );
}
