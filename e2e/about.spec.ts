import { test, expect } from "@playwright/test";

test("should navigate to the about page", async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto("/");
  await page.click("text=Sign In");
  await expect(page).toHaveURL(/\/api\/auth\/signin?/);
});
