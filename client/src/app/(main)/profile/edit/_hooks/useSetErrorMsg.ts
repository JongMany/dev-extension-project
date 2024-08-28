import {useEffect, useState} from "react";

export function useSetErrorMsg() {
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (errorMsg.length === 0) {
      return;
    }
    setTimeout(() => {
      setErrorMsg("");
    }, 1500);
  }, [errorMsg]);

  return {errorMsg, setErrorMsg}
}