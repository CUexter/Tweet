import { expect, test } from "@playwright/test";

test("Sign In with wrong password", async ({ page }) => {
  await page.goto("/");
  // Get Sign In button
  const signInButton = page.getByRole("button", { name: "Sign in" });
  await signInButton.click();

  // Fill In Stuff
  await page.getByLabel("Tag name Or Email").fill("alice2733");
  await page.getByLabel("Password").fill("aliceisnotcute");

  await page.screenshot({
    path: "results/signin/wrongPw.png",
    fullPage: true,
  });
  await page.getByRole("button", { name: "Sign in with Credentials" }).click();

  // We finished it
  const errormsg = page.getByText(
    "Sign in failed. Check the details you provided are correct."
  );

  await expect(errormsg).toBeVisible();
  await page.screenshot({
    path: "results/signin/wrongPwError.png",
    fullPage: true,
  });

  // Make sure it doesn't go back to the front page
  await expect(page).not.toHaveURL("/");

  // Go back to front page, make sure don't have sign in avatar on the top right
  await page.goto("/");
  // Make sure the sign-in button is here
  await expect(signInButton).toBeVisible();
});
