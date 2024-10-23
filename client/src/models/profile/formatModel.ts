import {ProfileEntity} from "@/models/profile/entity/profile.entity";
import {ProfileFormVO} from "@/models/profile/vo/profile.vo";
import {ProfileFormRequestDTO} from "@/models/profile/dto/request/profile.dto";



export function toProfileFormVO(profile: ProfileEntity): ProfileFormRequestDTO {
  const links = profile.link.length === 0 ? [""] : profile.link
  return {
    address: profile.address,
    company: profile.company,
    instagramId: profile.instaId,
    introduction: profile.introduction,
    link: links,
  }
}
export function toProfileFormRequestDTO(profile: ProfileFormVO): ProfileFormRequestDTO {
  return profile;
}