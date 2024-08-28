import { handlers } from "@/mocks/handlers";
import "@testing-library/jest-dom";
import { setupServer } from "msw/node";

export const server = setupServer(...handlers);
beforeAll(() => {
  server.listen();
});
afterEach(() => server.resetHandlers()); // 각 테스트 후에 핸들러를 리셋합니다.
afterAll(() => server.close());
