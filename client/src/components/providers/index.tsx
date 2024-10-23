import {MSWProvider} from "@/components/providers/MSWProvider";
import TanstackQueryProvider from "@/components/providers/TanstackQueryProvider";
import {SessionProvider} from "next-auth/react";
import {PropsWithChildren} from "react";
import ToastProvider from "@components/providers/ToastProvider";

export default function Index({children}: PropsWithChildren) {
  return (
      <MSWProvider>
        <SessionProvider>
          <ToastProvider>
            <TanstackQueryProvider>{children}</TanstackQueryProvider>
          </ToastProvider>
        </SessionProvider>
      </MSWProvider>
  );
}
