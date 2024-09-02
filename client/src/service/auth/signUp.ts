import {SignUpFormDTO} from "@/models/auth/sign-up/dto/request/signUp.dto";

export const signUp = async (form: SignUpFormDTO) => {
  // const URL = process.env.NODE_ENV === "development" ? "http://locahost:8080" : ""

  const response = await fetch(
      // `${NEXT_PUBLIC_BASE_URL}/api/v1/auth/signUp`,
      `${process.env.NEXT_PUBLIC_BASE_URL||""}/api/v1/auth/signup`,
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
