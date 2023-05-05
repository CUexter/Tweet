import { test } from "@playwright/test";

test("Retweet when not signed in", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page
    .locator("div")
    .filter({ hasText: /^00-1$/ })
    .getByRole("button")
    .nth(1)
    .click();
  await page.screenshot({
    path: "results/retweet/retweet-notsigned.png",
    fullPage: true,
  });
});
