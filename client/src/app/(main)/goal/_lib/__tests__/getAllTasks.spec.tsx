import { createWrapper } from "@/tests/utils/wrapper";
import { renderHook, waitFor } from "@testing-library/react";
import { server } from "../../../../../../vitest.setup";
import { HttpResponse, http } from "msw";
import { getTask, useGetAllTasks } from "@/app/(main)/goal/_lib/useGetAllTasks";

const goals = {
  goals: [
    {
      date: "2024-03-15",
      description: "테스트코드 연습",
      due: "2024-03-16",
      id: "1",
      isCompleted: false,
      owner: "방구석 코딩쟁이",
      projectName: "졸업작품",
    },
    {
      date: "2024-03-15",
      description: "D 모듈 개발",
      due: "2024-03-19",
      id: "2",
      isCompleted: true,
      owner: "방구석 코딩쟁이",
      projectName: "Ready To Work",
    },
  ],
};
describe("useGetAllGoals test", async () => {
  beforeEach(() => {
    vi.mock("@/lib/extendedFetch", () => ({
      useFetch: () => ({
        fetch,
      }),
    }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("successful query hook", async () => {
    const { result } = renderHook(() => useGetAllTasks(), {
      wrapper: createWrapper(),
    });
    // console.log(result.current);
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    await waitFor(() => expect(result.current.data).toStrictEqual(goals));
    // console.log(result.current);
  });

  it("test", async () => {
    const data = await getTask();
    expect(data).toStrictEqual(goals);
  });

  it("failure query hook", async () => {
    server.use(
      http.get("*", () => {
        return new HttpResponse(null, {
          status: 500,
        });
      })
    );

    const { result } = renderHook(() => useGetAllTasks(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
    // expect(result.current.error)
    expect(result.current.error?.message).toBe("Network response was not ok");
  });
});
