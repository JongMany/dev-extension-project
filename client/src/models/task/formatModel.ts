import {TaskEntity} from "@/models/task/entity/task.entity";
import {TaskItemVO} from "@/models/task/vo/taskItem.vo";
import {CreateTaskFormVO} from "@/models/task/vo/createTaskForm.vo";
import {EditTaskFormVO} from "@/models/task/vo/editTaskForm.vo";
import {TaskFormVO} from "@/models/task/vo/taskForm.vo";
import {CreateTaskFormRequestDTO} from "@/models/task/dto/request/createTaskForm.dto";
import {format} from "date-fns";
import {EditTaskFormRequestDTO} from "@/models/task/dto/request/editTaskForm.dto";

export const toTaskItemVO = (taskEntity: TaskEntity):TaskItemVO => {
  return {
    isCompleted: taskEntity.isCompleted,
    _id: taskEntity._id,
    dueDate: taskEntity.dueDate,
    createdAt: taskEntity.createdAt,
    task: taskEntity.task,
    owner: taskEntity.owner,
    email: taskEntity.email,
    projectName: taskEntity.projectName
  }
}

export const toTaskFormVO = (taskFormVO: CreateTaskFormVO | EditTaskFormVO): TaskFormVO => {
  return {
    projectName: taskFormVO.projectName,
    task: taskFormVO.task,
    owner: taskFormVO.owner,
    dueDate: taskFormVO.dueDate,
  }
}

export const toCreateTaskFormRequestDTO = (createTaskFormVO: CreateTaskFormVO, createdAt: string): CreateTaskFormRequestDTO => {
  return {
    // projectName: createTaskFormVO.projectName,
    // task: createTaskFormVO.task,
    // owner: createTaskFormVO.owner,
    ...createTaskFormVO,
    dueDate: format(createTaskFormVO.dueDate, "yyyy-MM-dd"),
    createdAt
  }
}

export const toEditTaskFormRequestDTO = (editTaskFormVO: EditTaskFormVO): EditTaskFormRequestDTO => {
  return {
    ...editTaskFormVO
  }
}