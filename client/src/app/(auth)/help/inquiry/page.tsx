import Link from "next/link";

export default function Page() {
  return (
    <main className="flex items-center justify-center min-h-[100vh]">
      <section className="flex flex-col items-center justify-center px-4 py-2 border-[1px] border-[#d1fae5] rounded-xl bg-green-500 text-white">
        <h1 className="py-6 font-bold text-2xl flex justify-center">
          Study Log | 당신의 개발 시간을 관리해드립니다.
        </h1>
        <h2 className="py-4 font-bold text-2xl">
          비밀번호|ApiKey를 까먹으셨나요?
        </h2>
        {/* <SigninForm /> */}
        <div className="flex flex-col items-center decoration-solid underline">
          <Link href="/">뒤로가기</Link>
        </div>
      </section>
    </main>
  );
}
