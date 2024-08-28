import { Modal } from "@mui/material";
import { type ReactElement } from "react";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  className?: string;
  children: ReactElement;
};

export const ModalWrapper = ({
  isOpen,
  closeModal,
  children,
  className = "",
}: Props) => {
  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
      disablePortal
      sx={{
        display: "flex",
        p: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
      className={className}
    >
      {/* <Box>음...?</Box> */}
      {children}
    </Modal>
  );
};
