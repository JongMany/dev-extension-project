"use client";

import React from 'react';
import {useSession} from "next-auth/react";
import {useQueryClient} from "@tanstack/react-query";

import {type ProfileEntity} from "@/models/profile/entity/profile.entity";
import EmptyView from "@components/shared/empty-view/EmptyView";
import EditProfileForm from "@components/profile/edit/edit-profile-form/EditProfileForm";
import {toProfileFormVO} from "@/models/profile/formatModel";

const ProfileEditor = () => {
  const auth = useSession();
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<{ profile: ProfileEntity }>(["profile", auth.data?.user?.email])

  return (<section className="flex justify-center mt-16 p-8 border-[2px] rounded-lg border-gray-500">
    {data ? <EditProfileForm profile={toProfileFormVO(data.profile)}/> : <EmptyView />}
  </section>)

};

export default ProfileEditor;