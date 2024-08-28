import { ModalWrapper } from "@/components/shared/modal/Modal";
import EditTaskForm from "@/app/(main)/goal/_components/form/EditTaskForm";
import { type ITask } from "@/app/(main)/goal/_model/form.type";
import { type ModalProps } from "@/types/modal/modalProps.type";

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
