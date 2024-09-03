"use client";
import BackButton from "@/components/shared/button/BackButton";
import SubmitButton from "@/components/shared/button/SubmitButton";
import Input from "@/components/shared/input/Input";

import React, { ReactElement } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {TaskFormVO} from "@/models/task/vo/taskForm.vo";


type Props = {
  form: TaskFormVO;
  submitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  changeDate: (date: Date, name: string) => void;
  footer?: ReactElement;
};

export default function TaskFormUI({
  form,
  submitHandler,
  onChange,
  changeDate,
  footer = <DefaultButtonSection />,
}: Props) {
  const changeDateHandler = (date: Date | null) => {
    changeDate(date ?? new Date(form.dueDate), "dueDate");
  };

  return (
    <section className="fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] p-10 rounded-xl border-4 border-black border-solid min-w-[50vw] min-h-[50vh] flex flex-col items-center bg-white select-none">
      <h3 className="text-xl font-bold mb-12">목표를 수정/삭제해보세요</h3>
      <form
        className="flex-1 flex flex-col items-center justify-between w-[100%]"
        onSubmit={submitHandler}
      >
        <Input
          name="projectName"
          placeholder="프로젝트명을 입력하세요"
          onChange={onChange}
          value={form.projectName}
        />

        <textarea
          className="px-2 py-1 border-black border-2 rounded-lg w-[80%] resize-none min-h-[6.25rem]"
          name="task"
          placeholder="일정을 입력하세요"
          onChange={onChange}
          value={form.task}
        />

        <Input
          name="owner"
          placeholder="일정 책임자를 입력하세요"
          onChange={onChange}
          value={form.owner}
        />

        <DatePicker
          name="dueDate"
          dateFormat="yyyy.MM.dd"
          shouldCloseOnSelect
          className="px-2 py-1 border-black border-2 rounded-lg w-[100%]"
          selected={new Date(form.dueDate)}
          minDate={new Date("2023-03-23")}
          maxDate={new Date("2028-12-31")}
          onChange={changeDateHandler}
        />
        {footer}
      </form>
    </section>
  );
}

function DefaultButtonSection() {
  return (
    <section className="w-[100%] flex justify-around">
      <SubmitButton>생성</SubmitButton>
      <BackButton />
    </section>
  );
}
