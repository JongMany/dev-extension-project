export interface EditTaskFormVO {
  _id: string;
  createdAt: Date;
  isCompleted: boolean;
  projectName: string;
  task: string;
  owner: string;
  dueDate: Date;
}
