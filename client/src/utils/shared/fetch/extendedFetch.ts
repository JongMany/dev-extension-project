"use client";
import {useSession} from "next-auth/react";
import returnFetch, {ReturnFetch, ReturnFetchDefaultOptions} from "return-fetch";
import {fetchFreshAccessToken} from "@/service/auth/fetchFreshAccessToken";

function configureRequestOptionsBasedOnAuthToken(accessToken: string|undefined, options: RequestInit| undefined, args: ReturnFetchDefaultOptions | undefined) {
  if (accessToken) {
    return {
      ...args,
      ...options,
      headers: {
        ...options?.headers,
        ...args?.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    }
  } else {
    return {...args, ...options}
  }
}

// TODO: 리팩토링..!
const useCheckTokenInClient: ReturnFetch = (args) => {
  const { data: session, update } = useSession();

  return returnFetch({
    ...args,
    interceptors: {
      request: async (requestArgs) => {
        const [url, option] = requestArgs;
        const accessToken = session?.user?.accessToken;

        return [
          url,
          configureRequestOptionsBasedOnAuthToken(accessToken, option, args)
        ];
      },
      response: async (response, requestArgs, fetch) => {
        if (response.statusText !== "Unauthorized") {
          return response;
        }

        const staleAccessToken = session?.user?.accessToken;
        const refreshToken = session?.user?.refreshToken;
        const [url, option] = requestArgs;

        // const res = await fetch(
        //   `${
        //     process.env.NEXT_PUBLIC_BASE_URL
        //   }/api/v1/auth/refresh`,
        //   {
        //     method: "POST",
        //     credentials: "include",
        //     headers: {
        //       Accept: "application/json",
        //       "Content-Type": "application/json",
        //       Authorization: `Bearer ${staleAccessToken!}`,
        //     },
        //     cache: "no-store",
        //     mode: "cors",
        //     body: JSON.stringify({ refreshToken }),
        //   }
        // );
        //
        // const data = await res.json();
        // const freshAccessToken = data.accessToken;
        const freshAccessToken = await fetchFreshAccessToken(staleAccessToken!, refreshToken!)

        // 새롭게 받은 accessToken 으로 업데이트하기
        await update({
          ...session,
          user: { ...session?.user, accessToken: freshAccessToken },
        });

        return await fetch(url, {
          ...option,
          headers: {
            ...option?.headers,
            Authorization: `Bearer ${freshAccessToken}`,
          },
        });
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
