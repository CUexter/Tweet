const mockSession = {
  expires: new Date(Date.now() + 2 * 86400).toISOString(),
  user: { username: "admin" },
};

export * from "next-auth/react";
export const useSession = vi.fn(() => {
  return { data: mockSession, status: "authenticated" };
});
