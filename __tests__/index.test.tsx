import { render, screen } from "@testing-library/react";
import Index from "@/pages/index";
import "@testing-library/jest-dom";

describe("Home", () => {
  it("renders a heading", () => {
    render(<Index />);

    const heading = screen.getByRole("heading", {
      name: /testing/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
