import React from "react";

type Props = {
  data: string;
  checkFn: () => void;
};

export default function CheckDuplicateButton({ data, checkFn }: Props) {
  return (
    <button type="button" onClick={checkFn}>
      중복체크
    </button>
  );
}
