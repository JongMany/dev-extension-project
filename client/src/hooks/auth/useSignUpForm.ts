import {useState} from "react";
import {SignUpFormVO} from "@/models/auth/sign-up/vo/signUp.vo";

const initialState: SignUpFormVO = {
  apiKey: {text: "", checkDuplicate: false},
  password: {text: "", checkDuplicate: true},
  email: {text: "", checkDuplicate: false},
  nickname: {text: "", checkDuplicate: false},
};

export const useSignUpForm = () => {
  const [form, setForm] = useState(initialState);
  const changeSignUpForm = (name: keyof SignUpFormVO, text: string) => {
    setForm({
      ...form,
      [name]: {
        ...form[name as keyof SignUpFormVO],
        text,
      },
    });
  }

  const setCheckDuplicate = (name: keyof SignUpFormVO, isValid: boolean) => {
    setForm({
      ...form,
      [name]: {
        ...form[name],
        checkDuplicate: isValid
      }
    })
  }

  const validateBeforeCheckDuplicate = (name: keyof SignUpFormVO) => {
    switch (name) {
      case "email":
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(form.email.text);
      case "apiKey":
        const apiKeyPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8}$/;
        return apiKeyPattern.test(form.apiKey.text);
      case "nickname":
        const nicknamePattern = /^[A-Za-z\d가-힣]{2,}$/;
        return nicknamePattern.test(form.nickname.text);
      case "password":
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8}$/;
        return passwordPattern.test(form.password.text)
      default:
        return false;
    }
  }

  return {
    form,
    changeSignUpForm,
    setCheckDuplicate,
    validateBeforeCheckDuplicate
  }
}