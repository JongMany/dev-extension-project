import { PropsWithChildren, ReactNode } from "react";

type Props = {
  modal: ReactNode;
};

export default function layout({ children, modal }: PropsWithChildren<Props>) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
