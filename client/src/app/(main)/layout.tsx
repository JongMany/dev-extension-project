
import { PropsWithChildren } from "react";

import { Header } from "@/components/shared/header";
import Footer from "@components/shared/footer/Footer";
import Warp from "@components/shared/warp/Warp";


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
