"use client";
import {useState} from "react";
import {hasEmptyInStringList} from "@/lib/validateArrays";

type FormType = { [key: string | symbol]: any }


export const useForm = <T extends FormType>(initialForm: T) => {
  const [form, setForm] = useState<T>(initialForm);

  const onChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {name, value} = e.target;
    setForm({...form, [name]: value});
  };

  const resetForm = () => {
    setForm(initialForm);
  };

  return {form, onChange, setForm, resetForm};
};

export const useFormWithList = <T extends FormType>(initialForm: T) => {
  const {form, setForm, onChange} = useForm(initialForm);
  const changeList = (index: number, name: keyof typeof form, newData: string) => {
    if (!Array.isArray(form[name])) {
      throw new Error(`${name.toString()} 속성은 배열이 아닙니다.`)
    }

    setForm(({
      ...form,
      [name]: form[name].map((originData: any, idx: number) => index !== idx ? originData : newData),
    }))
  }

  const appendList = (name: keyof typeof form) => () => {
    if (hasEmptyInStringList(form[name])) {
      throw new Error("빈 문자열이 존재합니다.")
    }

    setForm({
      ...form,
      [name]: [...form[name], ""],
    })
  }

  return {form, onChange, changeList, appendList}
}

export const useFormWithDate = <T extends FormType>(initialForm: T) => {
  const {form, setForm, onChange} = useForm(initialForm);
  const changeDate = (date: Date, name: string) => {
    setForm({...form, [name]: date});
  };
  return {form, onChange, changeDate};
};
