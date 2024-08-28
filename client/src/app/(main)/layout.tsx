import Footer from "@/app/(main)/_components/Footer";
import { Header } from "@/app/(main)/_components/Header";
import { PropsWithChildren } from "react";
import Warp from "@/app/(main)/main/_components/Warp";

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
