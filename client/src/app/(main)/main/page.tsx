import Description from "@/app/(main)/main/_components/Description";
// import Footer from "@/app/(main)/main/_components/Footer";
import HeadTitle from "@/app/(main)/main/_components/HeadTitle";
import Warp from "@/app/(main)/main/_components/Warp";

// Framer Motion - https://www.youtube.com/watch?v=nPsJfTVjkdo
export default function Page() {
  return (
    <>
      {/* <Warp /> */}
      <main>
        <HeadTitle />
        <Description />
        {/* <Footer /> */}
      </main>
    </>
  );
}
