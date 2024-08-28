import {Profile} from "@/models/profile/profile.model";

export interface ProfileFormDto {
  address: string;
  company: string;
  instagramId: string;
  introduction: string;
  link: string[];
}

export function mapToProfileFormDto(profile: Profile): ProfileFormDto {
  const links = profile.link.length === 0 ? [""] : profile.link
  return {
    address: profile.address,
    company: profile.company,
    instagramId: profile.instaId,
    introduction: profile.introduction,
    link: links,
  }
}