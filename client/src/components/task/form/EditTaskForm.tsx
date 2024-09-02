import { useCallback, type FormEvent } from "react";

import Button from "@/components/shared/button/Button";
import SubmitButton from "@/components/shared/button/SubmitButton";

import DeleteTaskConfirmationModal from "@components/task/taskList/DeleteTaskConfirmationModal";
import TaskForm from "@components/task/form/TaskForm";
import useUpdateTask from "@hooks/task/useUpdateTask";
import useDeleteTask from "@hooks/task/useDeleteTask";
import {ITask} from "@/models/task/taskForm.dto";
import {useFormWithDate} from "@hooks/shared/useForm";
import {useModal} from "@hooks/shared/useModal";

type Props = {
  task: ITask;
  closeForm: () => void;
};
export default function EditTaskForm({ task, closeForm }: Props) {
  const { form, onChange, changeDate } = useFormWithDate(task);
  const { isOpen, closeModal, openModal } = useModal();
  const updateTask = useUpdateTask(task._id);
  const deleteTask = useDeleteTask(task._id);

  const updateTaskHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateTask(form);
    closeForm();
  };

  const deleteTaskHandler = () => {
    deleteTask();
    closeForm();
  };

  const ButtonSection = useCallback(() => {
    return (
      <section className="w-[100%] flex justify-around">
        <SubmitButton>수정</SubmitButton>
        <Button onClick={openModal}>삭제</Button>
        <Button onClick={closeForm}>닫기</Button>
      </section>
    );
  }, [openModal, closeForm]);

  return (
    <>
      <TaskForm
        form={form}
        submitHandler={updateTaskHandler}
        onChange={onChange}
        changeDate={changeDate}
        footer={<ButtonSection />}
      />
      {isOpen && (
        <DeleteTaskConfirmationModal
          isOpen={isOpen}
          closeModal={closeModal}
          deleteTaskHandler={deleteTaskHandler}
        />
      )}
    </>
  );
}
