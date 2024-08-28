import { HttpResponse, http } from "msw";

const USERS = [
  {
    accessToken: "acceeeeeesssssToooooken",
    email: "homebody-coder@naver.com",
    nickname: "방구석코딩쟁이",
    apiKey: "aaaa1111",
  },
];

const GOALS = [
  {
    id: "1",
    projectName: "졸업작품",
    owner: "방구석 코딩쟁이",
    description: "테스트코드 연습",
    date: "2024-03-15",
    due: "2024-03-16",
    isCompleted: false,
  },
  {
    id: "2",
    projectName: "Ready To Work",
    owner: "방구석 코딩쟁이",
    description: "D 모듈 개발",
    date: "2024-03-15",
    due: "2024-03-19",
    isCompleted: true,
  },
];

export const handlers = [
  http.post("*/auth/signin", () => {
    return HttpResponse.json(USERS[0], {
      status: 200,
      headers: {
        "Set-Cookie": "refreshToken=asdasdasd;HttpOnly;Path=/",
      },
    });
  }),

  http.get("*/goal/all", () => {
    return HttpResponse.json(
      { goals: GOALS },
      {
        status: 200,
      }
    );
    // return new HttpResponse(null, {
    //   status: 500,
    // });
  }),

  // http.
];
