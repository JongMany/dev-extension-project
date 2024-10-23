export type TaskEntity = {
  _id: string;
  dueDate: string;
  createdAt: string;
  projectName: string;
  task: string;
  owner: string;
  email: string;
  isCompleted: boolean;
  __v: number;
};

export type TaskListEntity = {
  tasks: TaskEntity[];
}



