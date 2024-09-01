import { useCallback, type FormEvent } from "react";

import { type ITask } from "@/app/(main)/goal/_model/form.type";
import useUpdateTask from "@/app/(main)/goal/_lib/useUpdateTask";
import Button from "@/components/shared/button/Button";
import SubmitButton from "@/components/shared/button/SubmitButton";
import { useFormWithDate } from "@/lib/useForm";
import { useModal } from "@/lib/useModal";

import useDeleteTask from "@/app/(main)/goal/_lib/useDeleteTask";
import DeleteTaskConfirmationModal from "@components/task/taskList/DeleteTaskConfirmationModal";
import TaskForm from "@components/task/form/TaskForm";

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
