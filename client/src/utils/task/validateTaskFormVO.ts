import {EditTaskFormVO} from "@/models/task/vo/editTaskForm.vo";
import {CreateTaskFormVO} from "@/models/task/vo/createTaskForm.vo";

export const validateEditTaskFormVO = (editTaskFormVO: EditTaskFormVO) => {
  if(editTaskFormVO.task.length < 2) {
    return {
      message: '업무는 2글자 이상이어야 합니다.',
      status: 'Error',
    }
  }

  if(editTaskFormVO.owner.length < 2) {
    return {
      message: '담당자는 2글자 이상이어야 합니다.',
      status: 'Error',
    }
  }

  if(!editTaskFormVO.dueDate) {
    return {
      message: '일정이 선택되어야 합니다.',
      status: 'Error',
    }
  }

  if(!editTaskFormVO.createdAt) {
    return {
      message: '생성일은 존재해야 합니다..',
      status: 'Error',
    }
  }

  if(editTaskFormVO.projectName.length < 2) {
    return {
      message: '프로젝트명은 2글자 이상이어야 합니다.',
      status: 'Error',
    }
  }

  return {
    message: '성공적으로 수정되었습니다.',
    status: 'Success'
  }
}

export const validateCreateTaskFormVO = (createTaskFormVO: CreateTaskFormVO) => {
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