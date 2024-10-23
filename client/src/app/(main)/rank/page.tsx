import SessionProvider from "@/components/providers/SessionProvider";
import {MyRank, RankContainer, RankHeader} from "@components/rank";

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
