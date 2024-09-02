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
            process.env.NEXT_PUBLIC_BASE_URL
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

  const URL = process.env.NEXT_PUBLIC_BASE_URL;

  return {
    fetch: useCheckTokenInClient({
      baseUrl: URL,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }),
  };
};
