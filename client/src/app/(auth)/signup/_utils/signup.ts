import { type SignupForm } from "@/app/(auth)/signup/_components/SignupButton";

export const signup = async (form: SignupForm) => {
  const response = await fetch(
    // `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup`,
    `/api/v1/auth/signup`,
    {
      body: JSON.stringify({
        ...form,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      // cache: "no-cache",
    }
  );

  const data = await response.json();

  console.log(data);
  return data;
};
