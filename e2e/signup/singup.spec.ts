import { test } from "@playwright/test";

test("Signup", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("button", { name: "Sign up" }).click();
  await page.getByPlaceholder("Your name").click();
  await page.getByPlaceholder("Your name").fill("testing123");
  await page.getByPlaceholder("Your name").press("Tab");
  await page.getByPlaceholder("your@email.com").fill("abc@google.com");
  await page.getByPlaceholder("your@email.com").press("Tab");
  await page
    .getByPlaceholder("Your password", { exact: true })
    .fill("12345678");
  await page.getByPlaceholder("Your password", { exact: true }).press("Tab");
  await page.getByPlaceholder("Confirm your password").fill("12345678");
  await page.getByLabel("I agree to sell my soul to you").check();
  await page.getByLabel("I agree to sell my soul to you").uncheck();
  await page.getByRole("button", { name: "Submit" }).click();
  await page.screenshot({
    path: "results/signup/singup.png",
    fullPage: true,
  });
});
