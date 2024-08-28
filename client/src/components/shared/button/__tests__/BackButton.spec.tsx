import BackButton from "@/components/shared/button/BackButton";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const backMock = vi.fn();
describe("BackButton Component", () => {
  beforeEach(() => {
    vi.mock("next/navigation", () => ({
      useRouter: () => ({
        back: backMock,
      }),
    }));
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  it("render correctly", () => {
    render(<BackButton />);

    const button = screen.getByRole("button", { name: "뒤로가기" });
    expect(button).toBeInTheDocument();
  });

  it("when backbutton click ", async () => {
    render(<BackButton />);
    const button = screen.getByRole("button", { name: "뒤로가기" });
    await userEvent.click(button);
    expect(backMock).toHaveBeenCalledTimes(1);
  });
});
