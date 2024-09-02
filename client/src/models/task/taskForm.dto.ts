export interface ITaskForm {
  projectName: string;
  task: string;
  owner: string;
  dueDate: Date;
}

export interface ITask extends ITaskForm {
  _id: string;
  createdAt: Date;
  isCompleted: boolean;
}

export type IEditTaskForm = Partial<ITask>;
