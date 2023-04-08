export * from "@mantine/core";
export const useMantineColorScheme = vi.fn(() => {
  return {
    colorScheme: "light",
    toggleColorScheme: vi.fn(),
  };
});
