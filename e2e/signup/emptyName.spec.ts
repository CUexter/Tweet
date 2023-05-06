import { test } from "@playwright/test";

test("Empty Name", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("button", { name: "Sign up" }).click();
  await page.getByPlaceholder("your@email.com").click();
  await page.getByPlaceholder("your@email.com").fill("abcd@gmail.com");
  await page.getByPlaceholder("your@email.com").press("Tab");
  await page
    .getByPlaceholder("Your password", { exact: true })
    .fill("12345678");
  await page.getByPlaceholder("Your password", { exact: true }).press("Tab");
  await page.getByPlaceholder("Confirm your password").fill("12345678");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.screenshot({
    path: "results/signup/emptyName.png",
    fullPage: true,
  });
});

test("Space Name", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("button", { name: "Sign up" }).click();
  await page
    .locator("div")
    .filter({ hasText: /^Name \*$/ })
    .click();
  await page.getByPlaceholder("Your name").fill(" ");
  await page.getByPlaceholder("your@email.com").click();
  await page.getByPlaceholder("your@email.com").fill("abcdsk@gmail.com");
  await page.getByPlaceholder("your@email.com").press("Tab");
  await page
    .getByPlaceholder("Your password", { exact: true })
    .fill("12345678");
  await page.getByPlaceholder("Your password", { exact: true }).press("Tab");
  await page.getByPlaceholder("Confirm your password").fill("12345678");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.screenshot({
    path: "results/signup/spaceName.png",
    fullPage: true,
  });
});
