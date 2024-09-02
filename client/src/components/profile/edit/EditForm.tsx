"use client"
import {useFormWithList} from "@/lib/useForm";

import Input from "@components/shared/input/Input";
import {ChangeEvent, FormEvent} from "react";
import SubmitButton from "@components/shared/button/SubmitButton";

import AddMoreLinkButton from "@components/profile/edit/AddMoreLinkButton";
import {useUpdateProfile} from "@hooks/profile/useUpdateProfile";
import {ProfileFormDto} from "@utils/profile/mapToProfileDto";

type Props = {
  profile: ProfileFormDto;
}

const EditForm = ({profile}: Props) => {
  const {form, onChange, changeList, appendList} = useFormWithList(profile);
  const {mutate} = useUpdateProfile();

  const changeLinkHandler = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
    changeList(index, "link", e.target.value)
  }

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: mutation 호출, invalidateQueries
    // router.replace(`/profile/${data?.user?.email}`);
    mutate(form);
  }

  return (
      <form className="flex flex-col w-[70%] gap-y-4" onSubmit={submitHandler}>
        <div className="flex items-center">
          <label className="font-bold w-20 block " htmlFor='company'>조직</label>
          <Input name="company" id="company" value={form.company} onChange={onChange} placeholder="재직 중인 회사를 입력해주세요"/>
        </div>
        <div className="flex items-center">
          <label className="font-bold w-20 block " htmlFor='company'>지역</label>
          <Input name="address" value={form.address} onChange={onChange} placeholder="거주 지역을 입력해주세요"/>
        </div>
        <div className="flex items-center">
          <label className="font-bold w-20 block " htmlFor='company'>인스타그램</label>
          <Input name="instagramId" value={form.instagramId} onChange={onChange} placeholder="인스타그램 아이디를 입력해주세요"/>
        </div>
        <div className="flex">
          <label className="font-bold w-20 block" htmlFor='company'>링크</label>
          <div className="flex-1 flex flex-col gap-y-2">
            {
              form.link.map((link, index) => <Input name="link" className="w-[100%] block" key={index} value={link}
                                                    onChange={changeLinkHandler(index)}
                                                    placeholder="링크를 입력해주세요"/>)
            }
          </div>
        </div>
        <div className="flex">
          <h4 className="font-bold w-20 block">자기소개</h4>
          <textarea name="introduction" className="px-2 py-1 border-black border-2 rounded-lg w-[80%] resize-none min-h-[6.25rem]"
                    value={form.introduction} placeholder="자기소개를 입력해주세요" onChange={onChange}/>
        </div>
        <div className="flex justify-center gap-x-4 relative">
          <AddMoreLinkButton onClick={appendList("link")}/>
          <SubmitButton>저장</SubmitButton>
        </div>
      </form>
  );
};

export default EditForm;