import {SignUpForm} from "@/models/auth/dto/signUp.dto";

export const signUp = async (form: SignUpForm) => {
  const response = await fetch(
    // `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signUp`,
    `/api/v1/auth/signUp`,
    {
      body: JSON.stringify({
        ...form,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",

    }
  );

  const data = await response.json();

  console.log(data);
  return data;
};
