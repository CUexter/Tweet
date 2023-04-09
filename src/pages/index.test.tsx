import Index from "@/pages/index.page";
import { render, server } from "@/utils/test/mockRouter";

import "@testing-library/jest-dom";
import { screen, waitFor } from "@testing-library/react";

beforeAll(() => {
  server.listen({});
  console.log("server started");

  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: unknown) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // Deprecated
      removeListener: vi.fn(), // Deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

afterAll(() => server.close());

describe("Home", () => {
  test("renders example content", async () => {
    vi.mock("next-auth/react");
    vi.mock("@mantine/core");
    render(<Index />);
    await waitFor(() => screen.getByText("Hello from useQuery"));
    screen.getByText("created at", { exact: false });
  });
});
