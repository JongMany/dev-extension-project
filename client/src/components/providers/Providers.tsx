import { MSWProvider } from "@/components/providers/MSWProvider";
import TanstackQueryProvider from "@/components/providers/TanstackQueryProvider";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <MSWProvider>
      <SessionProvider>
        <TanstackQueryProvider>{children}</TanstackQueryProvider>
      </SessionProvider>
    </MSWProvider>
  );
}
