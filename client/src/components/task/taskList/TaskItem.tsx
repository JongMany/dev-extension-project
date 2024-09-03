"use client";
import { format } from "date-fns";

import EditTaskModal from "@components/task/taskList/EditTaskModal";
import useUpdateTask from "@hooks/task/useUpdateTask";
import {useModal} from "@hooks/shared/useModal";
import {TaskEntity} from "@/models/task/entity/task.entity";

// DND https://velog.io/@sumi-0011/framer-motion-dnd
type Props = {
  task: TaskEntity;
};

export default function TaskItem({ task }: Props) {
  const { isOpen, closeModal, openModal } = useModal();
  const updateTask = useUpdateTask(task._id);

  const toggleTaskComplete = () => {
    // TODO: 이부분만 Optimistic Update로 변경하자 (가능은 함 시간이 될지 모르겠음)
    updateTask({ isCompleted: !task.isCompleted });
  };

  return (
    <>
      <article
        className="border-2 border-black px-4 py-2 rounded-md shadow-xl hover:shadow-2xl"
        onDoubleClick={openModal}
      >
        <h2 className="font-bold text-l">프로젝트 - {task.projectName}</h2>
        <p>업무내용 - {task.task}</p>
        <p>생성일자 - {format(task.createdAt, "yyyy-MM-dd")}</p>
        <p>마감기간 - {format(task.dueDate, "yyyy-MM-dd")}</p>
        <p>담당자 - {task.owner}</p>
        <div className="flex justify-content">
          <input
            id="completed"
            name="completed"
            type="checkbox"
            checked={task.isCompleted}
            onChange={toggleTaskComplete}
            className="mr-2"
          />
          <label htmlFor="completed">완료</label>
        </div>
      </article>
      {isOpen && (
        // <ServerModal />
        <EditTaskModal
          isOpen={isOpen}
          closeModal={closeModal}
          task={{
            ...task,
            dueDate: new Date(task.dueDate),
            createdAt: new Date(task.createdAt),
          }}
        />
      )}
    </>
  );
}
