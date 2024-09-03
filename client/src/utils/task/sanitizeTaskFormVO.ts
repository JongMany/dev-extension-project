import {EditTaskFormVO} from "@/models/task/vo/editTaskForm.vo";
import {CreateTaskFormVO} from "@/models/task/vo/createTaskForm.vo";

export const sanitizeEditTaskFormVO = (editTaskFormVO: EditTaskFormVO): EditTaskFormVO => {
  return {
    ...editTaskFormVO,
    projectName: editTaskFormVO.projectName.trim(),
    task: editTaskFormVO.task.trim(),
    owner: editTaskFormVO.owner.trim(),
  }
}


export const sanitizeCreateTaskFormVO = (createTaskFormVO: CreateTaskFormVO): CreateTaskFormVO => {
  return {
    ...createTaskFormVO,
    projectName: createTaskFormVO.projectName.trim(),
    task: createTaskFormVO.task.trim(),
    owner: createTaskFormVO.owner.trim(),
  }
}
