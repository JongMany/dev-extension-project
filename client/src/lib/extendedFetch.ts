"use client";
import { useSession } from "next-auth/react";
import returnFetch, { ReturnFetch } from "return-fetch";

const refreshAccessToken = async (session: any) => {
  // if (!session) return;

  const accessToken = session?.data?.user.accessToken;
  const { update, data: sessionData } = session;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/refresh`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
      mode: "cors",
    }
  );

  const data = await response.json();
  const newAccessToken = data.accessToken;

  await update({
    ...sessionData,
    user: { ...sessionData?.user, accessToken: newAccessToken },
  });
  // if (session.data) {
  //   session.data.accessToken = newAccessToken;
  // }
  return newAccessToken;
};

// TODO: 리팩토링..!
const useCheckTokenInClient: ReturnFetch = (args) => {
  const { data: session, update } = useSession();
  console.log("args", args);
  return returnFetch({
    ...args,
    interceptors: {
      request: async (requestArgs) => {
        const [url, option] = requestArgs;
        console.log("request url", url, option);
        const accessToken = session?.user?.accessToken;

        return [
          url,
          accessToken
            ? {
                // credentials: "include",
                ...args,
                ...option,
                headers: {
                  ...option?.headers,
                  ...args?.headers,
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            : { ...args, ...option },
        ];
      },
      response: async (response, requestArgs, fetch) => {
        // console.log(response);
        if (response.statusText !== "Unauthorized") {
          // console.log("response", response);
          return response;
        }
        const accessToken = session?.user?.accessToken;
        const refreshToken = session?.user?.refreshToken;
        // if (!accessToken && window === undefined) {
        // }
        const [url, option] = requestArgs;
        // const authSession = await auth();
        console.log(refreshToken);

        const res = await fetch(
          `${
            process.env.NEXT_PUBLIC_BASE_URL || "http://43.203.82.210:8080"
          }/api/v1/auth/refresh`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.user.accessToken}`,
              // refreshToken: session?.user.refreshToken,
              // Cookie: `refreshToken=${session?.user.refreshToken}`,
            },
            cache: "no-store",
            mode: "cors",
            body: JSON.stringify({ refreshToken: session?.user.refreshToken }),
          }
        );

        const data = await res.json();
        const newAccessToken = data.accessToken;
        // console.log("refresh token", newAccessToken, data);
        await update({
          ...session,
          user: { ...session?.user, accessToken: newAccessToken },
        });

        const newResponse = await fetch(url, {
          ...option,
          headers: {
            ...option?.headers,
            Authorization: `Bearer ${newAccessToken}`,
          },
          // method: "POST",
          // credentials: "include",
          // cache: "no-store",
          // mode: "cors",
        });
        // console.log("newResponse", newResponse);
        return newResponse;
      },
    },
  });
};

export const useFetch = (include: boolean = true) => {
  // console.log(
  //   "useFetch",
  //   process.env.NEXT_PUBLIC_BASE_URL,
  //   process.env.NEXT_AUTH_URL,
  //   process.env.NEXT_PUBLIC_BASE_URL
  // );

  return {
    fetch: useCheckTokenInClient({
      // baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
      baseUrl:
        // `${process.env.NEXT_PUBLIC_BASE_URL}/api` ||
        `${process.env.NEXT_PUBLIC_BASE_URL}` ||
        "http://43.203.82.210:8080/api",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      // credentials: include ? "include" : false, // 또는 'same-origin'
      // mode: "cors",
    }),
  };
  // return { fetch };
};
