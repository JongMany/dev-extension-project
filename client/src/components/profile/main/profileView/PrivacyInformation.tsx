"use client";
import React from "react";
import Link from "next/link";
import LineDivider from "@components/shared/line-divider/LineDivider";
import GeoIcon from "@components/shared/icon/GeoPinIcon";

import {useGetProfile} from "@hooks/profile/useGetProfile";


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

