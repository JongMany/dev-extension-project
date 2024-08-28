import SigninForm from "@/app/(auth)/(signin)/_components/SigninForm";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-[100vh]">
      <section className="flex flex-col items-center justify-center px-4 py-2 border-[1px] border-[#d1fae5] rounded-xl bg-green-500 text-white">
      <h1 className="py-6 font-bold text-2xl flex justify-center">
        Study Log | 당신의 개발 시간을 관리해드립니다.
      </h1>
        <h2 className="py-4 font-bold text-2xl">로그인</h2>
        <SigninForm />
        <div className="flex flex-col items-center decoration-solid underline">
          <Link href="/signup">회원가입</Link>
          <Link href="/help/inquiry">
            ApiKey / 이메일 / 비밀번호를 까먹으셨나요?
          </Link>
        </div>
      </section>
    </main>
  );
}
