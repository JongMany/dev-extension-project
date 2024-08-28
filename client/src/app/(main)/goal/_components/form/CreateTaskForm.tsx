"use client";

import TaskForm from "@/app/(main)/goal/_components/form/TaskForm";
import useCreateTask from "@/app/(main)/goal/_lib/useCreateTask";
import { useFormWithDate } from "@/lib/useForm";
import { format } from "date-fns";
import { FormEvent } from "react";

const initialForm = {
  projectName: "",
  task: "",
  owner: "",
  dueDate: new Date(),
};

export default function CreateTaskForm() {
  const { form, onChange, changeDate } = useFormWithDate(initialForm);
  const createTask = useCreateTask();

  const submitTaskHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const createdAt = format(new Date(), "yyyy-MM-dd");
    const dueDate = format(form.dueDate, "yyyy-MM-dd");

    const task = {
      projectName: form.projectName.trim(),
      task: form.task.trim(),
      owner: form.owner.trim(),
      createdAt,
      dueDate,
    };

    createTask(task);
  };

  return (
    <TaskForm
      form={form}
      submitHandler={submitTaskHandler}
      onChange={onChange}
      changeDate={changeDate}
    />
  );
}
