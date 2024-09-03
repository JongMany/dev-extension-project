import { ModalWrapper } from "@components/shared/modal/Modal";

// import { type ModalProps } from "@types/modal/modalProps.type";
import {EditTaskForm} from "@components/task";
import {EditTaskFormVO} from "@/models/task/vo/editTaskForm.vo";

type Props = {
  task: EditTaskFormVO;
} & {
  isOpen: boolean;
  closeModal: () => void;
};

export default function EditTaskModal({ isOpen, closeModal, task }: Props) {
  return (
    <ModalWrapper isOpen={isOpen} closeModal={closeModal}>
      <EditTaskForm task={task} closeForm={closeModal} />
    </ModalWrapper>
  );
}
