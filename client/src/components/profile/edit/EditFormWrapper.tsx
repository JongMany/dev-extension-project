"use client";

import React from 'react';
import {useSession} from "next-auth/react";
import {useQueryClient} from "@tanstack/react-query";

import {mapToProfileFormDto} from "@/app/(main)/profile/edit/_lib/mapToProfileDto";
import {type Profile} from "@/models/profile/profile.model";
import EmptyView from "@components/profile/edit/EmptyView";
import EditForm from "@components/profile/edit/EditForm";


const EditFormWrapper = () => {
  const auth = useSession();
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<{ profile: Profile }>(["profile", auth.data?.user?.email])


  return (<section className="flex justify-center mt-16 p-8 border-[2px] rounded-lg border-gray-500">
    {data ? <EditForm profile={mapToProfileFormDto(data.profile)}/> : <EmptyView />}
  </section>)

};

export default EditFormWrapper;