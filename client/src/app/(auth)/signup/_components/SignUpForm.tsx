"use client";

import { type ChangeEventHandler, useState } from "react";

import SignUpButton from "@/app/(auth)/signup/_components/SignUpButton";
import CheckDuplicateButton from "@/app/(auth)/signup/_components/CheckDuplicateButton";

import { SignUp } from "@/models/auth/dtos/auth.model";
import {useFetch} from "@utils/shared/fetch/extendedFetch";

const initialState: SignUp = {
  apiKey: { text: "", checkDuplicate: false },
  password: { text: "", checkDuplicate: true },
  email: { text: "", checkDuplicate: false },
  nickname: { text: "", checkDuplicate: false },
};

export default function SignUpForm() {
  const [form, setForm] = useState(initialState);
  const { fetch } = useFetch();
  const formChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    setForm({
      ...form,
      [e.target.name]: {
        ...form[e.target.name as keyof SignUp],
        text: e.target.value,
      },
    });
  };

  const checkDuplicate = (name: keyof SignUp) => async () => {
    console.log("name", name);
    try {
      const response = await fetch(`/api/v1/auth/duplicate-check/${name}`, {
        method: "POST",
        body: JSON.stringify({
          [name]: form[name].text,
        }),
      });

      const data = await response.json();
      console.log("data", data);
      if (data.statusCode === 200) {
        setForm({
          ...form,
          [name]: {
            ...form[name],
            checkDuplicate: true,
          },
        });
      } else {
        setForm({
          ...form,
          [name]: {
            ...form[name],
            checkDuplicate: false,
          },
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <form className="flex flex-col items-center">
      <div className="w-[100%] px-8 pb-4 grid grid-cols-signUp gap-y-4">
        <label htmlFor="email" className="mr-4 font-semibold text-base">
          이메일
        </label>
        <input
          className="py-[4px] px-2 rounded-xl w-60 text-black"
          id="email"
          name="email"
          type="email"
          placeholder="이메일을 입력해주세요"
          onChange={formChangeHandler}
          value={form.email.text}
        />
        <CheckDuplicateButton
          data={form.email.text}
          checkFn={checkDuplicate("email")}
        />
        <div></div>
        <div className="col-span-2 text-sm p-y-0">
          {!form.email.checkDuplicate
            ? "중복 검사를 진행해주세요"
            : "중복 검사 완료"}
        </div>
        <label htmlFor="password" className="mr-4 font-semibold text-base">
          비밀번호
        </label>
        <input
          className="py-[4px] px-2 rounded-xl w-60 text-black"
          id="password"
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          onChange={formChangeHandler}
          value={form.password.text}
          minLength={4}
        />
        <div></div>
        <div></div>
        <div className="col-span-2"></div>
        <label htmlFor="nickname" className="mr-4 font-semibold text-base">
          닉네임
        </label>
        <input
          className="py-[4px] px-2 rounded-xl w-60 text-black"
          id="nickname"
          name="nickname"
          type="text"
          placeholder="닉네임을 입력해주세요"
          onChange={formChangeHandler}
          value={form.nickname.text}
        />
        <CheckDuplicateButton
          data={form.nickname.text}
          checkFn={checkDuplicate("nickname")}
        />
        <div></div>
        <div className="col-span-2 text-sm p-y-0">
          {!form.nickname.checkDuplicate
            ? "중복 검사를 진행해주세요"
            : "중복 검사 완료"}
        </div>
        <label htmlFor="apikey" className="mr-4 font-semibold text-base">
          ApiKey
        </label>
        <input
          className="py-[4px] px-2 rounded-xl w-60 text-black"
          id="apikey"
          name="apiKey"
          type="text"
          placeholder="apiKey를 입력해주세요"
          onChange={formChangeHandler}
          value={form.apiKey.text}
        />
        <CheckDuplicateButton
          data={form.apiKey.text}
          checkFn={checkDuplicate("apiKey")}
        />
        <div></div>
        <div className="col-span-2 text-sm p-y-0">
          {!form.apiKey.checkDuplicate
            ? "중복 검사를 진행해주세요"
            : "중복 검사 완료"}
        </div>
      </div>
      <SignUpButton form={form} />
    </form>
  );
}
