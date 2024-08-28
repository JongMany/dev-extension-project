// import returnFetch, { ReturnFetch } from "return-fetch";
// import { auth } from "@/auth";

// const refreshToken = async () => {
//   // const accessToken = localStorage.getItem("accessToken");
//   const session = await auth();
//   const accessToken = session?.user.accessToken!;
//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh`,
//     {
//       method: "POST",
//       credentials: "include",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${accessToken}`,
//       },

//       cache: "no-store",
//     }
//   );
//   const data = await response.json();
//   const newToken = data.accessToken;
//   // localStorage.setItem("accessToken", newToken);
//   return newToken;
// };

// const verifyTokenInClient = async (defaultOption: any) => {
//   const session = await auth();
//   const accessToken = session?.user.accessToken!;

//   return returnFetch({
//     ...defaultOption,
//     interceptors: {
//       request: async (args) => {
//         const [fetchUrl, fetchOptions] = args;
//         // const accessToken = localStorage.getItem("accessToken");
//         // console.log(fetchOptions?.headers);
//         if (accessToken) {
//           return [
//             fetchUrl,
//             {
//               ...defaultOption,
//               ...fetchOptions,
//               headers: {
//                 ...defaultOption?.headers,
//                 ...fetchOptions?.headers,
//                 Authorization: `Bearer ${accessToken}`,
//               },
//             },
//           ];
//         }

//         return args;
//       },
//       response: async (response, requestArgs, fetch) => {
//         if (response.statusText === "Unauthorized") {
//           const accessToken = await refreshToken();
//           console.log(accessToken);

//           const [url, option] = requestArgs;

//           // 새 토큰으로 새로운 요청
//           const response = await fetch(url, {
//             ...option,
//             headers: {
//               ...option?.headers,
//               Authorization: `Bearer ${accessToken}`,
//             },
//           });
//           return response;
//         } else {
//           return response;
//         }
//       },
//     },
//   });
// };

// export const fetchExtended = verifyTokenInClient({
//   baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}`,
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//   },
// });
