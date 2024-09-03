import {useCallback, type FormEvent} from "react";

import Button from "@/components/shared/button/Button";
import SubmitButton from "@/components/shared/button/SubmitButton";

import DeleteTaskConfirmationModal from "@components/task/form/DeleteTaskConfirmationModal";
import TaskForm from "@components/task/form/TaskForm";
import useUpdateTask from "@hooks/task/useUpdateTask";
import useDeleteTask from "@hooks/task/useDeleteTask";
import {useFormWithDate} from "@hooks/shared/useForm";
import {useModal} from "@hooks/shared/useModal";
import {EditTaskFormVO} from "@/models/task/vo/editTaskForm.vo";
import {toEditTaskFormRequestDTO, toTaskFormVO} from "@/models/task/formatModel";
import {showToast} from "@utils/shared/toast/showToast";
import {validateEditTaskFormVO} from "@utils/task/validateTaskFormVO";
import {sanitizeEditTaskFormVO} from "@utils/task/sanitizeTaskFormVO";

type Props = {
  task: EditTaskFormVO;
  closeForm: () => void;
};

export default function EditTaskForm({task, closeForm}: Props) {
  const {form, onChange, changeDate} = useFormWithDate(task);
  const {isOpen, closeModal, openModal} = useModal();
  const updateTask = useUpdateTask(task._id);
  const deleteTask = useDeleteTask(task._id);

  const updateTaskHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const sanitizedUpdateTaskVO = sanitizeEditTaskFormVO(form);
    const validateResult = validateEditTaskFormVO(sanitizedUpdateTaskVO);
    if (validateResult.status === "Error") {
      showToast('error', validateResult.message);
      return;
    } else {
      showToast('success', validateResult.message);
    }

    updateTask(toEditTaskFormRequestDTO(sanitizedUpdateTaskVO));
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
            form={toTaskFormVO(form)}
            submitHandler={updateTaskHandler}
            onChange={onChange}
            changeDate={changeDate}
            footer={<ButtonSection/>}
        />
        <DeleteTaskConfirmationModal
            isOpen={isOpen}
            closeModal={closeModal}
            deleteTaskHandler={deleteTaskHandler}
        />
      </>
  );
}
