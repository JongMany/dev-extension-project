"use client";
import React from "react";
import Link from "next/link";

import LineDivider from "@/app/(main)/profile/_components/LineDivider";
import { useGetProfile } from "@/app/(main)/profile/_hooks/useGetProfile";
import { useSession } from "next-auth/react";

const infoClassName = "flex items-start gap-x-1 break-all";

type Props = {
  email: string;
};
export default function PrivacyInformation({ email }: Props) {
  const { profile } = useGetProfile(email);

  if (!email) {
    return null;
  }

  return (
    <>
      <div className="w-[100%] py-4 flex flex-col text-sm gap-y-1">
        <p className={infoClassName}>
          <span>🏢</span>
          <span>{profile?.company || "회사를 입력해주세요"}</span>
        </p>
        <p className={infoClassName}>
          <GeoIcon />
          <span>{profile?.address || "지역을 입력해주세요"}</span>
        </p>
        {profile?.link.map((link: string) => (
          <p key={link} className={infoClassName}>
            <span>🔗</span>
            <span>
              <Link href={link} target="_blank">
                {link}
              </Link>
            </span>
          </p>
        ))}
      </div>
      <LineDivider />
      <section className="w-[100%] pt-4 mb-2">
        <h3 className="font-bold text-lg mb-1">자기소개</h3>
        <div className="w-[100%] px-2">
          <p className="max-h-[20vh] h-[20vh] overflow-y-scroll scrollbar-hide border-[1px] px-4 py-2 rounded-lg break-all whitespace-pre-line">
            {profile?.introduction || "자기소개를 입력해주세요"}
          </p>
        </div>
      </section>
    </>
  );
}

function GeoIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      version="1.1"
      width="16"
      height="16"
      aria-hidden="true"
    >
      <path d="m12.596 11.596-3.535 3.536a1.5 1.5 0 0 1-2.122 0l-3.535-3.536a6.5 6.5 0 1 1 9.192-9.193 6.5 6.5 0 0 1 0 9.193Zm-1.06-8.132v-.001a5 5 0 1 0-7.072 7.072L8 14.07l3.536-3.534a5 5 0 0 0 0-7.072ZM8 9a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 9Z"></path>
    </svg>
  );
}
