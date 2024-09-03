"use client";

import { format } from "date-fns";
import { FormEvent } from "react";
import TaskForm from "@components/task/form/TaskForm";
import useCreateTask from "@hooks/task/useCreateTask";
import {useFormWithDate} from "@hooks/shared/useForm";
import {type CreateTaskFormVO} from "@/models/task/vo/createTaskForm.vo";
import {toCreateTaskFormRequestDTO, toTaskFormVO} from "@/models/task/formatModel";
import {showToast} from "@utils/shared/toast/showToast";

const initialForm: CreateTaskFormVO = {
  projectName: "",
  task: "",
  owner: "",
  dueDate: new Date(),
};


const sanitizeCreateTaskFormVO = (createTaskFormVO: CreateTaskFormVO): CreateTaskFormVO => {
  return {
    ...createTaskFormVO,
    projectName: createTaskFormVO.projectName.trim(),
    task: createTaskFormVO.task.trim(),
    owner: createTaskFormVO.owner.trim(),
  }
}

const validateCreateTaskFormVO = (createTaskFormVO: CreateTaskFormVO) => {
  if(createTaskFormVO.task.length < 2) {
    return {
      message: '업무는 2글자 이상이어야 합니다.',
      status: 'Error',
    }
  }

  if(createTaskFormVO.owner.length < 2) {
    return {
      message: '담당자는 2글자 이상이어야 합니다.',
      status: 'Error',
    }
  }


  if(!createTaskFormVO.dueDate) {
    return {
      message: '일정이 선택되어야 합니다.',
      status: 'Error',
    }
  }

  if(createTaskFormVO.projectName.length < 2) {
    return {
      message: '프로젝트명은 2글자 이상이어야 합니다.',
      status: 'Error',
    }
  }

  return {
    message: '성공적으로 업로드되었습니다.',
    status: 'Success'
  }
}

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
