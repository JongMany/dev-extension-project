import { auth } from "@/auth";
import Link from "next/link";
import React from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { SiNaver } from "react-icons/si";

export default async function Footer() {
  const session = await auth();
  return (
    <footer className="py-6 px-4 bg-black text-white flex justify-between min-h-[15vh]">
      <div className="flex-1 flex flex-col items-center">
        <h4 className="text-lg font-semibold mb-2">StudyLog</h4>
        <span className="text-md">© 2024. 방구석코딩쟁이</span>
      </div>
      <div className="flex-1 flex flex-col items-center">
        <h4 className="text-lg font-semibold mb-2">
          저희의 익스텐션을 통해 <br /> 코딩을 효율적으로 해보세요
        </h4>
        <div className="mt-2 flex gap-x-5 text-[14px] font-semibold ">
          <div className="flex flex-col">
            <span>
              <Link href="/main">홈</Link>
            </span>
            <span>
              <Link href="/dashboard">대시보드</Link>
            </span>
          </div>
          <div className="flex flex-col">
            <span>
              <Link href="/goal">목표</Link>
            </span>
            <span>
              <Link href="/rank">랭킹</Link>
            </span>
            <span>
              <Link
                href={`/profile/${
                  session?.user.email || "blackberry1114@naver.com"
                }`}
              >
                프로필
              </Link>
            </span>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center">
        <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
        <div className="flex gap-x-2">
          <div className="flex flex-col gap-y-2">
            <span className="text-lg px-3 py-3 rounded-full border-[1px]">
              <Link href="https://github.com/JongMany" target="_blank">
                <FaGithub className="w-[24px] h-[24px]" />
              </Link>
            </span>
            <span className="text-lg px-3 py-3 rounded-full border-[1px]">
              <Link
                href="https://www.linkedin.com/in/%EC%A2%85%EB%AF%BC-%EC%9D%B4-557572284/"
                target="_blank"
              >
                <FaLinkedin className="w-[24px] h-[24px]" />
              </Link>
            </span>
          </div>
          <div className="flex flex-col gap-y-2">
            <span className="text-lg px-3 py-3 rounded-full border-[1px]">
              <Link href="mailto:blackberry1114@naver.com" target="_top">
                <SiNaver className="w-[24px] h-[24px]" />
              </Link>
            </span>
            <span className="text-lg px-3 py-3 rounded-full border-[1px]">
              <Link
                href="https://www.instagram.com/homebody_coder/"
                target="_blank"
              >
                <FaInstagram className="w-[24px] h-[24px]" />
              </Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
