
import { useGetAllTasks } from "@/app/(main)/goal/_lib/useGetAllTasks";
import { Task } from "@/entities/task";
import { PropsWithChildren, createContext, useContext } from "react";
import TaskItem from "@components/task/taskList/TaskItem";

type TaskContextType = {
  tasks: Task[] | undefined;
  isFetching: boolean;
  isError: boolean;
};

const TaskContext = createContext<TaskContextType | null>(null);
const useTaskContext = () => useContext(TaskContext);

export default function TaskProvider({ children }: PropsWithChildren) {
  const { data, isFetching, isError } = useGetAllTasks();

  const providedValue = { tasks: data?.tasks, isFetching, isError };
  console.log(providedValue);

  return (
    <TaskContext.Provider value={providedValue}>
      {children}
    </TaskContext.Provider>
  );
}

TaskProvider.List = TaskList;

function TaskList() {
  const { tasks, isFetching, isError } = useTaskContext()!;

  if (isFetching) {
    return <div>로딩중...</div>;
  }
  if (isError) {
    return <div>에러 발생</div>;
  }
  if (tasks?.length === 0) {
    return <div>목표가 없습니다.</div>;
  } else {
    return tasks?.map((task) => <TaskItem key={task._id} task={task} />);
  }
}
