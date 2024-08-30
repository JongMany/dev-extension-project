import { type SignupForm } from "@/app/(auth)/signup/_components/SignupButton";

export const signup = async (form: SignupForm) => {
  const response = await fetch(
    `${
      process.env.NODE_ENV === "development"
        ? "http://localhost:8080"
        : "http://43.203.82.210:8080"
    }/api/auth/signup`,
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
