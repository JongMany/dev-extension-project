import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import {FormEvent} from "react";

type Props = {
  form: SignInRequestDTO;
};

export default function SignInButton({ form }: Props) {
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const response = await signIn("credentials", {
      ...form,
      redirect: false,
    });
    
    if (response?.error) {
      console.log(response.error);
    } else {
      router.push("/main");
    }
  };

  return <button onClick={handleSubmit}>로그인</button>;
}
