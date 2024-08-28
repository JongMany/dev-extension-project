"use client";

import Button from "@/components/shared/button/Button";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  const goToBackHandler = () => {
    router.back();
  };

  return <Button onClick={goToBackHandler}>뒤로가기</Button>;
}
