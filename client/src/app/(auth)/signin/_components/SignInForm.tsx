"use client";

import SignInButton from "@/app/(auth)/(signin)/_components/SignInButton";
import { SignIn } from "@/models/auth/dtos/auth.model";

import { type ChangeEventHandler, useState } from "react";

const initialState: SignIn = {
  apiKey: "",
  password: "",
  email: "",
};

export default function SignInForm() {
  const [form, setForm] = useState<SignIn>(initialState);

  const formChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form className="flex flex-col items-center">
      <div className="w-[100%] px-8 pb-4 flex justify-between items-center">
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
          value={form.email}
        />
      </div>
      <div className="w-[100%] px-8 pb-4 flex justify-between items-center">
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
          value={form.password}
        />
      </div>
      <div className="w-[100%] px-8 pb-4 mb-4 flex justify-between items-center">
        <label htmlFor="apikey" className="mr-4 font-semibold text-base">
          ApiKey
        </label>
        <input
          className="py-[4px] px-2 rounded-xl w-60 text-black"
          id="apiKey"
          name="apiKey"
          type="text"
          placeholder="apiKey를 입력해주세요"
          onChange={formChangeHandler}
          value={form.apiKey}
        />
      </div>
      <SignInButton form={form} />
    </form>
  );
}
