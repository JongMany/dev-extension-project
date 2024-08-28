import Button from "@components/shared/button/Button";
import {useState} from "react";
import {useSetErrorMsg} from "@/app/(main)/profile/edit/_hooks/useSetErrorMsg";

type Props = {
  onClick: () => void;
}
const AddButton = ({onClick}: Props) => {
  const {errorMsg, setErrorMsg} = useSetErrorMsg();

  const clickHandler = () => {
    try {
      onClick();
    } catch (error) {
      setErrorMsg("입력창이 모두 채워져야 추가할 수 있습니다.")
    }
  }

  return (
      <>
        <Button type="button" onClick={clickHandler}>
          링크 추가
        </Button>
        <p className="min-h-5 text-sm text-red-700 absolute -bottom-6">{errorMsg}</p>
      </>
  );
};

export default AddButton;