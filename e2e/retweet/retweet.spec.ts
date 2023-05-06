import { test } from "@playwright/test";

test("Retweet your own tweet", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page
    .locator("div")
    .filter({ hasText: /^00-1$/ })
    .getByRole("button")
    .nth(1)
    .click();
  await page.screenshot({
    path: "results/retweet/retweet-own.png",
    fullPage: true,
  });
});

test("Retweet again", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page
    .locator("div")
    .filter({ hasText: /^00-1$/ })
    .getByRole("button")
    .nth(1)
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^01-1$/ })
    .getByRole("button")
    .nth(1)
    .click();
  await page.screenshot({
    path: "results/retweet/retweet-again.png",
    fullPage: true,
  });
});
