"use client";
import { useSession } from "next-auth/react";
import returnFetch, { ReturnFetch } from "return-fetch";
import {isBrowser} from "@utils/shared/common/checkIsBrowser";


// TODO: 리팩토링..!
const useCheckTokenInClient: ReturnFetch = (args) => {
  const { data: session, update } = useSession();
  console.log("args", args);
  return returnFetch({
    ...args,
    interceptors: {
      request: async (requestArgs) => {
        const [url, option] = requestArgs;
        // console.log("request url", url, option);
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
        if (response.statusText !== "Unauthorized") {
          return response;
        }
        const accessToken = session?.user?.accessToken;
        const refreshToken = session?.user?.refreshToken;
        const [url, option] = requestArgs;

        console.log("response", process.env.NEXT_PUBLIC_BASE_URL);
        const res = await fetch(
          `${
            process.env.NEXT_PUBLIC_BASE_URL || "https://www.study-log.net"
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
        });
        return newResponse;
      },
    },
  });
};

export const useFetch = (include: boolean = true) => {

  const URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.study-log.net";
  console.log('useFetch', process.env, 'url:', URL, 'env url:', process.env.NEXT_PUBLIC_BASE_URL, process.env.NODE_ENV, isBrowser());

  return {
    fetch: useCheckTokenInClient({
      // baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
      // baseUrl: "https://www.study-log.net",
      baseUrl: URL,
      // `${process.env.NEXT_PUBLIC_BASE_URL}/api` ||
      // `${process.env.NEXT_PUBLIC_BASE_URL}` || "https://www.study-log.net",
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
