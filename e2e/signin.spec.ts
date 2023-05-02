import { expect, test } from "@playwright/test";

test("Sign In Success Procedure", async ({ page }) => {
  await page.goto("/");
  await page.click("text=Sign In");
  await expect(page).toHaveURL(/\/api\/auth\/signin?/);
});
