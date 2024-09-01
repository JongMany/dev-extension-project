import { useRouter } from "next/navigation";

import { SignIn } from "@/models/auth/dtos/auth.model";
import { signIn } from "next-auth/react";

type Props = {
  form: SignIn;
};

export default function SignInButton({ form }: Props) {
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = await signIn("credentials", {
      email: form.email,
      password: form.password,
      apiKey: form.apiKey,
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
