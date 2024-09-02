import { ModalWrapper } from "@/components/shared/modal/Modal";

import { type ModalProps } from "@/types/modal/modalProps.type";
import EditTaskForm from "@components/task/form/EditTaskForm";
import {ITask} from "@/models/task/taskForm.dto";

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
