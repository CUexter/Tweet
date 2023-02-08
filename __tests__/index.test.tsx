import { render, screen } from "@testing-library/react";
import Index from "@/pages/index";

describe("Home", () => {
  test("renders a heading", () => {
    render(<Index />);

    const heading = screen.getByRole("p", {
      name: /Sign In/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
