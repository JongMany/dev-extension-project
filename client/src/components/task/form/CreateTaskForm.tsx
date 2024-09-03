"use client";

import { format } from "date-fns";
import { FormEvent } from "react";
import TaskForm from "@components/task/form/TaskForm";
import useCreateTask from "@hooks/task/useCreateTask";
import {useFormWithDate} from "@hooks/shared/useForm";
import {type CreateTaskFormVO} from "@/models/task/vo/createTaskForm.vo";
import {toCreateTaskFormRequestDTO, toTaskFormVO} from "@/models/task/formatModel";
import {showToast} from "@utils/shared/toast/showToast";
import {validateCreateTaskFormVO} from "@utils/task/validateTaskFormVO";
import {sanitizeCreateTaskFormVO} from "@utils/task/sanitizeTaskFormVO";

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
    const sanitizedCreateTaskFormVO = sanitizeCreateTaskFormVO(form);
    const validateResult = validateCreateTaskFormVO(sanitizedCreateTaskFormVO)

    if(validateResult.status === "Error") {
      showToast('error', validateResult.message);
      return;
    } else {
      showToast('success', validateResult.message);
    }

    const createdAt = format(new Date(), "yyyy-MM-dd");
    const createTaskFormRequestDTO = toCreateTaskFormRequestDTO(sanitizedCreateTaskFormVO, createdAt)

    createTask(createTaskFormRequestDTO);
  };

  return (
    <TaskForm
      form={toTaskFormVO(form)}
      submitHandler={submitTaskHandler}
      onChange={onChange}
      changeDate={changeDate}
    />
  );
}
