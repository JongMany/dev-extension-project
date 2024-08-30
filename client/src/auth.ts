import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import cookie from "cookie";
import { cookies } from "next/headers";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/",
    signOut: "/signin",
    newUser: "/signup",
  },
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET || "secret",
  events: {
    signOut(data) {
      // console.log(
      //   "auth.ts events signout",
      //   "session" in data && data.session,
      //   "token" in data && data.token
      // );
    },
    session(data) {
      // console.log(
      //   "auth.ts events session",
      //   "session" in data && data.session,
      //   "token" in data && data.token
      // );
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        apiKey: { label: "API Key", type: "text" },
      },
      authorize: async (credentials, req) => {
        // console.log("CREDENTIALS", credentials);
        if (
          !credentials ||
          !credentials.email ||
          !credentials.password ||
          !credentials.apiKey
        ) {
          console.error("Missing credentials");
          return null;
        }
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signin`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },

              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
                apiKey: credentials?.apiKey,
              }),
              cache: "no-store",
              credentials: "include",
            }
          );

          const contentType = response.headers.get("content-type");
          if (!contentType || !contentType.includes("application/json")) {
            return null;
          }

          console.log("response", response);

          if (response.status === 200) {
            // 서버의 쿠키를 받아서 브라우저에 쿠키를 심는 코드 (프론트 서버에 쿠키를 두면 개인정보 문제 발생)
            let setCookie = response.headers.get("Set-Cookie");
            let parsed;
            if (setCookie) {
              parsed = cookie.parse(setCookie);
              const cookieStore = cookies();
              cookieStore.set("refreshToken", parsed["refreshToken"], {
                httpOnly: true,
                sameSite: "none",
                domain:
                  process.env.NODE_ENV === "production"
                    ? "43.203.82.210"
                    : "127.0.0.1",
                secure: false,
                maxAge: 1000 * 60 * 60 * 24 * 30, // 14 days
                path: "/",
              });
              // cookies().set("connect.sid", parsed["refreshToken"], parsed);
            }
            const data = await response.json();
            if (!data.email) {
              console.error("Email is missing in response data");
              return null;
            }
            // console.log("data", data, parsed);
            return {
              ...data,
              id: data.apiKey,
              apiKey: data.apiKey,
              name: data.nickname,
              email: data.email,
              refreshToken: parsed ? parsed["refreshToken"] : null, // 이게 과연 좋은 코드일까?
            };
          } else {
            console.error("Authorization failed:", response.statusText);

            return null;
          }
        } catch (error) {
          console.error("Error in authorization:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // if (trigger === "update") {
      //   return { ...token, ...session.user };
      // }
      // return { ...token, ...user };
      if (user) {
        token = { ...token, ...user };
      }
      if (trigger === "update" && session) {
        token = { ...token, ...session.user };
      }
      return token;
    },
    async session({ session, token, trigger, user }) {
      // console.log("session", session, "token", token, "trigger", trigger);
      // console.log("SESSIONs", session, "TOKEN", token, "TRIGGER", trigger);

      (session as any).user = token;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  trustHost: true,
  // trustHost: process.env.NEXT_AUTH_URL || "http://localhost:3000",
  // cookies: {
  //   // cookies 전송용
  //   sessionToken: {
  //     name: `__Secure-next-auth.session-token`,
  //     options: {
  //       httpOnly: true,
  //       sameSite: "lax",
  //       path: "/*",
  //       secure: false, // process.env.NEXTAUTH_URL.startsWith('https://')
  //       domain:
  //         process.env.NODE_ENV === "production"
  //           ? "43.203.55.144"
  //           : "localhost:3000",
  //     },
  //   },
  // },
});
