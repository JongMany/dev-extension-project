"use client";

import { useRouter } from "next/navigation";
import {signUp} from "@/service/auth/signUp";

import {SignUpFormVO} from "@/models/auth/sign-up/vo/signUp.vo";
import {SignUpFormDTO} from "@/models/auth/sign-up/dto/request/signUp.dto";

type Props = {
  form: SignUpFormVO;
};

export default function SignUpButton({ form }: Props) {
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const isValidate = validateForm(form);
    const signUpForm = formatSignUpForm(form);

    if (!isValidate) {
      return;
    }
    // TODO: 회원 가입 요청

    const data = await signUp(signUpForm);
    if (data.message === "User created") {
      router.replace("/");
    }
  };

  return <button onClick={handleSubmit}>회원가입</button>;
}

/** 모든 form의 checkDuplicate가 true인 경우에만 유효성 통과 */
function validateForm(form: SignUpFormVO) {
  return Object.values(form).every((field) => field.checkDuplicate);
}

/** 회원가입 포맷으로 변경  */
function formatSignUpForm(form: SignUpFormVO) {
  return Object.entries(form).reduce((acc, [key, value]) => {
    acc[key as keyof SignUpFormDTO] = value.text;
    return acc;
  }, {} as SignUpFormDTO);
}
