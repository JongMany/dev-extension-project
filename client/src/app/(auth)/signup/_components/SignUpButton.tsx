"use client";

import { SignUp } from "@/models/auth/dto/auth.dto";
import { useRouter } from "next/navigation";
import {signUp} from "@/service/auth/signUp";
import {SignUpForm} from "@/models/auth/dto/signUp.dto";

type Props = {
  form: SignUp;
};

export default function SignUpButton({ form }: Props) {
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const isValidate = validateForm(form);
    const signUpForm = formatSignUpForm(form);

    if (!isValidate) {
      console.log("유효성 검사 실패");
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
function validateForm(form: SignUp) {
  return Object.values(form).every((field) => field.checkDuplicate);
}

/** 회원가입 포맷으로 변경  */
function formatSignUpForm(form: SignUp) {
  return Object.entries(form).reduce((acc, [key, value]) => {
    acc[key as keyof SignUpForm] = value.text;
    return acc;
  }, {} as SignUpForm);
}
