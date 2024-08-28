// "use client";
// import { fetchServer } from "@/lib/fetchServer";
import Link from "next/link";

const EditButton = () => {
  // const onEditButton = async () => {
  //   const response = await fetchServer("/", {});
  //   console.log(response);
  // };

  return (
    <Link href="/profile/edit">프로필 수정</Link>
    // <button onClick={onEditButton}>프로필 수정</button>
  );
};

export default EditButton;
