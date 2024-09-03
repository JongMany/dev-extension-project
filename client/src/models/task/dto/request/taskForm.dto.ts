// export interface ITaskForm {
//   projectName: string;
//   task: string;
//   owner: string;
//   dueDate: Date;
// }

export interface ITask {
  _id: string;
  createdAt: Date;
  isCompleted: boolean;
  projectName: string;
  task: string;
  owner: string;
  dueDate: Date;
}

export type IEditTaskForm = Partial<ITask>;
