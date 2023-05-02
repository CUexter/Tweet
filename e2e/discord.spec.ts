import { expect, test } from "@playwright/test";

test.skip("test", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.getByRole("button", { name: "Sign in with Discord" }).click();
  await page.getByRole("button", { name: "Authorize" }).click();

  await expect(page).toHaveURL("/");
  await expect(page.getByText(/secret message/)).toContainText(
    /secret message/
  );
});
