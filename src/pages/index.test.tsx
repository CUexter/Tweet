import Index from "@/pages/index.page";
import { api } from "@/utils/api";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { type MockInstance } from "vitest";
import type nextAuthModule from "next-auth/react";

vi.mock("@/utils/api", () => {
  return {
    api: {
      example: {
        hello: {
          useQuery: vi.fn(() => {
            return vi.fn();
          }),
        },
        getSecretMessage: {
          useQuery: vi.fn(() => {
            return vi.fn();
          }),
        },
      },
    },
  };
});

vi.mock("next-auth/react", async () => {
  const originalModule = await vi.importActual<typeof nextAuthModule>(
    "next-auth/react"
  );
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { username: "admin" },
  };
  return {
    __esModule: true,
    ...originalModule,
    useSession: vi.fn(() => {
      return { data: mockSession, status: "authenticated" };
    }),
  };
});

describe("Home", () => {
  test("renders a heading", () => {
    (api.example.hello.useQuery as unknown as MockInstance).mockReturnValue({
      data: { greeting: "Hello from tRPC" },
    });
    render(<Index />);

    const heading = screen.getByText("Hello from tRPC");

    expect(heading).toBeInTheDocument();
  });
});
