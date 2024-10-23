import Button from "@components/shared/button/Button";
import { ModalWrapper } from "@components/shared/modal/Modal";
// import { type ModalProps } from "@types/modal/modalProps.type";

type Props = {
  deleteTaskHandler: () => void;
} & {
  isOpen: boolean;
  closeModal: () => void;
};

export default function DeleteTaskConfirmationModal({
  isOpen,
  closeModal,
  deleteTaskHandler,
}: Props) {
  return (
    <ModalWrapper isOpen={isOpen} closeModal={closeModal} className="z-20">
      <section className="w-[400px] bg-white px-6 py-6 border-4 border-black rounded-md flex flex-col">
        <div className="flex flex-col mb-8 justify-center items-center">
          <h3 className="font-bold text-lg">정말로 삭제하시겠습니까?</h3>
          <p>삭제 후에 복구는 불가능하니 신중하게 생각해주세요</p>
        </div>
        <div className="flex justify-around">
          <Button onClick={deleteTaskHandler}>네</Button>
          <Button onClick={closeModal}>아니오</Button>
        </div>
      </section>
    </ModalWrapper>
  );
}
