"use client";

import { useSession } from "next-auth/react";

export default function TestButton() {
  const session = useSession();
  console.log(session);

  const onClickHandler = async () => {
    if (session && session.data) {
      const acessToken = localStorage.getItem("accessToken");
    }
  };
  return <button onClick={onClickHandler}>테스트</button>;
}
