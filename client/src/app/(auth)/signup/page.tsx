import SignupForm from "@/app/(auth)/signup/_components/SignupForm";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <main className="flex items-center justify-center min-h-[100vh]">
      <section className="flex flex-col items-center justify-center px-4 py-2 border-[1px] border-green-500 rounded-xl bg-green-500 text-white">
      <h1 className="py-6 font-bold text-2xl flex justify-center">
        Study Log | 당신의 개발 시간을 관리해드립니다.
      </h1>
        <h2 className="py-4 font-bold text-2xl">로그인</h2>
        <SignupForm />
        <div className="flex flex-col items-center decoration-solid underline">
          <Link href="/">뒤로가기</Link>
        </div>
      </section>
    </main>
  );
}
