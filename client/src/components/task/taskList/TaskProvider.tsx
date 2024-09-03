"use client";

import {PropsWithChildren, createContext, useContext} from "react";
import TaskItem from "@components/task/taskList/TaskItem";
import {useGetAllTasks} from "@hooks/task/useGetAllTasks";
import {TaskEntity} from "@/models/task/entity/task.entity";
import QueryBasedRenderer from "@components/shared/query-based-renderer/QueryBasedRenderer";
import {toTaskItemVO} from "@/models/task/formatModel";

type TaskContextType = {
  tasks: TaskEntity[] | undefined;
  isFetching: boolean;
  isError: boolean;
};

const TaskContext = createContext<TaskContextType | null>(null);
const useTaskContext = () => useContext(TaskContext);

export default function TaskProvider({children}: PropsWithChildren) {
  const {data, isFetching, isError} = useGetAllTasks();

  const providedValue = {tasks: data?.tasks, isFetching, isError};

  return (
      <TaskContext.Provider value={providedValue}>
        {children}
      </TaskContext.Provider>
  );
}
function TaskList() {
  const {tasks, isFetching, isError} = useTaskContext()!;

  return <QueryBasedRenderer isError={isError} isLoading={isFetching} data={tasks} EmptyView={<div>목표가 없습니다.</div>}
                             ErrorComponent={<>에러 발생</>} Loader={<>로딩 중...</>} checkIsEmptyArray={true}>
    {tasks?.map((task) => <TaskItem key={task._id} task={toTaskItemVO(task)}/>)}
  </QueryBasedRenderer>

}

TaskProvider.List = TaskList;