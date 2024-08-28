import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      name: string;
      email: string;
      accessToken: string;
      refreshToken: string;
      nickname: string;
      apiKey: string;
    };
  }
}

declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_AUTH_URL: string;
    NEXT_PUBLIC_BASE_URL: string;
    // 다른 환경 변수가 있다면 여기에 추가
  }
}
