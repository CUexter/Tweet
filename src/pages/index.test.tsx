import Index from "@/pages/index.page";
import { render, server } from "@/utils/test/mockRouter";

import "@testing-library/jest-dom";
import { screen, waitFor } from "@testing-library/react";

beforeAll(() => {
  server.listen({});
  console.log("server started");
});

afterAll(() => server.close());

describe("Home", () => {
  test("renders a heading", async () => {
    vi.mock("next-auth/react");
    render(<Index />);
    await waitFor(() => screen.getByText("Hello from tRPC"));
    screen.getByText("- secret");
  });
});
