import SignoutButton from "@/components/shared/button/Signout";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { signOut } from "next-auth/react";

// const signOutMock = vi.fn();
const mock = vi.hoisted(() => {
  return {
    signOut: vi.fn(),
  };
});
vi.mock("next-auth/react", () => ({
  signOut: mock.signOut,
}));

describe("SignoutButton Component", () => {
  it("render correctly", () => {
    render(<SignoutButton />);

    expect(
      screen.getByRole("button", { name: "로그아웃" })
    ).toBeInTheDocument();
  });

  it("버튼이 눌렸을 때, signout 함수가 한 번 호출된다.", async () => {
    render(<SignoutButton />);
    const button = screen.getByRole("button", { name: "로그아웃" });

    await userEvent.click(button);
    expect(mock.signOut).toHaveBeenCalledTimes(1);
  });
});
