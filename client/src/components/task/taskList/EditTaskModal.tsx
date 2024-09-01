import { ModalWrapper } from "@/components/shared/modal/Modal";
import { type ITask } from "@/app/(main)/goal/_model/form.type";
import { type ModalProps } from "@/types/modal/modalProps.type";
import EditTaskForm from "@components/task/form/EditTaskForm";

type Props = {
  task: ITask;
} & ModalProps;

export default function EditTaskModal({ isOpen, closeModal, task }: Props) {
  return (
    <ModalWrapper isOpen={isOpen} closeModal={closeModal}>
      <EditTaskForm task={task} closeForm={closeModal} />
    </ModalWrapper>
  );
}
