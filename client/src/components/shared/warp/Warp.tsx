"use client";


import React, { useEffect, useState } from "react";
import WarpScreen from "@components/shared/warp/WarpScreen";
import {WarpStateType} from "@components/shared/warp/lib/constants";

export default function Warp() {
  const [isSwitching, setIsSwitching] = useState<WarpStateType>("end");

  useEffect(() => {
    if (!JSON.parse(sessionStorage.getItem("isReload") ?? "false")) {
      console.log(sessionStorage.getItem("isReload"));
      setIsSwitching("warp");
    }
  }, []);

  useEffect(() => {
    const setReload = () => {
      console.log('reload');
      sessionStorage.setItem("isReload", "true");
    }

    window.addEventListener("beforeunload", setReload);

    return () => window.removeEventListener("beforeunload", setReload);
  }, []);
  return (
      <WarpScreen isSwitching={isSwitching} setIsSwitching={setIsSwitching} />
  );
}
