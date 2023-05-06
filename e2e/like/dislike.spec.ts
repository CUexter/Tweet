import { test } from "@playwright/test";

test("Like", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("tab", { name: "All" }).click();
  await page.locator("div:nth-child(3) > button:nth-child(2)").first().click();
  await page.screenshot({
    path: "results/like/dislike.png",
    fullPage: true,
  });
  // when liked already
  await page
    .locator("div")
    .filter({ hasText: /^00-1$/ })
    .getByRole("button")
    .nth(2)
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^001$/ })
    .getByRole("button")
    .nth(3)
    .click();
  await page.screenshot({
    path: "results/like/dislike-liked.png",
    fullPage: true,
  });
  // when disliked already
  await page
    .locator("div")
    .filter({ hasText: /^00-1$/ })
    .getByRole("button")
    .nth(3)
    .click();
  await page.screenshot({
    path: "results/like/dislike-disliked.png",
    fullPage: true,
  });
});
