import { expect, test } from "@playwright/test";

// Test case: Sign In with a non-existent user
test("Sign In with non-existent user", async ({ page }) => {
  await page.goto("/");
  // Get Sign In button
  const signInButton = page.getByRole("button", { name: "Sign in" });
  await signInButton.click();

  // Fill In Stuff
  await page.getByLabel("Tag name Or Email").fill("nonexistentuser");
  await page.getByLabel("Password").fill("nonexistentpassword");
  await page.getByRole("button", { name: "Sign in with Credentials" }).click();
  await page.screenshot({
    path: "results/signin/non-existent.png",
    fullPage: true,
  });

  // Check for error message
  const errormsg = page.getByText(
    "Sign in failed. Check the details you provided are correct."
  );
  await page.screenshot({
    path: "results/signin/non-existent-result.png",
    fullPage: true,
  });

  await expect(errormsg).toBeVisible();

  // Make sure it doesn't go back to the front page
  await expect(page).not.toHaveURL("/");

  // Go back to the front page and make sure the sign-in button is visible
  await page.goto("/");
  await expect(signInButton).toBeVisible();
});
