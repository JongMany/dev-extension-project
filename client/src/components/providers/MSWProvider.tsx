"use client";

import { useState, type PropsWithChildren, useEffect } from "react";

const isMockingCtx = process.env.NEXT_PUBLIC_API_MOCKING === "enabled";

export const MSWProvider = ({ children }: PropsWithChildren) => {
  const [mswReady, setMSWReady] = useState(() => !isMockingCtx);

  useEffect(() => {
    const init = async () => {
      if (isMockingCtx) {
        const initMocks = await import("@/mocks/index").then(
          (res) => res.initMocks
        );
        await initMocks();
      }
      setMSWReady(true);
    };

    if (!mswReady && isMockingCtx) {
      init();
    }
  }, [mswReady]);

  if (!mswReady) return null;

  return <>{children}</>;
};
