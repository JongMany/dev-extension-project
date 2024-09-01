
import { PropsWithChildren } from "react";
// import Warp from "@/app/(main)/main/_components/Warp";
import { Header } from "@/components/shared/header";
import Footer from "@components/shared/footer/Footer";
import Warp from "@components/shared/warp/Warp";
// import Warp from "@/components/shared/warp/WarpScreen";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Warp />
      <Header />
      <div className="px-4 min-h-[75vh]">{children}</div>
      <Footer />
    </>
  );
}
