"use client";

import { format } from "date-fns";
import { FormEvent } from "react";
import TaskForm from "@components/task/form/TaskForm";
import useCreateTask from "@hooks/task/useCreateTask";
import {useFormWithDate} from "@hooks/shared/useForm";
import {type CreateTaskFormVO} from "@/models/task/vo/createTaskForm.vo";

const initialForm: CreateTaskFormVO = {
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
