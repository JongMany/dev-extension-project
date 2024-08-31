import SignInButton from "@/app/(auth)/(signin)/_components/SignInButton";
import { SignIn } from "@/models/auth/auth.model";
import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { signIn } from "next-auth/react";

const pushMock = vi.fn((href: string) => {});

describe("SignInButton", () => {
  let form: SignIn;

  beforeEach(() => {
    form = {
      apiKey: "",
      password: "",
      email: "",
    };

    vi.mock("next/navigation", () => ({
      useRouter: () => ({
        push: pushMock,
      }),
    }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render the component", () => {
    render(<SignInButton form={form} />);
    const button = screen.getByText("로그인");
    expect(button).toBeInTheDocument();
  });

  it("버튼을 클릭한 경우, signIn 함수에 'credentials'와 form 데이터를 인자로 넘겨서 호출합니다.", async () => {
    render(<SignInButton form={form} />);
    const button = screen.getByRole("button");
    await userEvent.click(button);

    expect(signIn).toHaveBeenNthCalledWith(1, "credentials", {
      email: form.email,
      password: form.password,
      apiKey: form.apiKey,
      redirect: false,
    });
  });

  it("signIn 함수가 에러를 반환하지 않은 경우, router.push 함수를 호출합니다.", async () => {
    // TODO:
    vi.mock("next-auth/react", () => {
      return {
        signIn: vi.fn().mockResolvedValue({}),
      };
    });

    render(<SignInButton form={form} />);

    const button = screen.getByRole("button");
    await userEvent.click(button);
    // console.log("signIn", await signIn());

    // await waitFor(() => {
    //   // expect(signIn).toHaveNthReturnedWith(1, { error: "CredentialSignIn" });
    //   expect(pushMock).toHaveBeenNthCalledWith(1, "/main");
    // });
  });

  it("signIn 함수가 에러를 반환한 경우, 에러를 콘솔에 출력합니다.", async () => {
    vi.mock("next-auth/react", () => ({
      signIn: vi.fn(() => Promise.resolve({ error: "CredentialSignIn" })),
    }));
    render(<SignInButton form={form} />);
    const button = screen.getByRole("button");
    await userEvent.click(button);
    expect(signIn).toHaveNthReturnedWith(1, { error: "CredentialSignIn" });
  });
});
