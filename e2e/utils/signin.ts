import type { Page } from "@playwright/test";

export const signIn = async (page: Page) => {
  await page.goto("/");
  //get Sign In button
  const signInButton = page.getByRole("button", { name: "Sign in" });
  await signInButton.click();
  // Fill In Stuff
  await page.getByLabel("Tag name Or Email").fill("alice@gmail.com");
  await page.getByLabel("Password").fill("aliceiscute");
  await page.getByLabel("Password").press("Enter");
};
