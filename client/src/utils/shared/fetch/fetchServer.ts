// import { auth } from "@/auth";
// import returnFetch, { type ReturnFetch } from "return-fetch";

import { auth } from "@/auth";
import { cookies } from "next/headers";

// const addInterceptor = async (args: any) => {
//   const session = await auth();

//   const fetchFn = returnFetch({
//     interceptors: {
//       request: async (requestArgs) => {
//         console.log("requestArgs", requestArgs);
//         return requestArgs;
//       },
//       response: async (response, requestArgs, fetch) => {
//         // console.log("response", requestArgs, response, fetch);
//         return response;
//       },
//     },
//   });
//   return fetchFn;
// };

// const addInterceptors = (args: any) => {
//   return returnFetch({
//     interceptors: {
//       request: async (requestArgs) => {
//         console.log("requestArgs", requestArgs);
//         return requestArgs;
//       },
//       response: async (response, requestArgs, fetch) => {
//         // console.log("response", requestArgs, response, fetch);
//         return response;
//       },
//     },
//   });
//   // return fetchFn;
// };

// export const fetchServer = async () =>
//   // input: URL | RequestInfo,
//   // init?: RequestInit | undefined
//   {
//     // if (input.toString()[0] === "/") {
//     //   input = input.toString().slice(1);
//     // }
//     const fetchFn = await addInterceptor({
//       // baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}`,
//       baseUrl: `https://jsonplaceholder.typicode.com/posts`,
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       // ...init,
//     });

//     return fetchFn;
//   };

// export const fetchServer2 = addInterceptors({});

export const fetchServer = async (path: string, init?: RequestInit) => {
  // Get Access Token
  const session = await auth();
  const accessToken = session?.user.accessToken!;

  const fetchFn = httpClient({
    // baseUrl: "https://jsonplaceholder.typicode.com/posts",
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    interceptors: {
      request: async (url, init) => {
        // console.log("request", input, init);
        // return init;
        return {
          ...init,
          headers: {
            ...init.headers,
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      response: async (response, init) => {
        const data = await response.json();
        const cookie = cookies();
        const refreshToken = cookie.get("refreshToken")?.value;

        console.log("data", data);
        if (data.statusCode !== 401) {
          // 인증된 경우
          return response;
        }

        // refresh Token 세션...
        const newAccessToken = await refreshAccessToken(refreshToken!);
        const option = {
          ...init,
          headers: {
            ...init.headers,
            Authorization: `Bearer ${newAccessToken}`,
          },
        };
        if (session?.user) {
          session.user.accessToken = newAccessToken;
        }
        const refetchResponse = (await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}${path}`,
          option
        )) as Response;
        return refetchResponse;
      },
    },
  });

  // Fetch
  try {
    const response = await fetchFn(path, init);
    return response;
  } catch (error) {
    console.error(error);
  }
};

type FetchParameters = Parameters<typeof fetch>;
type Promiseable<T> = T | Promise<T>;
export type HTTPClient<R = Response> = ReturnType<typeof httpClient<R>>;

export interface HTTPClientOption<T = Response>
  extends Omit<NonNullable<FetchParameters[1]>, "body"> {
  baseUrl?: string;
  interceptors?: {
    request?(
      input: NonNullable<FetchParameters[0]>,
      init: NonNullable<FetchParameters[1]>
    ): Promiseable<FetchParameters[1]>;
    response?(
      response: Response,
      requestInit: NonNullable<FetchParameters[1]>
    ): Promiseable<T>;
  };
}

const applyBaseUrl = (input: FetchParameters[0], baseUrl?: string) => {
  if (!baseUrl) {
    return input;
  }

  if (typeof input === "object" && "url" in input) {
    return new URL(input.url, baseUrl);
  }

  return new URL(input, baseUrl);
};

export default function httpClient<T = Response>({
  baseUrl,
  interceptors = {},
  ...requestInit
}: HTTPClientOption<T> = {}) {
  return async function <R = T extends Response ? Response : T>(
    input: FetchParameters[0],
    init?: FetchParameters[1]
  ): Promise<R> {
    const url = applyBaseUrl(input, baseUrl);

    const option = { ...requestInit, ...init };
    const interceptorAppliedOption = interceptors.request
      ? await interceptors.request(url, option)
      : option;

    // console.log(url, option);

    const response = await fetch(url, interceptorAppliedOption);

    // response 인터셉터 적용
    if (interceptors.response) {
      return (await interceptors.response(response, requestInit)) as R;
    }

    return response as R;
  };
}

async function refreshAccessToken(refreshToken: string) {
  const session = await auth();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.accessToken}`,
        refreshToken: `${refreshToken}`,
      },
      cache: "no-store",
    }
  );
  const data = await response.json();
  const newAccessToken = data.accessToken;
  return newAccessToken;
}
