import {TaskEntity} from "@/models/task/entity/task.entity";
import {TaskItemVO} from "@/models/task/vo/taskItem.vo";

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