
import { PropsWithChildren } from "react";
import Warp from "@/app/(main)/main/_components/Warp";
import { Header } from "@/components/shared/header";
import Footer from "@components/shared/footer/Footer";

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
