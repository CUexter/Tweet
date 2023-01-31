import { render, screen } from "@testing-library/react";
import Index from "./_index";
import "@testing-library/jest-dom";

describe.skip("Home", () => {
  it("renders a heading", () => {
    render(<Index />);

    const heading = screen.getByRole("heading", {
      name: /testing/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
